import { Exercise } from "@/models/exercise"
import { Ex_Submission } from "@/models/ex_submission"
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        connectToDatabase();
        if(body.method === 'getInfo'){
            const exercise = await Exercise.findOne({ _id: body.id })
            return Response.json(exercise);
        }
        else if (body.method === 'add'){
            const createdExercise = await Exercise.create({
                title: body.title,
                content: body.content,
                skill: body.skill,
                solution: body.solution,
                attachedFile: body.attachedFile,
                module: body.module
            })
            return Response.json(createdExercise)
        }
        else if (body.method === 'getDoneList'){
            const idEx = await Ex_Submission.find({student_id: body.id}, {exercise_id: 1, _id: 0})
            var list_ex_done = []
            var ex_done
            for(var i = 0; i < idEx.length; i++){
                ex_done = await Exercise.findOne({_id: idEx[i].exercise_id})
                list_ex_done.push(ex_done)
            }
            list_ex_done.reverse()
            return Response.json(list_ex_done);
        }
        else if (body.method === 'getProgress'){
            const progress = await Ex_Submission.find({ exercise_id: body.ex_id, student_id: body.id}, {progress: 1, _id:0})
            return Response.json(progress);
        }
        else if (body.method === 'saveProgress'){
            if(body.progress === ''){
                const deleteProgress = await Ex_Submission.deleteOne({student_id: body.id, exercise_id: body.ex_id})
                return Response.json(deleteProgress);
            }
            else{
                if(body.status === 'already'){
                    const updatedProgress = {
                        progress: body.progress
                    };
                    const progressEdit = await Ex_Submission.updateOne({ student_id: body.id, exercise_id: body.ex_id }, { $set: updatedProgress});
                    return Response.json(progressEdit);
                }
                else{
                    const createdProgress = await Ex_Submission.create({
                        student_id: body.id,
                        exercise_id: body.ex_id,
                        progress: body.progress
                    })
                    return Response.json(createdProgress);
                }
            }
        }
        else{
            const deleteSubmission = await Ex_Submission.deleteMany({exercise_id : body.ex_id})
            const deleteExercise = await Exercise.deleteOne({_id : body.ex_id})
            return Response.json({deleteSubmission, deleteExercise});
        }
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Exercise fetching failed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 

export async function GET() {
    connectToDatabase();
    const exbank = await Exercise.find({},{title: 1, module: 1, skill: 1});
    exbank.reverse()
    const combinesExbank = exbank.map((ex,i) => {
        return {
            _id: ex._id,
            title: ex.title,
            module: ex.module,
            skill: ex.skill,
            content: ex.content,
            solution: ex.solution,
            attachedFile: ex.attachedFile,
            index: i, 
        }
    })

    return Response.json(combinesExbank)
}