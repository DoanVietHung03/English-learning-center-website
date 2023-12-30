import { Submission } from "@/models/submission"
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    connectToDatabase();
    const submission = await Submission.findOne({student_id: body.id, assignment_id: body.assignment_id})
    console.log(submission)
    return Response.json(submission);
}
