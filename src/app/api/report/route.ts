import { Report } from "@/models/report"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const createdReport = await Report.create({
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