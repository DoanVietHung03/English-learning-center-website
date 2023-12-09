import nextAuth from "next-auth";
import { User } from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
const handler = nextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: 'credentials',
            credentials: {
                phone: { label: "Phone", type: "phone", placeholder: "0123456789" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const phone = credentials?.phone;
                const password = credentials?.password

                mongoose.connect(
                    "mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
                const user = await User.findOne({ phone })
                const passwordOk = user && (password == user.password)

                if (passwordOk) {
                    console.log('nhap dung tai khoan: ', user.phone, "va mat khau: ", user.password)
                    return user
                }
                return null;
            }
        })
    ]
})

export { handler as GET, handler as POST }