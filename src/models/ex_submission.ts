import { Schema, model, models } from "mongoose";

const ex_submissionSchema = new Schema({
    student_id:{
        type: String,
        required: true
    },
    exercise_id:{
        type: String,
        required: true
    },
    progress: {
        type: String,
        required: false
    },
}, { timestamps: true });

export const Ex_Submission = models?.Ex_Submission || model('Ex_Submission', ex_submissionSchema)