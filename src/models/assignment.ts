import { Schema, model, models } from "mongoose";

const assignmentSchema = new Schema({
    assignment_id: { 
        type: String, 
        required: true},
    course_id: { 
        type: String, 
        required: true},
    topic: { 
        type: String, 
        required: true},
    skill: { 
        type: String, 
        required: true},
    startDate: {
        type: Date,
        required: true},
    dueDate: {
        type: Date,
        required: true},
    submission: [{
        answer: String,
        student_id:{
            type: String,
            required: true,
            unique: true
        },
        date_submit:{
            type: Date,
            default: Date.now,
        },
        grade: Number
    }],
}, { timestamps: true });

export const Assignment = models?.Assignment || model('Assignment', assignmentSchema)