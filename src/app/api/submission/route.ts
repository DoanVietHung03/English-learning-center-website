import { Submission } from "@/models/submission"
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    connectToDatabase();
    const createdSubmission = await Submission.create({
        student_id: body.id_student,
        assignment_id: body.id_assignment,
        answer: body.answer,
        grade: null,
        comment: null,
        status: 'Pending',
        attachedFile: body.file
    })
    return Response.json(createdSubmission);
}

