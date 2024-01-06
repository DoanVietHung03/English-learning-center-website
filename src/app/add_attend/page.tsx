'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import IuserPlus from "@/components/icons/icon_userPlus"
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

export default function CreateAttend() {
    const [listStudent, setListStudent] = useState([])
    useEffect(() => {
        fetch('/api/course', {
            method: 'POST',
            body: JSON.stringify({ listStuCourseID: localStorage.getItem('course_id'), method: 'getStudentList' }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                setListStudent(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDelete = (index) => {
        // Tạo một bản sao mới của mảng và loại bỏ phần tử tại chỉ mục index
        const updatedArray = [...listStudent.slice(0, index), ...listStudent.slice(index + 1)];

        // Cập nhật state với mảng mới
        setListStudent(updatedArray);
    };
    const router = useRouter();

    async function handleSubmit(ev: SyntheticEvent) {
        const listStuCreate = listStudent.map(function (student) {
            return student.phone
        })

        ev.preventDefault()
        const response = await fetch('/api/attendance', {
            method: 'POST',
            body: JSON.stringify({ course_id: localStorage.getItem('course_id'), session_id: localStorage.getItem('session_id'), studentList: listStuCreate, method: 'add' }),
            headers: { 'Content-Type': 'application/json' },
        })
        router.push('/course_Time')
    }

    //Function for add
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef<number>();

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            "&:hover": {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = (ev) => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 800);
        }
    };

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        console.log(checked)
    };

    return (
        <>
            <Header />
            <div className='flex gap-6'>
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="font-poppins font-bold text-5xl">
                        Create Attendance List
                    </div>
                    <div className="bg-white mt-4 py-4">
                        <div className="justify-center text-gray-700 items-center rounded-lg font-bold flex mb-2 text-lg ml-2">
                            {localStorage.getItem('session_id')}
                        </div>
                        <div className="h-[331px] border border-zinc-200 mx-2 rounded-lg">
                            <div className="grid grid-cols-3 overflow-y-auto items-center justify-center px-4 py-4 gap-2">
                                {listStudent.map((student, i) => (
                                    <div key={i} className="inline-block bg-gray-200 rounded-lg text-center items-center justify-center">
                                        {student &&
                                            <div className="flex gap-6 items-center justify-center ml-4">
                                                <div>
                                                    {student.name} - {student.phone}
                                                </div>
                                                <button>
                                                    <Checkbox checked={checked}
                                                        onChange={handleChange}
                                                        inputProps={{ 'aria-label': 'controlled' }} />
                                                </button>
                                            </div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end mr-4 mt-2">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box sx={{ m: 1, position: "relative" }}>
                                    <Fab
                                        aria-label="save"
                                        color="primary"
                                        sx={buttonSx}
                                        onClick={handleButtonClick}
                                    >
                                        {success ? <CheckIcon /> : <IuserPlus />}
                                    </Fab>
                                    {loading && (
                                        <CircularProgress
                                            size={68}
                                            sx={{
                                                color: green[500],
                                                position: "absolute",
                                                top: -6,
                                                left: -6,
                                                zIndex: 1,
                                            }}
                                        />
                                    )}
                                </Box>
                                <Box sx={{ m: 1, position: "relative" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={buttonSx}
                                        disabled={loading}
                                        onClick={(ev) => { handleButtonClick(ev); handleSubmit(ev) }}
                                    >
                                        Submit
                                    </Button>
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: green[500],
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                marginTop: "-12px",
                                                marginLeft: "-12px",
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}