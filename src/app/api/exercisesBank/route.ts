import { Exercise } from "@/models/exercise"
import { connectToDatabase } from '../../../connection';


export async function POST(req: { json: () => any }) {
    const body = await req.json()
    connectToDatabase();
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
    connectToDatabase();
    const exbank = await Exercise.find({},{title: 1, module: 1, skill: 1});
    return Response.json(exbank)
}