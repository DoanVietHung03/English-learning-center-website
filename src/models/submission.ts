import { Schema, model, models } from "mongoose";

const submissionSchema = new Schema({
    student_id:{
        type: String,
        required: true
    },
    assignment_id:{
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: false
    },
    comment:{
        type: String,
        required: false
    },
    grade:{
        type: Number,
        required: false
    },
    attachedFile:{
        type: String,
        required: false
    },
    status:{
        type: String,
        required: false
    }
}, { timestamps: true });

export const Submission = models?.Submission || model('Submission', submissionSchema)