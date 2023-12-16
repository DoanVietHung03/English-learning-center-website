import { Schema, model, models } from "mongoose";

const sessionSchema = new Schema({
    course_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    attendList: [{
        type: String,
        require: false
    }]
})

export const Session = models?.Session || model('Session', sessionSchema)