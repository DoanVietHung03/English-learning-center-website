import mongoose from "mongoose"
import { User } from "@/models/user"
//import { Profile } from "@/models/profile";

//create Profile then set name and pass in User == info in profile
export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");        
        const updatedInfo = {
            name: body.userName,
            email: body.userEmail,
            birth: body.userBirth,
            address: body.userAddress,
            password: body.userPassword
        };
        console.log(updatedInfo)
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