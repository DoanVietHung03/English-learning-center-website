import { Message } from "@/models/message"
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    const date = new Date()
    connectToDatabase();

    const createdMessage = await Message.create({
        sender: body.sender,
        receiver: body.receiver,
        content: body.content,
        sentDate: date,
        attachedFile: body.attachedFile,
    })
    return Response.json(createdMessage);  
} 

