import { User } from "@/models/user"
import { connectToDatabase } from '../../../connection';


export async function POST(req: { json: () => any }) {
    const body = await req.json()
    connectToDatabase();
    const userName = await User.findOne({phone: body.id},{name:1, _id: 0})
    return Response.json(userName)
}