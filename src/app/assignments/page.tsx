/* eslint-disable react/jsx-key */
'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import Icalendar from "@/components/icons/icon_cal"
import Ibook from "@/components/icons/icon_book"
import { useEffect, useState } from "react"
import moment from "moment"
import IcirclePlus from "@/components/icons/circlePlus"

export default function Assigments() {
    const type = localStorage.getItem('userType')
    const [assignments, setAssignment] = useState([])

    console.log(localStorage.getItem('userType'))
    console.log(localStorage.getItem('course_id'))


    useEffect(() => {
        fetch('/api/assignment_list', {
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem('course_id'), userID: localStorage.getItem('userName') }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                setAssignment(data)
                console.log(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    //console.log(assignments)

    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black">
                        Assignments
                    </div>

                    <div className="mt-4 bg-white rounded-lg">
                        <div className="p-2 ml-2 font-poppins text-xs">{localStorage.getItem("course_name")}</div>
                    </div>


                    <div className="bg-white mt-2 pb-8 rounded">
                        <div className="flex-col ml-6 mr-6">
                            <div className="flex items-center p-4 border-b border-black mb-5">
                                <button className="flex items-center font-poppins justify-center border border-stone-300 hover:bg-blue-300 p-2 rounded-lg">
                                    <Icalendar />
                                    <Link href={'/course_Time'} className="ml-2">Timetable</Link>
                                </button>
                                <button className="flex items-center font-poppins justify-center  border border-stone-300 bg-blue-300 p-2 rounded-lg ml-8">
                                    <Ibook />
                                    <p className="ml-2">Assignments</p>
                                </button>
                            </div>
                            <div className="flex justify-between pb-3 px-3 border-b-2 border-gray-300">
                                <div className="font-semibold items-center">
                                    {assignments.length + " "} assignments in this course
                                </div>
                                {(type == 'Teacher') &&
                                    <Link href={'/teacher_add_ass'}
                                        className="flex float-right font-semibold bg-zinc-100 border border-stone-300 hover:bg-green-300 p-2 rounded-lg ml-8 transition-colors duration-300 gap-4">
                                        <IcirclePlus className="w-5 fill-black" />
                                        Add assignment
                                    </Link>
                                }
                            </div>
                            <div className="h-80 overflow-y-scroll">
                                {assignments.map(assignment => (type === "Student" && (
                                    <Link href={'/assignment_submit'}
                                        onClick={() => { localStorage.setItem("assignment_id", assignment._id),
                                                        console.log(assignment.status) }}
                                        className="mt-10 grid grid-cols-2 border border-black rounded-lg hover:bg-gray-300 transition-colors duration-300">
                                        <div className=" p-2 flex items-center ">
                                            <Ibook />
                                            <div className="ml-4 font-poppins">
                                                {assignment.title} - {assignment.skill}
                                            </div>
                                        </div>

                                        <div className=" p-2 flex items-center justify-end">
                                            <div className="font-poppins font-medium">
                                                Deadline:
                                            </div>
                                            <div className="ml-1 font-poppins">
                                                {moment.utc(assignment.deadline).format('MM/DD/YYYY')}
                                            </div>
                                        </div>
                                    </Link>
                                )))}

                                {assignments.map(assignment => (type === "Teacher" && (
                                    <Link href={'/teacher_grading'} onClick={() => { localStorage.setItem('assignment_id', assignment._id) }}
                                        className="mt-10 grid grid-cols-2 border border-black rounded-lg hover:bg-gray-300 transition-colors duration-300">
                                        <div className=" p-2 flex items-center ">
                                            <Ibook />
                                            <div className="ml-4 font-poppins">
                                                {assignment.title} - {assignment.skill}
                                            </div>
                                        </div>

                                        <div className=" p-2 flex items-center justify-end">
                                            <div className="font-poppins font-medium">
                                                Deadline:
                                            </div>
                                            <div className="ml-1 font-poppins">
                                                {moment.utc(assignment.deadline).format('MM/DD/YYYY')}
                                            </div>
                                        </div>
                                    </Link>
                                )))}
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}