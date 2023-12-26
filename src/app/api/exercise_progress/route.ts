import { Ex_Submission } from "@/models/ex_submission"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
        const progress = await Ex_Submission.find({ exercise_id: body.ex_id, student_id: body.id}, {progress: 1, _id:0})
        return Response.json(progress);
    } catch (error) {
        return Response.json(null);
    }
} 