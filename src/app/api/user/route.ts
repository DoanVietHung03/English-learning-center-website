import { User } from "@/models/user"
import { connectToDatabase } from '../../../connection';


export async function POST(req: { json: () => any }) {
    try{
        const body = await req.json()
        connectToDatabase();

        if(body.method === 'add'){
            const pass = body.password;
            if ((!pass?.length || pass.length < 5)) {
                return new Response(
                    JSON.stringify(
                        { ok: false, message: 'Invalid password' }), {
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
        else if(body.method === 'check'){
            const userCheck = await User.findOne({ phone : body.phone });

            if (!userCheck) {
                return new Response(
                    JSON.stringify(
                        { ok: false, message: 'User not found' }), {
                    headers: { 'Content-Type': 'application/json' },
                    status: 500,
                });
            }

            const passwordOk = (body.password == userCheck.password);
            if (!passwordOk) {
                return new Response(
                    JSON.stringify(
                        { ok: false, message: 'Wrong password' }), {
                    headers: { 'Content-Type': 'application/json' },
                    status: 200,
                });
            }
            return Response.json({
                check: true,
                userType: userCheck.type,
                userFname: userCheck.name
            })
        }
        else if(body.method === 'getInfo'){
            const getUser = await User.findOne({phone: body.phone});
            return Response.json(getUser);
        }
        else if(body.method === 'changeInfo'){
            var updatedInfo
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
        }

    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'User fetching failed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
}

export async function GET() {
    connectToDatabase();
    const teachers = await User.find({ type: 'Teacher' });
    const students = await User.find({ type: 'Student' });
    return Response.json({ teachers, students })
}





