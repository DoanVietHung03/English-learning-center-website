import { User} from "@/models/user"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const phone = body.phone;
    const password = body.password;

    const username = await User.findOne({ phone });

    if (!username || username.password !== password ) {
        throw new Error('Username or password is invalid');
    }

   // const created = await Exercise.create(body)
    
    return Response.json({message: 'Login successful'});
}
