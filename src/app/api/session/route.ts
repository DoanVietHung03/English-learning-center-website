import { Attendance } from "@/models/attendance";
import { Course } from "@/models/course"
import { User } from "@/models/user"
import { Session } from "@/models/session";
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        connectToDatabase();
        const course = await Course.findOne({ _id: body.id })
        const sessions = await Session.find({ course_id: body.id })
        const attendance = await Attendance.find({ course_id: body.id })
        
        const teacherName = await User.findOne({phone: course.teacher_id}, {name:1, _id: 0})
    
        return Response.json({ course, sessions, attendance, teacherName });
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Session not existed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 
