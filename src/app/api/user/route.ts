import { User } from "@/models/user"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const pass = body.password;
    if ((!pass?.length || pass.length < 5)) {
        new Error('password must be at least 5 characters');
    }
    const createdUser = await User.create({
        phone: body.phone,
        password: body.password,
        type: body.type, // Đảm bảo giữ nguyên giá trị từ request body
    })
    return Response.json(createdUser)
}

export async function GET(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const findType = body.type
    const list_teacher = await User.find({type: findType})
    return Response.json(list_teacher)
}