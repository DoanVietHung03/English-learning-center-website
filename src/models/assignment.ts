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
    course_id: {
        type: String,
        required: true
    },
    attachedFile: String,
    // submissions: [{
    //     student_id:{
    //         type: String,
    //         required: false
    //     },
    //     answer: {
    //         type: String,
    //         required: false
    //     },
    //     grade:{
    //         type: Number,
    //         required: false
    //     }
    // }]
}, { timestamps: true });

export const Assignment = models?.Assignment || model('Assignment', assignmentSchema)