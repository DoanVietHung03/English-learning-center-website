import { Schema, model, models } from "mongoose";

const reportSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    file: {
        type: String,
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    date_completed: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        default: "Not completed"
    }
}, { timestamps: true });

export const Report = models?.User || model('Report', reportSchema)

