import { Attendance } from "@/models/attendance";
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        connectToDatabase();
        const studentList = await Attendance.findOne({session_id: body.session_id, course_id: body.course_id }, {studentList: 1, _id: 0})
        return Response.json(studentList);
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Session not existed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 