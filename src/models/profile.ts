import { Schema, model, models } from "mongoose";

const profileSchema = new Schema({
    phone: {
        type: String
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    birth: {
        type: Date
    },
    address: {
        type: String
    },
    password: {
        type: String
    }
})

export const Profile = models?.Session || model('Profile', profileSchema)