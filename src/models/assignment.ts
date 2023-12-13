import { Schema, model, models } from "mongoose";

const assignmentSchema = new Schema({
    course_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    fileRecord: {
        type: File,
    },
    submission: [{
        answer: String,
        student_id: {
            type: String,
            required: true,
            unique: true
        },
        date_submit: {
            type: Date,
            default: Date.now,
        },
        grade: Number
    }],
    attachedFile: String,
}, { timestamps: true });

export const Assignment = models?.Assignment || model('Assignment', assignmentSchema)