import { User } from "@/models/user"
import mongoose from "mongoose"

export async function POST(req) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const createdUser = await User.create(body)
    return Response.json(body)
}