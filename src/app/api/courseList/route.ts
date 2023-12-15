// import { Course } from "@/models/course"
// import mongoose from "mongoose"
// import { cookies } from  'next/headers'

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 3000;

// app.use(bodyParser.json());

// app.post('/courseList', (req, res) => {
//   const userName = req.body.userName;
//   mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
//   // Thực hiện logic để lấy danh sách khóa học dựa trên userName
//   // const courses = Course.find({student_id:{$in: userName}})
//   // console.log(courses)

//   // Trả về danh sách khóa học dưới dạng JSON
//   res.json("thanh cong");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import { Course } from "@/models/course"
import { User} from "@/models/user"
import mongoose from "mongoose"
import { cookies } from  'next/headers'

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        var courses;
        mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
        const user = await User.findOne({phone: body.userName})
        if(user.type == "Teacher"){
          courses = await Course.find({teacher_id: body.userName})
        }
        else{
          courses = await Course.find()
          courses = courses.map(course => {
            if(course.student_id.includes(body.userName))
              return course
          })
          for(var i = 0; i < courses.length; i++){
            if(courses[i] == null)
              courses.splice(i)
          }
        }
        
        return Response.json(courses);
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Course not existed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 