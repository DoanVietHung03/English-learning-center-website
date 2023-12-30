import { Submission } from "@/models/submission"
import { User } from "@/models/user"
import { connectToDatabase } from '../../../connection';


export async function POST(req: { json: () => any }) {
    const body = await req.json()
    connectToDatabase();
    const submissions = await Submission.find({assignment_id: body.id})

    var data = []
    var studentName
    for (var i = 0; i < submissions.length; i++) {
      studentName = await User.findOne({phone: submissions[i].student_id}, {name: 1, _id: 0})
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
        status: submission.status,
        student_Name: data[i], 
      };
    });
    return Response.json(combinedSubmissions);
}
