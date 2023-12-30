import { User } from "@/models/user"
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        var updatedInfo
        connectToDatabase();
        if(body.userPassword != ''){        
            updatedInfo = {
                name: body.userName,
                email: body.userEmail,
                birth: body.userBirth,
                address: body.userAddress,
                password: body.userPassword
            };
        }
        else{
            updatedInfo = {
                name: body.userName,
                email: body.userEmail,
                birth: body.userBirth,
                address: body.userAddress
            };
        }
        const submissionEdit = await User.updateOne({ phone: body.userID }, { $set: updatedInfo });
        return Response.json(submissionEdit);
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Cannot update profile' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 