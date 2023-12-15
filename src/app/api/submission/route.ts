import { Submission } from "@/models/submission"
//import { Course } from "@/models/course"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const createdSubmission = await Submission.create({
       // assignment_id: body.assignment_id,
       // assignment_id: body.assignment_id,
        answer: body.answer,
        grade: body.grade,
    })
    return Response.json(createdSubmission);
}
