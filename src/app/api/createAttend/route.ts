import { Attendance } from "@/models/attendance";
import { Course } from "@/models/course"
import { Session } from "@/models/session";
import mongoose from "mongoose"
import { cookies } from 'next/headers'

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
        const createAttend = await Attendance.create({
            course_id: body.course_id,
            session_id: body.session_id,
            studentList: body.studentList
        });
        // console.log(createdCourse);
        return Response.json(createAttend);
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'User not existed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 
