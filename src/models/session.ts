import {Schema, model, models} from "mongoose";

const sessionSchema =new Schema({
    course_id: {
        type: String
    },
    Room: {
        type: String
    },
    Name: {
        type: String
    },
    attendList: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

export const Session = models?.Session|| model('Session', sessionSchema)