import { Course } from "@/models/course"
import { Session } from "@/models/session";
import mongoose from "mongoose"
import { cookies } from 'next/headers'

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
        const createdCourse = await Course.create({
            name: body.title,
            schedule: body.schedule,
            room: body.room,
            startDate: body.sDate,
            module: body.module,
            teacher_id: body.teacher,
            student_id: body.student_added
        });
        for (var i = 0; i < 24; i++) {
            await Session.create({
                course_id: createdCourse._id,
                name: 'Session ' + String(i + 1)
            })
        }
        // console.log(createdCourse);
        return Response.json(createdCourse);
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'User not existed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 
