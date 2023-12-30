import { User } from "@/models/user";
import { connectToDatabase } from '../../../connection';

export async function POST(req) {
    try {
        const body = await req.json();
        const phone = body.phone;
        const password = body.password;

        // Kết nối đến MongoDB
        connectToDatabase();
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
                    { ok: false, message: 'Wrong password' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        // const data = {
        //     check: true,
        //     userType: userCheck.type,
        //     userFname: userCheck.name
        // }
        // //console.log(data)
        return Response.json({
            check: true,
            userType: userCheck.type,
            userFname: userCheck.name
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

