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
        required: false
    },
    date_created: {
        type: Date,
        required: true
    },
    date_completed: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Report = models?.Report || model('Report', reportSchema)

