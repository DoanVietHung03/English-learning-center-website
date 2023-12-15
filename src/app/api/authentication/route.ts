import mongoose from "mongoose";
import { User } from "@/models/user";

export async function POST(req) {
    try {
        const body = await req.json();
        const phone = body.phone;
        const password = body.password;

        // Kết nối Cơ sở dữ liệu (nên đặt ở một nơi khác, không nên đặt trong mỗi request)
        await mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");

        const userCheck = await User.findOne({ phone });

        if (!userCheck) {
            return new Response(
                JSON.stringify(
                    { ok: false, message: 'User not existed' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 500,
            });
        }

        const passwordOk = (password == userCheck.password);
        if (!passwordOk) {
            return new Response(
                JSON.stringify(
                    { ok: false, message: 'Wrong password'}), {
                headers: { 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        const data = {
            check: true,
            userType: userCheck.type
        }
        //console.log(data)
        return Response.json({
            check: true,
            userType: userCheck.type
        })

        // return new Response(
        //     JSON.stringify(data), {
        //     headers: { 'Content-Type': 'application/json' },
        //     status: 200,
        // });

    } catch (error) {
        console.error('Error during authentication:', error);
        return Response.json({ ok: false, message: 'Internal server error' });
    }
}

