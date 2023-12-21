import { Submission } from "@/models/submission"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    //console.log(body)
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    //const IdAssignmentUpDate = new ObjectId('yourObjectId');
    const updatedGrade = {
        grade: body.grade,
        comment: body.comment
    };
    const submissionEdit = await Submission.updateOne({ _id: body.id }, { $set: updatedGrade });
    return Response.json(submissionEdit);
}
