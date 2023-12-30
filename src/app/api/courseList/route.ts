import { Course } from "@/models/course"
import { User } from "@/models/user"
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
  try {
    const body = await req.json();
    var courses;
    connectToDatabase();
    if (body.userType == "Teacher") {
      courses = await Course.find({ teacher_id: body.id })
    }
    else if (body.userType == "Admin") {
      courses = await Course.find({})
    }
    else {
      courses = await Course.find()
      courses = courses
      .filter(course => course.student_id.includes(body.id))
      .filter(course => course !== null);
    }
    var data = []
    var teacherName
    for (var i = 0; i < courses.length; i++) {
      teacherName = await User.findOne({phone: courses[i].teacher_id}, {name: 1, _id: 0})
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