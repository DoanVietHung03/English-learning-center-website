import { Report } from "@/models/report"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const report_id = body.report_id;

    const id = await Report.findOne({ report_id })
    if (id) {
        throw new Error('report is existed');
    }
    const createdReport= await Report.create(body)
    return Response.json(createdReport)
}