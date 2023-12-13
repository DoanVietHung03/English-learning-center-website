import {Schema, model, models} from "mongoose";

const sessionSchema =new Schema({
    course_id: {
        type: String
    },
    Date: {
        type: Date
    }
})

export const Session = models?.Session|| model('Session', sessionSchema)