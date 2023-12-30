import { Course } from "@/models/course"
import { User } from "@/models/user"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
  try {
    const body = await req.json();
    var courses;
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management");
    if (body.userType == "Teacher") {
      courses = await Course.find({ teacher_id: body.id })
    }
    else if (body.userType == "Admin") {
      courses = await Course.find({})
    }
    else {
      courses = await Course.find()
      // courses = courses.map(course => {
      //   if (course.student_id.includes(body.userName))
      //     return course
      // })
      courses = courses
      .filter(course => course.student_id.includes(body.id))
      .filter(course => course !== null);
      //console.log(courses)

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
        course_id: course._id,
        name: course.name,
        startDate: course.startDate,
        module: course.module,
        room: course.room,
        schedule: course.schedule,
        teacher_id: course.teacher_id,
        student_id: course.student_id,
        teacher_name: data[i], 
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