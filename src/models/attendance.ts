import { Schema, model, models } from "mongoose";

const attendanceSchema = new Schema({
    course_id: {
        type: String,
        required: false
    },
    session_id: {
        type: String,
        required: true
    },
    studentList: [{
        type: String,
        required: false
    }],

}, { timestamps: true });

export const Attendance = models?.Attendance || model('Attendance', attendanceSchema)