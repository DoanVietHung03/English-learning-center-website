import { Schema, model, models } from "mongoose";

const submissionSchema = new Schema({
    student_id:{
        type: String
    },
    assignment_id:{
        type: String,
    },
    answer: {
        type: String,
        //required: true
    },
    grade:{
        type: Number
    }
}, { timestamps: true });

export const Submission = models?.Submission || model('Submission', submissionSchema)