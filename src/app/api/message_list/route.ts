import { Message } from "@/models/message"
import { User } from "@/models/user"
import mongoose from "mongoose"


export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const sentMessages = await Message.find({sender: body.id})
    const receivedMessages = await Message.find({receiver: body.id})

    var receivers = []
    var receiverName
    for (var i = 0; i < sentMessages.length; i++) {
      receiverName = await User.findOne({phone: sentMessages[i].receiver}, {name: 1, _id: 0})
      receivers.push(receiverName.name)
    }
    var combinedSentMessages = sentMessages.map((message,i) => {
      return {
        sender: message.sender,
        receiver: message.receiver,
        content: message.content,
        sentDate: message.sentDate,
        attachedFile: message.attachedFile,
        receiver_name: receivers[i], 
      };
    });

    var senders = []
    var senderName
    for (var i = 0; i < receivedMessages.length; i++) {
        senderName = await User.findOne({phone: receivedMessages[i].sender}, {name: 1, _id: 0})
        senders.push(senderName.name)
    }
    var combinedReceivedMessages = receivedMessages.map((message,i) => {
      return {
        sender: message.sender,
        receiver: message.receiver,
        content: message.content,
        sentDate: message.sentDate,
        attachedFile: message.attachedFile,
        sender_name: senders[i], 
      };
    });

    return Response.json({combinedSentMessages, combinedReceivedMessages});  
} 