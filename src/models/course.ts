import { Schema, model, models } from "mongoose";
import { User } from "@/models/user"

const courseSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    module: {
        type: String,
        required: true
    },
    teacher_id: {
        type: String,
        required: true
    },
    student_id: [{
        type: String,
        required: true
    }],
}, { timestamps: true });

export const Course = models?.Course || model('Course', courseSchema)