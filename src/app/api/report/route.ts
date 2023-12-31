import { Report } from "@/models/report"
import { User } from "@/models/user"
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    try{
        const body = await req.json()
        connectToDatabase();
        if(body.method === 'add'){
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
        else if (body.method === 'getList'){
            var reports;
            if (body.userType == "Admin") {
                reports = await Report.find()
            }
            else{
                reports = await Report.find({userID: body.id})
            }
            reports = reports
            .filter(report => report !== null);

            reports.reverse()
            return Response.json(reports);
        }
        else if (body.method === 'changeStatus'){
            var date
            if(body.status == 'Completed'){
                date = new Date()
            }
            else{
                date = null
            }
            const updatedStatus = {
                status: body.status,
                date_completed: date
            };
            const statusEdit = await Report.updateOne({ _id: body.id }, { $set: updatedStatus });
            return Response.json(statusEdit);
        }
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Report fetching failed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
}