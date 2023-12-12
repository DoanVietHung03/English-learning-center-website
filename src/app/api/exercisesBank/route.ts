import { Exercise } from "@/models/exercise"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const exercise_id = body.exercise_id;

    const id = await Exercise.findOne({ exercise_id })
    if (id) {
        throw new Error('Course is existed');
    }
    const createdExercise = await Exercise.create(body)
    return Response.json(createdExercise)
}