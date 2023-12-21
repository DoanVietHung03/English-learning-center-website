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
import { User } from "@/models/user"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
  try {
    const body = await req.json();
    var courses;
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
    const user = await User.findOne({ phone: body.userName })
    if (user.type == "Teacher") {
      courses = await Course.find({ teacher_id: body.userName })
    }
    else if (user.type == "Admin") {
      courses = await Course.find({})
    }
    else {
      courses = await Course.find()
      // courses = courses.map(course => {
      //   if (course.student_id.includes(body.userName))
      //     return course
      // })
      courses = courses
      .filter(course => course.student_id.includes(body.userName))
      .filter(course => course !== null);
      console.log(courses)

      // for (var i = 0; i < courses.length; i++) {
      //   if (courses[i] == null)
      //     courses.splice(i)
      // }
    }
    console.log(courses)

    var data = []
    var teacherName
    for (var i = 0; i < courses.length; i++) {
      //console.log(courses[i].teacher_id)
      teacherName = await User.findOne({phone: courses[i].teacher_id}, {name: 1, _id: 0})
      //console.log(teacherName.name)
      data.push(teacherName.name)
    }

    var combinedCourses = courses.map((course,i) => {
      return {
        name: course.name,
        startDate: course.startDate,
        module: course.module,
        room: course.room,
        schedule: course.schedule,
        teacher_id: course.teacher_id,
        student_id: course.student_id,
        teacher_name: data[i], // Giả sử id của sinh viên tương ứng với index của giáo viên trong mảng teachers
      };
    });
    //console.log(combinedCourses)
    return Response.json(combinedCourses);
  } catch (error) {
    return new Response(
      JSON.stringify(
        { ok: false, message: 'Course not existed' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
} 