import { User } from "@/models/user"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const pass = body.password;
    if ((!pass?.length || pass.length < 5)) {
        new Error('password must be at least 5 characters');
    }
    const createdUser = await User.create({
        phone: body.phone,
        password: body.password,
        type: body.type, // Đảm bảo giữ nguyên giá trị từ request body
    })
    return Response.json(createdUser)
}




export async function GET() {
    //mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    //const list_teacher = await User.find({type: 'teacher'},{phone: 1, type:0, name: 0, _id : 0})
    //console.log(list_teacher)

        // Kết nối Cơ sở dữ liệu (nên đặt ở một nơi khác, không nên đặt trong mỗi request)
        mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");

        const userCheck = await User.findOne({ type: 'Teacher' });

    return Response.json(userCheck)
}
