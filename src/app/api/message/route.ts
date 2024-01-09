import { Message } from "@/models/message"
import { User } from "@/models/user"
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    try{
        const body = await req.json()
        connectToDatabase();

        if(body.method === 'add'){
            const date = new Date()
            const createdMessage = await Message.create({
                sender: body.sender,
                receiver: body.receiver,
                content: body.content,
                sentDate: date,
                attachedFile: body.file,
            })
            return Response.json(createdMessage); 
        }
        else if (body.method === 'getList'){
            const sentMessages = await Message.find({sender: body.id})
            const receivedMessages = await Message.find({receiver: body.id})

            var receivers = []
            var receiver_avatar = []
            var receiver
            for (var i = 0; i < sentMessages.length; i++) {
                receiver = await User.findOne({phone: sentMessages[i].receiver}, {name: 1, avatar:1, _id: 0})
                receivers.push(receiver.name)
                receiver_avatar.push(receiver.avatar)
            }
            var combinedSentMessages = sentMessages.map((message,i) => {
                return {
                    _id: message._id,
                    sender: message.sender,
                    receiver: message.receiver,
                    content: message.content,
                    sentDate: message.sentDate,
                    attachedFile: message.attachedFile,
                    receiver_name: receivers[i],
                    receiver_avatar: receiver_avatar[i]
                };
            });
            combinedSentMessages.reverse()

            var senders = []
            var sender_avatar = []
            var sender
            for (var i = 0; i < receivedMessages.length; i++) {
                sender = await User.findOne({phone: receivedMessages[i].sender}, {name: 1, avatar:1, _id: 0})
                senders.push(sender.name)
                sender_avatar.push(sender.avatar)
            }
            var combinedReceivedMessages = receivedMessages.map((message,i) => {
                return {
                    _id: message._id,
                    sender: message.sender,
                    receiver: message.receiver,
                    content: message.content,
                    sentDate: message.sentDate,
                    attachedFile: message.attachedFile,
                    sender_name: senders[i], 
                    sender_avatar: sender_avatar[i]
                };
            });
            combinedReceivedMessages.reverse()
            return Response.json({combinedSentMessages, combinedReceivedMessages});  
        }
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Message fetching failed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 

