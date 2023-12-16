import { Course } from "@/models/course"
import { Session } from "@/models/session";
import mongoose from "mongoose"
import { cookies } from 'next/headers'

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
        const course = await Course.findOne({ name: body.id })
        const sessions = await Session.find({ course_id: body.id })
        return Response.json({ course, sessions });
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Session not existed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 
