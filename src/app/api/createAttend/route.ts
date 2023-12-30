import { Attendance } from "@/models/attendance";
import { connectToDatabase } from '../../../connection';


export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        connectToDatabase();
        const createAttend = await Attendance.create({
            course_id: body.course_id,
            session_id: body.session_id,
            studentList: body.studentList
        });
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
