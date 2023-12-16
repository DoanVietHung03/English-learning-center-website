import { Schema, model, models } from "mongoose";

const submissionSchema = new Schema({
    student_id:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    assignment_id:{
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    },
    answer: {
        type: String,
    },
    grade:{
        type: Number
    }
}, { timestamps: true });

export const Submission = models?.Submission || model('Submission', submissionSchema)