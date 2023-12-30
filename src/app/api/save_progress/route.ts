import { Ex_Submission } from "@/models/ex_submission"
import { connectToDatabase } from '../../../connection';


export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        connectToDatabase();

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
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Exercise not existed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 