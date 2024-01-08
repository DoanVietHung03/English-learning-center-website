import { Submission } from "@/models/submission"
import { Assignment } from "@/models/assignment"
import { User } from "@/models/user"
import { connectToDatabase } from '../../../connection';

export async function POST(req: { json: () => any }) {
    try{
        const body = await req.json()
        connectToDatabase();
        if(body.method === 'add'){
            const createdSubmission = await Submission.create({
                student_id: body.id_student,
                assignment_id: body.id_assignment,
                answer: body.answer,
                grade: null,
                comment: null,
                status: 'Pending',
                attachedFile: body.file
            })
            return Response.json(createdSubmission);
        }
        else if(body.method === 'getList'){
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
            combinedSubmissions.reverse()
            return Response.json(combinedSubmissions);
        }
        else if(body.method === 'getInfo'){
            const submission = await Submission.findOne({student_id: body.id, assignment_id: body.assignment_id})
            return Response.json(submission);
        }
        else if (body.method === 'grading'){
            var status
            var newGraded
            const gradedSubmission = await Assignment.findOne({_id: body.assignment_id}, {graded: 1, _id:0})

            if(body.grade !== null){
                newGraded = gradedSubmission.graded + 1
                status = "Marked"
            }
            else{
                newGraded = gradedSubmission.graded
                status = "Pending"
            }
            const updatedGrade = {
                grade: body.grade,
                comment: body.comment,
                status: status
            };
            const submissionEdit = await Submission.updateOne({ _id: body.id }, { $set: updatedGrade });
            const updatedAssignment = {
                graded: newGraded
            };
            const assignmentEdit = await Assignment.updateOne({ _id: body.assignment_id }, { $set: updatedAssignment });
            return Response.json(submissionEdit);
        }
    } catch (error) {
        return new Response(
            JSON.stringify(
                { ok: false, message: 'Submission fetching failed' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
}

