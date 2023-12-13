import { Course } from "@/models/course"
import mongoose from "mongoose"


export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const course_id = body.course_id;

    const id = await Course.findOne({ course_id })
    if (id) {
        throw new Error('Course is existed');
    }
    const createdCourse = await Course.create(body)
    return Response.json(createdCourse)
} 