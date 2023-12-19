import { Assignment } from "@/models/assignment"
//import { Course } from "@/models/course"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    // console.log(body)
    const createdAssignment = await Assignment.create({
        title: body.title,
        deadline: body.deadline,
        content: body.content,
        skill: body.skill,
        attachedFile: body.file,
        course_id: body.id,
    })
    console.log(createdAssignment)
    return Response.json(createdAssignment)
}

// export async function GET(req: { json: () => any}) {
//     const body = await req.json()
//     mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
//     const assignments = await Assignment.find({course_id: 'Khóa học Ielts 1 rất hay, nên học'});
//     return Response.json(assignments)
// }
