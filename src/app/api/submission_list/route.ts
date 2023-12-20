import { Submission } from "@/models/submission"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const Submissions = await Submission.find({assignment_id: body.id})
    console.log(Submissions)
    return Response.json(Submissions);
}
