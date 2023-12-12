import { Schema, model, models } from "mongoose";
import { User } from "@/models/user"

const courseSchema = new Schema({
    course_id: { 
        type: String, 
        required: true, 
        unique: true},
    name: { 
        type: String, 
        required: true},
    startDate: {
        type: Date,
        required: true},
    endDate: {
        type: Date,
        required: true},
    module: {
        type: String,
        required: true
    },
    member_id:[{
        type: String,
        required: true
    }],
}, { timestamps: true });

export const Course = models?.Course || model('Course', courseSchema)