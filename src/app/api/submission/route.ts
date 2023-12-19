import { Submission } from "@/models/submission"
//import { Course } from "@/models/course"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const createdSubmission = await Submission.create({
        student_id: body.id_student,
        assignment_id: body.id_assignment,
        answer: body.answer,
        grade: null,
        attachedFile: body.file
    })
    return Response.json(createdSubmission);
}

