import { Message } from "@/models/message"
import mongoose from "mongoose"


export async function POST(req: { json: () => any }) {
    const body = await req.json()
    const date = new Date()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const createdMessage = await Message.create({
        sender: body.sender,
        receiver: body.receiver,
        content: body.content,
        sentDate: date,
        attachedFile: body.attachedFile,
    })
    return Response.json(createdMessage);  
} 

