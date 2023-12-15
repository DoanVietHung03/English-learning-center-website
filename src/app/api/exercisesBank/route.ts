import { Exercise } from "@/models/exercise"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const createdExercise = await Exercise.create({
        title: body.title,
        content: body.content,
        skill: body.skill,
        solution: body.file,
        attachedFile: body.filemp3,
        module: body.module
    })
    console.log(createdExercise)
    return Response.json(createdExercise)
}

export async function GET() {
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
    const exbank = await Exercise.find();
    return Response.json(exbank)
}