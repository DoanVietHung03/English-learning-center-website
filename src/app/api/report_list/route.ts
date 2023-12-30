import { Report } from "@/models/report"
import { User } from "@/models/user"
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
  try {
    const body = await req.json();
    var reports;
    connectToDatabase();
    const user = await User.findOne({ phone: body.id })
    if (user.type == "Admin") {
        reports = await Report.find()
    }
    else{
        reports = await Report.find({userID: body.id})
    }
    reports = reports
      .filter(report => report !== null);
    return Response.json(reports);
  } catch (error) {
    return new Response(
      JSON.stringify(
        { ok: false, message: 'Report not existed' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
} 