import mongoose from "mongoose"
import { cookies } from 'next/headers'
import { User } from "@/models/user"
import { Profile } from "@/models/profile";

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
        const getUser = await User.findOne({
            phone: body.phone,
            name: body.name,  
        });

        // console.log(createdCourse);
        return Response.json(getUser);
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'User not existed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 