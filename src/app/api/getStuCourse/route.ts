import { Course } from "@/models/course"
import { User } from "@/models/user"
import mongoose from "mongoose"
import { cookies } from 'next/headers'
import { parse } from "path";
import { stringify } from "querystring";

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        
        mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
        var course;
        course = await Course.findOne({ _id: body.listStuCourseID })

        const studentList = course.student_id;

        const resStu = []
        for (var i = 0; i < studentList.length; i++) {
            const temp = await User.findOne({ phone: studentList[i] })
            resStu.push(temp)
        }
        return Response.json(resStu);
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Course not existed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 