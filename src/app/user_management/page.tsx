'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import Icalendar from "@/components/icons/icon_cal"
import Ibook from "@/components/icons/icon_book"
import { useEffect, useState } from "react"
import Iteacher from "@/components/icons/icon_teacher"
import Istudent from "@/components/icons/icon_student"
export default function UserManagement() {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    useEffect(() => {
        localStorage.setItem('sidebar', 3)
        fetch('/api/user')
            .then(res => res.json())
            .then(data => {
                setTeachers(data.teachers)
                setStudents(data.students)
            })
    }, []);
    const noStudent = students.length
    const noTeacher = teachers.length
    return (
        <>
            <Header />
            <div className="flex gap-4">
                <SideBar />
                <div className="w-3/4 mr-8">
                    <div className="flex mt-2 pb-1 w-full border-b justify-between border-black">
                        <div className="font-poppins font-bold text-5xl ">
                            User Manangement
                        </div>
                        <Link href='/register' className="bg-lime-400 flex gap-3 rounded-xl items-center justify-center py-3 px-3">
                            <div className="text-2xl font-bold">+</div>
                            <div className="font-bold flex items-center">Add User</div>
                        </Link>
                    </div>
                    <div className="bg-white grid grid-cols-2 mt-3 rounded-lg pt-6 pb-6 h-[475px]">
                        <div className="gap-3 border-r-2 border-black pr-7 overflow-y-auto">
                            <div className="flex items-center justify-center font-bold text-xl">Teacher</div>
                            {
                                teachers.map(teacher => (
                                    // eslint-disable-next-line react/jsx-key
                                    <div className="flex gap-3 p-3 items-center bg-gray-300 ml-5 rounded-xl mt-2">
                                        <Iteacher className="flex w-8 fill-gray-500" />
                                        <div className="flex gap-4">
                                            <div className="text-gray-500">{teacher.phone}</div>
                                            <div className="text-gray-500"> {teacher.name}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="gap-3 pr-6 ml-[10px] overflow-y-auto">
                            <div className="flex items-center justify-center font-bold text-xl">Student</div>
                            {
                                students.map(student => (
                                    // eslint-disable-next-line react/jsx-key
                                    <div className="flex gap-3 p-3 items-center bg-gray-300 ml-5 rounded-xl mt-2">
                                        <Istudent className="flex w-[28.5px] fill-gray-500" />
                                        <div className="flex gap-4">
                                            <div className="text-gray-500">{student.phone}</div>
                                            <div className="text-gray-500"> {student.name}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}