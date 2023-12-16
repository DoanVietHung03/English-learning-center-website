'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import Icalendar from "@/components/icons/icon_cal"
import Ibook from "@/components/icons/icon_book"
import { useState, useEffect } from "react"
import moment from "moment"
export default function CourseTime() {
    const [course, setCourse] = useState('')
    const [sessions, setSessions] = useState([])
    useEffect(() => {
        fetch('/api/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("course_id") }),
        })
            .then(response => response.json())
            .then(data => {
                // Hiển thị danh sách khóa học trong giao diện
                setCourse(data.course)
                setSessions(data.sessions)
                // sessions = data.sessions
                console.log(data.sessions)
                console.log(sessions)
            })
            .catch(error => console.error('Error:', error));
    }, []);
    // console.log(sessions)
    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black">
                        Courses List
                    </div>
                    <div className="mt-4 bg-white rounded-lg">
                        <div className="p-2 ml-2 font-poppins text-xs">{course.name}</div>
                    </div>
                    <div className="bg-sky-100 mt-2">
                        <div className="ml-6">
                            <div className="flex items-center p-4">
                                <button className="flex items-center justify-center border border-stone-300 bg-blue-300 p-2 rounded-lg">
                                    <Icalendar />
                                    <p className="ml-2">Timetable</p>
                                </button>
                                <button className="flex items-center justify-center bg-zinc-100 border border-stone-300 hover:bg-blue-300 p-2 rounded-lg ml-8">
                                    <Ibook />
                                    <Link href={'/assignments'} className="ml-2">Assignments</Link>
                                </button>
                            </div>

                            <div className="flex p-4 justify-between">
                                <div className=" font-poppins text-blue-500 bg-white border p-1 text-sm rounded-lg px-3 py-2">
                                    Overall: 24 sessions
                                </div>

                                <div className=" font-poppins text-blue-500 bg-white border p-1 text-sm rounded-lg px-3 py-2">
                                    Teacher: {course.teacher_id}
                                </div>

                                <div className=" font-poppins text-blue-500 bg-white border p-1 text-sm rounded-lg px-3 py-2">
                                    Room: {course.room}
                                </div>

                                <div className=" font-poppins text-blue-500 bg-white border p-1 text-sm rounded-lg px-3 py-2">
                                    Start date: {moment.utc(course.startDate).format('MM/DD/YYYY')}
                                </div>

                                <div className=" font-poppins text-blue-500 bg-white border p-1 text-sm rounded-lg px-3 py-2">
                                    {course.schedule}
                                </div>
                            </div>
                            <div className="inline-block ml-4 gap-4">
                                {
                                    sessions.map((session, i) => (
                                        <>
                                            <div className="inline-block bg-white mb-4 mr-24 rounded-lg py-3 pl-5 pr-28">
                                                <div className="font-bold text-blue-400 mb-3">
                                                    OFFLINE
                                                </div>
                                                <div className="flex gap-14 items-center mb-3">
                                                    <div className="font-semibold font-poppins">
                                                        {session.name}
                                                    </div>
                                                    <div className="font-bold font-poppins text-sm">
                                                        23:00 - 2:00
                                                    </div>
                                                </div>
                                                {(i % 3 == 0) &&
                                                    <div className="font-bold">Skill: Reading & Listening</div>
                                                }
                                                {(i % 3 == 2) &&
                                                    <div className="font-bold">Skill: Writing</div>
                                                }
                                                {(i % 3 == 1) &&
                                                    <div className="font-bold">Skill: Speaking</div>
                                                }
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}