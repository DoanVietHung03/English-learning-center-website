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
        type: Date,
        required: true,
    },
    attachedFile: String,
}, { timestamps: true });

export const Message = models?.Course || model('Message', messageSchema)