import { Assignment } from "@/models/assignment"
//import { Course } from "@/models/course"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const assignment_id = body.Title;

    const assignment = await Assignment.findOne({ assignment_id })

    if (assignment_id) {
        new Error('Assignment is existed');
    }
    const createdAssignment = await Assignment.create(body)
    return Response.json(createdAssignment)
}