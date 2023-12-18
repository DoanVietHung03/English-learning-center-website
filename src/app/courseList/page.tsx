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
import moment from 'moment';
export default function CourseList() {
    const [courses, setCourses] = useState([])
    const [emptyCourse, setEmptyCourse] = useState(true)
    const [name, setName] = useState('')
    

    const type = localStorage.getItem('userType')
    

    // function findName(idUser: String){
    //     var Uname: String
    //     fetch('/api/userName',{
    //         method: 'POST',
    //         body: JSON.stringify({ id: idUser }),
    //         headers: { 'Content-Type': 'application/json' },
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         //console.log(data)
    //         var map = new Map(Object.entries(data));
    //         const name = map.get("name")
    //         if
    //         Uname = name
    //         console.log(typeof(name))
    //      })
    //      .catch(error => {
    //          console.error('Error fetching data:', error);
    //     });
    //     console.log(Uname)
    //     return Uname
    // }


    // function findName(idUser: string): Promise<string> {
    //     return new Promise((resolve, reject) => {
    //         fetch('/api/userName', {
    //             method: 'POST',
    //             body: JSON.stringify({ id: idUser }),
    //             headers: { 'Content-Type': 'application/json' },
    //         })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             const map = new Map(Object.entries(data));
    //             const name = map.get("name");
    //             console.log(name);
    //             resolve(name);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //             reject(error);
    //         });
    //     });
    // }

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

    return (
        <>
            <Header />
            <div className='flex gap-6'>
                <SideBar />
                <div className="w-2/3">
                    <div className="flex justify-between pt-3 pb-2 mb-2 border-b border-black">
                        <div className="font-poppins font-bold text-5xl">
                            Courses List
                        </div>
                        {(type == 'Admin') &&
                            <Link href='/course_add' className="bg-lime-400 flex gap-3 rounded-xl items-center justify-center py-3 px-3">
                                <div className="text-2xl font-bold">+</div>
                                <div className="font-bold flex items-center">Add Course</div>
                            </Link>
                        }

                    </div>
                    <div className="flex flex-col gap-4 overflow-y-auto h-3/4">
                        {!emptyCourse && (
                            courses.map(course => (
                                // eslint-disable-next-line react/jsx-key
                                <>
                                    <div className="w-full h-36 p-8 rounded-xl bg-white">
                                        <div className="flex w-full mb-4">
                                            <Link href={'/course_Time'} onClick={() => { localStorage.setItem("course_id", course.name) }}
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
                                                <p className="font-poppins text-xs">{course.room}</p>
                                            </div>
                                            
                                            <div className="flex items-center gap-2">
                                                <Itarget className="w-3" />
                                                <p className="font-poppins text-xs">Teacher: {course.teacher_id}</p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Imenu className="w-3" />
                                                <p className="font-poppins text-xs">{course.module}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Icalendar className="w-4" />
                                                <p className="font-poppins text-xs">{moment.utc(course.startDate).format('MM/DD/YYYY')}-{course.schedule}</p>
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