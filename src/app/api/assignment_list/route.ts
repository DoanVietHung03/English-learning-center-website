import { Assignment } from "@/models/assignment"
import { Submission } from "@/models/submission"
import mongoose from "mongoose"

export async function POST(req: { json: () => any }) {
    const body = await req.json()
    mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
    var listAssignment = await Assignment.find({course_id: body.id})
    //const listSubmission = await Submission.find({student_id: body.userID}, {assignment_id: 1, status:1, _id: 0})
    var submission
    var statusList = []
    var numSubList = []
    var subList
    var numSub
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
    //console.log(numSubList)
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