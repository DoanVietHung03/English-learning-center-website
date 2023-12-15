import { Schema, model, models } from "mongoose";

const messageSchema = new Schema({
    receiver: {
        type: String,
        required: true
    },
    content: { 
        type: String, 
        required: true
    },
    sentDate: {
        type: Date
    },
    attachedFile: String,
}, { timestamps: true });

export const Message = models?.Message || model('Message', messageSchema)