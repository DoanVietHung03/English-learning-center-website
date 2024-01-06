'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import Icalendar from "@/components/icons/icon_cal"
import Ibook from "@/components/icons/icon_book"
import { SyntheticEvent, useEffect, useState, useRef } from "react"
import moment from "moment"
import IfileAdd from "@/components/icons/icon_file_add"
import IfileDelete from "@/components/icons/icon_file_delete"
import IfileClone from "@/components/icons/icon_file_clone"
import Pagination from '@mui/material/Pagination';
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useRouter } from "next/navigation";
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index'
import CircularProgress from '@mui/material/CircularProgress';

export default function Assigments() {
    const type = localStorage.getItem('userType')
    const [assignments, setAssignment] = useState([])
    const router = useRouter();

    const currentDate = moment();

    var delete_assignment: any
    const handleActionClick = (link) => {
        router.push(link);
    };

    async function handleDelete(ev: SyntheticEvent) {
        ev.preventDefault()
        const response = await fetch('/api/assignment', {
            method: 'POST',
            body: JSON.stringify({ assignment_id: delete_assignment, method: 'delete' }),
            headers: { 'Content-Type': 'application/json' },
        })
        window.location.reload(true);
    }

    useEffect(() => {
        fetch('/api/assignment', {
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem('course_id'), userType: localStorage.getItem('userType'), userID: localStorage.getItem('userName'), method: 'getList' }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                setAssignment(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const coursePerPage = 4;
    const currentAss = assignments.slice((currentPage - 1) * coursePerPage, currentPage * coursePerPage);

    const actions = [
        { icon: <IfileAdd />, name: "Add Assignment", link: '/teacher_add_ass' },
        { icon: <IfileClone />, name: "Clone Assignment", link: '/teacher_clone_ass' },
    ];

    const popupRef = useRef();

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
                            <div className="flex items-center p-4 border-b border-black">
                                <Link href={'/course_Time'}>
                                    <button className="flex items-center font-poppins justify-center border border-stone-300 hover:bg-blue-300 p-2 rounded-lg">
                                        <Icalendar />
                                        <div className="ml-2">Timetable</div>
                                    </button>
                                </Link>
                                <button className="flex items-center font-poppins justify-center  border border-stone-300 bg-blue-300 p-2 rounded-lg ml-8">
                                    <Ibook />
                                    <p className="ml-2">Assignments</p>
                                </button>
                                {(type == 'Teacher') &&
                                    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
                                        <SpeedDial
                                            ariaLabel="SpeedDial basic example"
                                            sx={{ transform: "translateZ(0px)", flexGrow: 1 }}
                                            icon={<SpeedDialIcon />}
                                            direction="left"
                                            FabProps={{ size: "small" }}
                                        >
                                            {actions.map((action) => (
                                                <SpeedDialAction
                                                    key={action.name}
                                                    icon={action.icon}
                                                    tooltipTitle={action.name}
                                                    onClick={() => handleActionClick(action.link)}
                                                />
                                            ))}
                                        </SpeedDial>
                                    </Box>
                                }
                            </div>
                            <div className="h-72">
                                {currentAss.map(assignment => (type === "Student" && (
                                    <>
                                        <Link href={'/assignment_submit'}
                                            onClick={() => {
                                                localStorage.setItem("assignment_id", assignment._id),
                                                    console.log(assignment.status)
                                            }}
                                            className="mt-10 grid grid-cols-2 border border-black rounded-lg hover:bg-gray-300 transition-colors duration-300">
                                            <div className=" p-2 flex items-center ">
                                                <Ibook />
                                                <div className="ml-4 font-poppins">
                                                    {assignment.title} - {assignment.skill}
                                                </div>
                                            </div>

                                            <div className=" p-2 flex items-center justify-end">

                                                <div className="ml-1 font-poppins">
                                                    {(assignment.status === 'null' ? (currentDate.isAfter(moment.utc(assignment.deadline))) ? <div className="font-poppins font-medium text-red-600">Overdue: {Math.floor(((moment.duration(currentDate.diff(moment.utc(assignment.deadline))).asDays())))}d {Math.floor((((moment.duration(currentDate.diff(moment.utc(assignment.deadline)))).asDays()) - Math.floor(((moment.duration(currentDate.diff(moment.utc(assignment.deadline)))).asDays()))) * 24)}h</div> : <div className="font-poppins font-medium">Deadline: {moment.utc(assignment.deadline).format('DD/MM/YYYY')}</div> :
                                                        (assignment.status === 'Marked' ? <div className="font-poppins font-medium text-green-400">{assignment.status}</div> :
                                                            <div className="flex gap-2 items-center font-poppins font-medium text-yellow-500">
                                                                {assignment.status}
                                                                <CircularProgress size={'1em'} style={{ color: 'rgba(255, 215, 0, 1)' }}/>
                                                            </div>))}
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )))}

                                {currentAss.map(assignment => (type === "Teacher" && (
                                    <>
                                        <div className="flex w-full items-center mt-8">
                                            <Link href={'/teacher_grading'} onClick={() => { localStorage.setItem('assignment_id', assignment._id) }}
                                                className="w-full flex items-center justify-between border border-black rounded-lg hover:bg-gray-300 transition-colors duration-300">
                                                <div className=" p-2 flex items-center ">
                                                    <Ibook />
                                                    <div className="ml-4 font-poppins">
                                                        {assignment.title} - {assignment.skill}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {assignment.numSub != localStorage.getItem('course_student') ?
                                                        <p className="text-red-400 leading-tight tracking-tight font-medium text-base mr-2">Submitted: {assignment.numSub}/{localStorage.getItem('course_student')}</p>
                                                        :
                                                        <p className="text-green-400 leading-tight tracking-tight font-medium text-base mr-2">Submitted: {assignment.numSub}/{localStorage.getItem('course_student')}</p>
                                                    }
                                                    {((assignment.graded === assignment.numSub) && (assignment.numSub !== 0)) ?
                                                        <div className="flex items-center mr-4">
                                                            <p className="text-green-400 leading-tight tracking-tight font-medium text-base">Fully marked</p>
                                                        </div> :
                                                        <div className="flex items-center mr-5">
                                                            <p className="text-red-400 leading-tight tracking-tight font-medium text-base">Marked: {assignment.graded}/{assignment.numSub}</p>
                                                        </div>}
                                                </div>
                                            </Link>
                                            <Popup
                                                ref={popupRef}
                                                trigger={<button className="p-3 -mr-2" >
                                                    <IfileDelete />
                                                </button>}>
                                                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-44 bg-gray-200 p-4 border-2 border-gray-500 rounded-lg">
                                                    <div className="mt-4">
                                                        <p className="text-center text-lg font-semibold">Do you want to delete permanently ?</p>
                                                        <div className="flex items-center justify-between mt-10 gap-2 text-lg font-medium">
                                                            <button className="w-1/2 border-2 border-black bg-lime-400 hover:bg-lime-500 rounded-md py-2" onClick={ev => { delete_assignment = assignment._id, handleDelete(ev) }}>
                                                                Yes
                                                            </button>
                                                            <button className="w-1/2 border-2 border-black bg-red-400 hover:bg-red-500 rounded-md py-2"
                                                                onClick={() => {popupRef.current.close()}}>
                                                                No
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Popup>
                                        </div>
                                    </>
                                )))}

                                {currentAss.map(assignment => (type === "Admin" && (
                                    <>
                                        <div className="mt-10 grid grid-cols-2 border border-black rounded-lg hover:bg-gray-300 transition-colors duration-300">
                                            <div className=" p-2 flex items-center ">
                                                <Ibook />
                                                <div className="ml-4 font-poppins">
                                                    {assignment.title} - {assignment.skill}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )))}
                            </div>
                            <div className="flex justify-center">
                                <Pagination
                                    count={Math.ceil(assignments.length / coursePerPage)}
                                    shape="rounded"
                                    onChange={(event, newPage) => setCurrentPage(newPage)}
                                    className=""
                                    color="primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}