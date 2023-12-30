import { Assignment } from "@/models/assignment"
import { connectToDatabase } from '../../../connection';


export async function POST(req: { json: () => any }) {
    const body = await req.json()
    connectToDatabase();
    const createdAssignment = await Assignment.findOne({ _id: body.id })
    return Response.json(createdAssignment)
}