import { Schema, model, models } from "mongoose";

const exerciseSchema = new Schema({
    exercise_id: { 
        type: String, 
        required: true},
    topic: { 
        type: String, 
        required: true},
    solution: { 
        type: String, 
        required: true},
    submission: [{
        answer: String,
        student_id:{
            type: String,
            required: true,
            unique: true
        },
    }],
}, { timestamps: true });

export const Exercise = models?.Exercise || model('Exercise', exerciseSchema)