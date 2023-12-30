import { Assignment } from "@/models/assignment"
import { Submission } from "@/models/submission"
import { connectToDatabase } from '../../../connection';


export async function POST(req: { json: () => any }) {
    const body = await req.json()
    connectToDatabase();
    var listAssignment = await Assignment.find({course_id: body.id})
    var submission
    var statusList = []
    var numSubList = []
    var subList
    if(body.userType == "Student"){
        for (var i =0; i < listAssignment.length; i++){
            submission = await Submission.findOne({student_id: body.userID, assignment_id: listAssignment[i]._id}, {status: 1, _id: 0})
            if(submission !== null){
                statusList.push(submission.status)
            }
            else{
                statusList.push('null')
            }
        } 
    }
    if(body.userType == "Teacher"){
        for (var i =0; i < listAssignment.length; i++){
            subList = await Submission.find({assignment_id: listAssignment[i]._id}, {_id: 1})
            numSubList.push(subList.length)
        }
       
    }
    var combinedAssignments = listAssignment.map((assignment,i) => {
        return {
          _id: assignment._id,
          content: assignment.content,
          skill: assignment.skill,
          deadline: assignment.deadline,
          title: assignment.title,
          course_id: assignment.course_id,
          attachedFile: assignment.attachedFile,
          graded: assignment.graded, //da cham
          numSub: numSubList[i],//so luong bai da nop
          status: statusList[i],
        };
    });
    return Response.json(combinedAssignments)
}