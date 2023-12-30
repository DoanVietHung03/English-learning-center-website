import { User } from "@/models/user"
import { connectToDatabase } from '../../../connection';

//create Profile then set name and pass in User == info in profile
export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        connectToDatabase();    
        const getUser = await User.findOne({
            phone: body.phone
        });
        return Response.json(getUser);
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Cannot update profile' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 