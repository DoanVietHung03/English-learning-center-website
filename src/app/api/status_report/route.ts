import { Report } from "@/models/report"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    console.log(body.status)
    console.log(body.id)

    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    //const IdAssignmentUpDate = new ObjectId('yourObjectId');
    const updatedStatus = {
        status: body.status,
    };
    const statusEdit = await Report.updateOne({ _id: body.id }, { $set: updatedStatus });
    return Response.json(statusEdit);
}
