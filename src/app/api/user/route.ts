import { User } from "@/models/user"
import { connectToDatabase } from '../../../connection';


export async function POST(req: { json: () => any }) {
    const body = await req.json()
    connectToDatabase();
    const pass = body.password;
    if ((!pass?.length || pass.length < 5)) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'User not existed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
    const createdUser = await User.create({
        phone: body.phone,
        password: body.password,
        name: body.name,
        type: body.type, 
        email: null,
        birth: null,
        address: null,
    })
    return Response.json(createdUser)
}

export async function GET() {
    connectToDatabase();
    const teachers = await User.find({ type: 'Teacher' });
    const students = await User.find({ type: 'Student' });
    return Response.json({ teachers, students })
}





