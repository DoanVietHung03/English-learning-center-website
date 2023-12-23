import { Submission } from "@/models/submission"
import { User } from "@/models/user"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    const submissions = await Submission.find({assignment_id: body.id})
    console.log(submissions)

    var data = []
    var studentName
    for (var i = 0; i < submissions.length; i++) {
      //console.log(courses[i].teacher_id)
      studentName = await User.findOne({phone: submissions[i].student_id}, {name: 1, _id: 0})
      //console.log(teacherName.name)
      data.push(studentName.name)
    }

    var combinedSubmissions = submissions.map((submission,i) => {
      return {
        _id: submission._id,
        assignment_id: submission.assignment_id,
        answer: submission.answer,
        comment: submission.comment,
        grade: submission.grade,
        attachedFile: submission.attachedFile,
        student_id: submission.student_id,
        student_Name: data[i], 
      };
    });
    return Response.json(combinedSubmissions);
}
