import { Assignment } from "@/models/assignment"
//import { Course } from "@/models/course"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    // console.log(body)
    const createdAssignment = await Assignment.findOne({ _id: body.id })
    return Response.json(createdAssignment)
}