import { Submission } from "@/models/submission"
import { Assignment } from "@/models/assignment"
import { connectToDatabase } from '../../../connection';


export async function POST(req: { json: () => any }) {
    const body = await req.json()
    var status
    if(body.grade !== null){
        status = "Marked"
    }
    else{
        status = "Pending"
    }
    connectToDatabase();
    const updatedGrade = {
        grade: body.grade,
        comment: body.comment,
        status: status
    };
    const submissionEdit = await Submission.updateOne({ _id: body.id }, { $set: updatedGrade });
    const gradedSubmission = await Assignment.findOne({_id: body.assignment_id}, {graded: 1, _id:0})
    var newGraded = gradedSubmission.graded + 1
    const updatedAssignment = {
        graded: newGraded
    };
    const assignmentEdit = await Assignment.updateOne({ _id: body.assignment_id }, { $set: updatedAssignment });

    return Response.json(submissionEdit);
}
