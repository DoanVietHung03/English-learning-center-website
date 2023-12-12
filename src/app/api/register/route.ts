import { User } from "@/models/user"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const phone = body.phone;
    const pass = body.password;
    const user = await User.findOne({ phone })
    if ((!pass?.length || pass.length < 5) || user) {
        new Error('password must be at least 5 characters or phone is existed');
    }
    const createdUser = await User.create(body)
    return Response.json(body)
}

