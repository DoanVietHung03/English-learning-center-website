"use client"

import Header from "@/components/layout/header";
import SideBar from "@/components/layout/sideBar";
import { useEffect, useState, useRef, SyntheticEvent } from "react";
import Link from "next/link";
import Ibuilding from "@/components/icons/icon_building";
import IfileAdd from "@/components/icons/icon_file_add";
import IfileDelete from "@/components/icons/icon_file_delete";
import Itarget from "@/components/icons/icon_target";
import Imenu from "@/components/icons/icon_menu";
import Icalendar from "@/components/icons/icon_cal";
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useRouter } from "next/navigation";
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index'

export default function CourseList() {
    const [courses, setCourses] = useState([])
    const [emptyCourse, setEmptyCourse] = useState(true)
    const [name, setName] = useState('')
    const type = localStorage.getItem('userType')
    const router = useRouter();

    var delete_course

    async function handleDelete(ev: SyntheticEvent) {
        ev.preventDefault()
        console.log(delete_course)
        const response = await fetch('/api/course', {
            method: 'POST',
            body: JSON.stringify({ course_id: delete_course, method: 'delete' }),
            headers: { 'Content-Type': 'application/json' },
        })
        window.location.reload(true);
    }

    const handleActionClick = (link) => {
        router.push(link);
    };

    useEffect(() => {
        localStorage.setItem('sidebar', 0)

        fetch('/api/course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("userName"), userType: localStorage.getItem("userType"), method: 'getList' }),
        })
            .then(response => response.json())
            .then(data => {
                setCourses(data)
                if (courses == null)
                    setEmptyCourse(true)
                else
                    setEmptyCourse(false)
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const coursePerPage = 3; // Adjust as needed
    const currentCourse = courses.slice((currentPage - 1) * coursePerPage, currentPage * coursePerPage);

    const actions = [
        { icon: <IfileAdd className="w-6" />, name: "Add Assignment", link: '/course_add' },
    ];

    const popupRef = useRef();

    return (
        <>
            <Header />
            <div className='flex gap-6'>
                <SideBar />
                <div className="w-2/3 ml-14">
                    <div className="flex justify-between pt-3 pb-2 mb-2 border-b border-black">
                        <div className="font-poppins font-bold text-5xl">
                            Courses List
                        </div>
                        {(type == 'Admin') &&
                            <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
                                <SpeedDial
                                    ariaLabel="SpeedDial basic example"
                                    sx={{ transform: "translateZ(0px)", flexGrow: 1 }}
                                    icon={<SpeedDialIcon />}
                                    direction="left"
                                >
                                    {actions.map((action) => (
                                        <SpeedDialAction
                                            key={action.name}
                                            icon={action.icon}
                                            tooltipTitle={action.name}
                                            onClick={() => handleActionClick(action.link)}
                                            FabProps={{ size: "large" }}
                                        />
                                    ))}
                                </SpeedDial>
                            </Box>
                        }
                    </div>
                    <div className="flex flex-col gap-4 h-[480px]">
                        {!emptyCourse && (
                            currentCourse.map(course => (
                                // eslint-disable-next-line react/jsx-key
                                <>
                                    <div className="w-full h-36 rounded-xl bg-white flex mt-2">
                                        <div className="w-5/6 p-8">
                                            <div className="flex mb-4">
                                                <Link href={'/course_Time'} onClick={() => { localStorage.setItem("course_id", course.course_id), localStorage.setItem("course_name", course.name), localStorage.setItem("course_student", course.student_id.length) }}>
                                                    <button className="flex justify-start font-poppins w-fit cursor-pointer text-blue-500 font-semibold text-base hover:underline">
                                                        {course.name}
                                                    </button>

                                                </Link>
                                            </div>
                                            <div className="flex text-11 gap-6 mt-6">
                                                <div className="flex items-center gap-2">
                                                    <Ibuilding className="w-3" />
                                                    <p className="font-poppins text-xs">{course.room}</p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Itarget className="w-3" />
                                                    <p className="font-poppins text-xs">Teacher: {course.teacher_name}</p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Imenu className="w-3" />
                                                    <p className="font-poppins text-xs">{course.module}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Icalendar className="w-4" />
                                                    <p className="font-poppins text-xs">Start date:{" " + moment.utc(course.startDate).format('MM/DD/YYYY')}-{course.schedule}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {type === "Admin" ?
                                            <Popup
                                            ref={popupRef}
                                            trigger={<button className="flex justify-center items-center h-full w-1/6 bg-red-400 hover:bg-red-500 rounded-r-xl border-l border-stone-300">
                                                <IfileDelete className="w-8" />
                                            </button>}>
                                            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-44 bg-gray-200 p-4 border-2 border-gray-500 rounded-lg">
                                                <div className="mt-4">
                                                    <p className="text-center text-lg font-semibold">Do you want to delete permanently ?</p>
                                                    <div className="flex items-center justify-between mt-10 gap-2 text-lg font-medium">
                                                        <button className="w-1/2 border-2 border-black bg-lime-400 hover:bg-lime-500 rounded-md py-2" onClick={ev => { delete_course = course.course_id, handleDelete(ev) }}>
                                                            Yes
                                                        </button>

                                                        <button className="w-1/2 border-2 border-black bg-red-400 hover:bg-red-500 rounded-md py-2"
                                                            onClick={() => {popupRef.current.close()}}>
                                                            No
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Popup> : null}
                                        
                                    </div>
                                </>
                            ))
                        )}
                    </div>
                    <div className="flex justify-center mt-4">
                        <Pagination
                            count={Math.ceil(courses.length / coursePerPage)}
                            shape="rounded"
                            onChange={(event, newPage) => setCurrentPage(newPage)}
                            className=""
                            color="primary"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}