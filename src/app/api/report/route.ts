import { Report } from "@/models/report"
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    connectToDatabase();
    const createdReport = await Report.create({
        userID: body.id,
        title: body.title,
        type: body.type,
        content: body.content,
        file: body.file,
        date_created: body.date_created,
        date_completed: body.date_completed,
        status: body.status,
    })
    return Response.json(createdReport)
}