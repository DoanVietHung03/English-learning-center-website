"use client"
import Header from "@/components/layout/header";
import SideBar from "@/components/layout/sideBar";
import CourseInfo from "@/components/layout/courseInfo";
import { useEffect, useState } from "react";
import { POST } from "../api/assignment/route";

export default function CourseList() {
    console.log(localStorage.getItem("userName"))
    const [courses, setCourses] = useState()
    useEffect(() => {
        fetch('/api/courseList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userName: localStorage.getItem("userName") }),
      })
      .then(response => response.json())
      .then(data => {
        // Hiển thị danh sách khóa học trong giao diện
        setCourses(data)
      })
      .catch(error => console.error('Error:', error));
    }, []);
    // useEffect(() => {
    //     fetch('/api/course')
    //         .then(res => res.json())
    //         .then(data => {
    //             setCourses(data)
    //         })
    // }, []);
    console.log(courses)
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
                        <CourseInfo />
                        <CourseInfo />
                        <CourseInfo />
                    </div>
                </div>
            </div>
        </>
    )
}