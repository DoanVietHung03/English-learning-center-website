"use client"
import Header from "@/components/layout/header";
import SideBar from "@/components/layout/sideBar";
import CourseInfo from "@/components/layout/courseInfo";
import { useEffect, useState } from "react";
import { POST } from "../api/assignment/route";
import Link from "next/link";
import Ibuilding from "@/components/icons/icon_building";
import Itarget from "@/components/icons/icon_target";
import Imenu from "@/components/icons/icon_menu";
import Icalendar from "@/components/icons/icon_cal";
export default function CourseList() {
    const [courses, setCourses] = useState([])
    const [emptyCourse, setEmptyCourse] = useState(true)
    useEffect(() => {
        fetch('/api/courseList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: localStorage.getItem("userName") }),
        })
            .then(response => response.json())
            .then(data => {
                // Hiển thị danh sách khóa học trong giao diện
                setCourses(data)
                if (courses == null)
                    setEmptyCourse(true)
                else
                    setEmptyCourse(false)
            })
            .catch(error => console.error('Error:', error));
    }, []);
    console.log(courses[0])
    console.log(emptyCourse)
    return (
        <>
            <Header />
            <div className='flex gap-6'>
                <SideBar />
                <div className="w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black">
                        Courses List
                    </div>
                    <div className="flex flex-col gap-4">
                        {!emptyCourse && (
                            courses.map(course => (
                                // eslint-disable-next-line react/jsx-key
                                <>
                                    <div className="w-full h-36 p-8 rounded-xl bg-white">
                                        <div className="flex w-full mb-4">
                                            <Link href={'/student_course_Time'} onClick={() => { localStorage.setItem("course_id", course._id) }}
                                                className="flex justify-start font-poppins w-[840px] cursor-pointer text-blue-500 font-semibold text-xs hover:underline">
                                                {course.name}
                                            </Link>
                                            <div className="flex bg-red-200 px-4 py-1 items-center text-sm text-red-600 font-bold rounded-lg">
                                                Finished
                                            </div>
                                        </div>
                                        <div className="flex text-11 gap-4 mt-6">
                                            <div className="flex items-center gap-2">
                                                <Ibuilding className="w-3" />
                                                <p className="font-poppins text-xs">AOE - D5</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Itarget className="w-3" />
                                                <p className="font-poppins text-xs">Teacher: {course.TeacherName}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Imenu className="w-3" />
                                                <p className="font-poppins text-xs">{course.module}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Icalendar className="w-4" />
                                                <p className="font-poppins text-xs">{course.startDate} -> {course.endDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}