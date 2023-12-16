'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import Icalendar from "@/components/icons/icon_cal"
import Ibook from "@/components/icons/icon_book"

export default function Assigments() {
    const type = localStorage.getItem('userType')
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
                        <div className="p-2 ml-2 font-poppins text-xs">[INTER_CLASSName] aoe - Q.5 ClassNameRoom IELTS 5.5 6.5 | 25/09/2023 Writing, Speaking, Writing Task 1, Writing Task 2</div>
                    </div>

                    <div className="bg-white mt-2 pb-8 rounded">
                        <div className="flex-col ml-6 mr-6">
                            <div className="flex items-center p-4 border-b border-black mb-5">
                                <button className="flex items-center font-poppins justify-center border border-stone-300 hover:bg-blue-300 p-2 rounded-lg">
                                    <Icalendar />
                                    <Link href={'/student_course_Time'} className="ml-2">Timetable</Link>
                                </button>
                                <button className="flex items-center font-poppins justify-center  border border-stone-300 bg-blue-300 p-2 rounded-lg ml-8">
                                    <Ibook />
                                    <p className="ml-2">Assignments</p>
                                </button>
                            </div>
                            {(type == 'Teacher') &&
                                < div className="flow-root">
                                    <Link href={'/teacher_add_ass'} className="float-right bg-zinc-100 border border-stone-300 hover:bg-green-300 p-2 rounded-lg ml-8">
                                        Add assignment
                                    </Link>
                                </div>
                            }

                            <Link href={'/api/ass_speaking'} className="mt-10 grid grid-cols-2 border border-black rounded-lg hover:bg-gray-200">
                                <div className=" p-2 flex items-center ">
                                    <Ibook />
                                    <div className="ml-4 font-poppins">
                                        Essay-Speaking-Lesson 1
                                    </div>
                                </div>

                                <div className=" p-2 flex items-center justify-end">
                                    <div className="font-poppins font-medium">
                                        Deadline:
                                    </div>
                                    <div className="ml-1 font-poppins">
                                        30/02/2023
                                    </div>
                                </div>
                            </Link>

                            <Link href={'/api/ass_reading'} className="mt-4 grid grid-cols-2 border border-black rounded-lg hover:bg-gray-200">
                                <div className=" p-2 flex items-center ">
                                    <Ibook />
                                    <div className="ml-4 font-poppins">
                                        Essay-Reading-Lesson 1
                                    </div>
                                </div>

                                <div className=" p-2 flex items-center justify-end">
                                    <div className="font-poppins font-medium">
                                        Deadline:
                                    </div>
                                    <div className="ml-1 font-poppins">
                                        30/02/2023
                                    </div>
                                </div>
                            </Link>

                            <Link href={'/api/ass_listening'} className="mt-4 grid grid-cols-2 border border-black rounded-lg hover:bg-gray-200">
                                <div className=" p-2 flex items-center ">
                                    <Ibook />
                                    <div className="ml-4 font-poppins">
                                        Essay-Listening-Lesson 1
                                    </div>
                                </div>

                                <div className=" p-2 flex items-center justify-end">
                                    <div className="font-poppins font-medium">
                                        Deadline:
                                    </div>
                                    <div className="ml-1 font-poppins">
                                        30/02/2023
                                    </div>
                                </div>
                            </Link>

                            <Link href={'/api/ass_writing'} className="mt-4 grid grid-cols-2 border border-black rounded-lg hover:bg-gray-200">
                                <div className=" p-2 flex items-center ">
                                    <Ibook />
                                    <div className="ml-4 font-poppins">
                                        Essay-Writing-Lesson 1
                                    </div>
                                </div>

                                <div className=" p-2 flex items-center justify-end">
                                    <div className="font-poppins font-medium">
                                        Deadline:
                                    </div>
                                    <div className="ml-1 font-poppins">
                                        30/02/2023
                                    </div>
                                </div>
                            </Link>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}