import { Ex_Submission } from "@/models/ex_submission"
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        connectToDatabase();
        const progress = await Ex_Submission.find({ exercise_id: body.ex_id, student_id: body.id}, {progress: 1, _id:0})
        return Response.json(progress);
    } catch (error) {
        return Response.json(null);
    }
} 