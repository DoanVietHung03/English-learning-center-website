import { Course } from "@/models/course"
import { Session } from "@/models/session";
import { User } from "@/models/user"
import { Assignment } from "@/models/assignment"
import { Submission } from "@/models/submission"

import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    try {
        const body = await req.json();
        connectToDatabase();
        if(body.method === 'add'){
            const createdCourse = await Course.create({
                name: body.title,
                schedule: body.schedule,
                room: body.room,
                startDate: body.sDate,
                module: body.module,
                teacher_id: body.teacher,
                student_id: body.student_added
            });
            for (var i = 0; i < 24; i++) {
                await Session.create({
                    course_id: createdCourse._id,
                    name: 'Session ' + String(i + 1),
                    attendList : null
                })
            }
            return Response.json(createdCourse);
        }
        else if(body.method === 'getInfo'){
            const course = await Course.findOne({_id: body.id})
            const teacher = await User.findOne({phone: course.teacher_id},{name: 1, _id: 0})

            const combinedCourse = {
                _id: course._id,
                name: course.name,
                startDate: course.startDate,
                module: course.module,
                room: course.room,
                schedule: course.schedule,
                teacher_id: course.teacher_id,
                student_id: course.student_id,
                teacher_name: teacher.name
            }
            return Response.json(combinedCourse);
        }

        else if (body.method === 'getList'){
            var courses;
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
            combinedCourses.reverse()
            return Response.json(combinedCourses);
        }
        else if (body.method === 'getStudentList'){
            var course;
            course = await Course.findOne({ _id: body.id })

            const studentList = course.student_id;

            const listStudent = []
            for (var i = 0; i < studentList.length; i++) {
                const temp = await User.findOne({ phone: studentList[i] })
                listStudent.push(temp)
            }
            return Response.json(listStudent);
        }
        else if (body.method === 'getAttendList'){
            const studentListAttend = await Session.findOne({_id: body.id}, {attendList: 1, _id: 0})
            const studentList = await Course.findOne({_id: body.course_id}, {student_id: 1, _id: 0})

            if(studentListAttend.attendList !== null){
                var student_name = []
                var attend = []
                var name

                for(var i = 0; i < studentList.student_id.length; i++){
                    if(studentListAttend.attendList.includes(studentList.student_id[i]) === true){
                        attend.push(true)
                    }
                    else{
                        attend.push(false)
                    }
                    name = await User.findOne({phone: studentList.student_id[i]}, {name: 1, _id: 0})
                    student_name.push(name.name)
                }

                const student_list = studentList.student_id.map((student, i) => {
                    return {
                        id: student,
                        name: student_name[i], 
                        isAttended: attend[i]
                    };
                })
                return Response.json(student_list);
            }
            else{
                return Response.json(null);
            }
        }
        else if (body.method === 'updateAttend'){
            const updatedAttend = {
                attendList: body.studentList
            };
            const attendEdit = await Session.updateOne({ _id: body.id, course_id: body.course_id }, { $set: updatedAttend });

            return Response.json(attendEdit);
        }
        else if (body.method === 'getSessionList'){
            const sessionList = await Session.find({course_id: body.id})
            return Response.json(sessionList);
        }
        else{
            const listAssignment = await Assignment.find({course_id : body.course_id},{_id: 1})
            for(var i = 0; i < listAssignment.length;i++){
                await Submission.deleteMany({assignment_id : listAssignment[i]._id})
            }
            const deleteAssignment = await Assignment.deleteMany({course_id : body.course_id})
            const deleteSession = await Session.deleteMany({course_id : body.course_id})
            const deleteCourse = await Course.deleteOne({_id : body.course_id})
            Response.json({deleteAssignment, deleteSession, deleteCourse })
        }
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Course fetching failed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
} 
