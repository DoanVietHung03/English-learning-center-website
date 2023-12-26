import { Ex_Submission } from "@/models/ex_submission"
import { Exercise } from "@/models/exercise"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
        const idEx = await Ex_Submission.find({student_id: body.id}, {exercise_id: 1, _id: 0})

        var list_ex_done = []
        var ex_done
        for(var i = 0; i < idEx.length; i++){
            ex_done = await Exercise.findOne({_id: idEx[i].exercise_id})
            list_ex_done.push(ex_done)
        }
        //console.log(list_ex_done)
        return Response.json(list_ex_done);
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Exercise not existed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 