import { Report } from "@/models/report"
import { connectToDatabase } from '../../../connection';


export async function POST(req: { json: () => any }) {
    const body = await req.json()
    var date
    if(body.status == 'Completed'){
        date = new Date()
    }
    else{
        date = null
    }
    connectToDatabase();
    const updatedStatus = {
        status: body.status,
        date_completed: date
    };
    const statusEdit = await Report.updateOne({ _id: body.id }, { $set: updatedStatus });
    return Response.json(statusEdit);
}
