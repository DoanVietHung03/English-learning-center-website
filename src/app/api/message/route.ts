import { Message } from "@/models/message"
import mongoose from "mongoose"


export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const createdMessage = await Message.create({
        receiver: body.receiver,
        content: body.content,
        sentDate: body.sentDate,
        attachedFile: body.attachedFile,
    })
    return Response.json(createdMessage)
} 

