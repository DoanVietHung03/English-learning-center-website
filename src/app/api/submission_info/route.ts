import { Submission } from "@/models/submission"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const submission = await Submission.findOne({student_id: body.id, assignment_id: body.assignment_id})
    console.log(submission)
    return Response.json(submission);
}
