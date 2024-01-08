import { Schema, model, models } from "mongoose";

const assignmentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    course_id: {
        type: String,
        required: true
    },
    graded:{
        type: Number,
        required: true
    },
    attachedFile: String,
}, { timestamps: true });

export const Assignment = models?.Assignment || model('Assignment', assignmentSchema)