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
                solution: body.file,
                attachedFile: body.filemp3,
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
            return Response.json(list_ex_done);
        }
        else{

        }
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Exercise not existed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 

export async function GET() {
    connectToDatabase();
    const exbank = await Exercise.find({},{title: 1, module: 1, skill: 1});
    return Response.json(exbank)
}