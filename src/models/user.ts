import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    name: { type: String, required: true },
    type: { type: String, required: true },
}, { timestamps: true });

export const User = models?.User || model('User', userSchema)

