import { Exercise } from "@/models/exercise"
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        connectToDatabase();

        const exercise = await Exercise.findOne({ _id: body.id })
        return Response.json(exercise);
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Exercise not existed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 