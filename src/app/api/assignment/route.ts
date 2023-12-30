import { Assignment } from "@/models/assignment"
import mongoose from "mongoose"
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    connectToDatabase();
    const createdAssignment = await Assignment.create({
        title: body.title,
        deadline: body.deadline,
        content: body.content,
        skill: body.skill,
        attachedFile: body.file,
        course_id: body.id,
        graded: 0
    })
    console.log(createdAssignment)
    return Response.json(createdAssignment)
}
