import { Schema, model, models } from "mongoose";

const reportSchema = new Schema({
    report_id: { 
        type: String, 
        required: true},
    username: { 
        type: String, 
        required: true},
    content: { 
        type: String, 
        required: true},
    image: {
        type: [String],
        require: true,
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    date_completed: {
        type: Date
    },
    status: {
        type: String,
        require: true,
    }
}, { timestamps: true });

export const Report = models?.User || model('Report', reportSchema)

