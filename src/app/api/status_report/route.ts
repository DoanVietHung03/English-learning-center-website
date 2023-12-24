import { Report } from "@/models/report"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    console.log(body.status)
    console.log(body.id)
    var date
    if(body.status === 'Completed'){
        date = new Date()
    }
    else{
        date = null
    }

    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    //const IdAssignmentUpDate = new ObjectId('yourObjectId');
    const updatedStatus = {
        status: body.status,
        date_completed: date
    };
    const statusEdit = await Report.updateOne({ _id: body.id }, { $set: updatedStatus });
    return Response.json(statusEdit);
}
