import { Schema, model, models } from "mongoose";

const assignmentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        Required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    attachedFile: String,
    submissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Submission'
    }]
}, { timestamps: true });

export const Assignment = models?.Assignment || model('Assignment', assignmentSchema)