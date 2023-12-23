import { Report } from "@/models/report"
import { User } from "@/models/user"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
  try {
    const body = await req.json();
    var reports;
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
    const user = await User.findOne({ phone: body.id })
    if (user.type == "Admin") {
        reports = await Report.find()
    }
    else{
        reports = await Report.find({userID: body.id})
    }
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