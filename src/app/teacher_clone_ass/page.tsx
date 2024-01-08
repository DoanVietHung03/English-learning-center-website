/* eslint-disable react/jsx-key */
'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import { SyntheticEvent, useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import Select from "react-select";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Fab from "@mui/material/Fab";
import Icheck from "@/components/icons/icon_check"
import CheckIcon from "@mui/icons-material/Check";
import IfileClone from "@/components/icons/icon_file_clone"
import { green, red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Ixmark from "@/components/icons/icon_xmark"
import Button from "@mui/material/Button";

export default function Clone_Assignment() {
    const [courses, setCourses] = useState([])
    const [deadline, setDeadline] = React.useState<Dayjs | null>(dayjs('2023-12-30'));
    const [assignments, setAssignments] = useState([])
    const [assignmentChoosed, setAssignmentChoosed] = useState(0)
    const [error, setError] = useState(false);
    const router = useRouter();
    useEffect(() => {
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
            })
            .catch(error => console.error('Error:', error));
    }, []);
    var optionCourses = [{ value: String, label: String }]
    if (courses)
        optionCourses = courses.map(function (course) {
            return {
                value: course.course_id,
                label: course.name
            }
        })

    async function handleFormSubmit(ev: SyntheticEvent) {
        if (assignments.length !== 0){
            const response = await fetch('/api/assignment', {
                method: 'POST',
                body: JSON.stringify({
                    title: assignments[assignmentChoosed].title,
                    content: assignments[assignmentChoosed].content,
                    skill: assignments[assignmentChoosed].skill,
                    deadline: deadline,
                    attachedFile: assignments[assignmentChoosed].attachedFile,
                    id: localStorage.getItem('course_id'),
                    method: 'add'
                }),
                headers: { 'Content-Type': 'application/json' },
            })
            if (!response.ok) {
                setError(true)
                setTimeout(() => {
                    window.location.reload(true);
                }, 2000);
            }
            else {
                setTimeout(() => {
                    router.push('/assignments')
                }, 2000);
            }
        }
        else{
            setError(true)
            setTimeout(() => {
                window.location.reload(true);
            }, 2000);
        }
    }
    const handleChangeCourse = (ev: SyntheticEvent) => {
        fetch('/api/assignment', {
            method: 'POST',
            body: JSON.stringify({ id: ev.value, method: 'getList' }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                setAssignments(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    //Function for add
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef<number>();

    const buttonSx = {
        ...((success && !error) && {
            bgcolor: green[500],
            "&:hover": {
                bgcolor: green[700],
            },
        }),
        ...((success && error) && {
            bgcolor: red[500],
            "&:hover": {
                bgcolor: red[700],
            },
        }),
    };

    React.useEffect(() => {
        setSuccess(false);
        setError(false)
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
            }, 1500);
        }
    };

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
                        <div className="p-2 ml-2 font-poppins text-xs">{localStorage.getItem('course_name')}</div>
                    </div>

                    <div className="bg-white mt-2 pb-8 rounded px-7">
                        <div className="mx-6 border-b border-stone-300 pb-2">
                            <div className="flex items-center justify-end pt-4">
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box sx={{ m: 1, position: "relative" }}>
                                        <Fab
                                            aria-label="save"
                                            color="primary"
                                            sx={buttonSx}
                                            onClick={(ev) => { handleButtonClick(ev); handleFormSubmit(ev) }}
                                        >
                                            {success ? (!error ? <CheckIcon /> : <Ixmark />) : <IfileClone />}
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
                                </Box>
                            </div>
                        </div>

                        <div className="bg-zinc-100 rounded-lg border border-neutral-400 pb-6 mt-4">
                            <div className="ml-14 pt-4">
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-black text-base font-medium leading-tight tracking-tigh mb-2">Choose course</p>
                                    <Select options={optionCourses} onChange={handleChangeCourse} className="w-3/4" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>Due Date</div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker value={deadline} onChange={(newValue) => setDeadline(newValue)}
                                        className="w-full bg-white text-xs"
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>


                        <div className="mt-6 rounded-lg border border-zinc-400">
                            <div className="mx-4 text-center border-b border-zinc-400">
                                Result
                            </div>
                            <div className="h-52 overflow-y-scroll">
                                {
                                    assignments.map((assignment, i) => (
                                        <div className="flex justify-between px-5 py-3">
                                            <div>
                                                {i}-{"  " + assignment.title}-{"  " + assignment.skill}
                                            </div>
                                            {(assignmentChoosed !== i) &&
                                                <button onClick={() => setAssignmentChoosed(i)}
                                                    className="p-2 bg-lime-400 rounded-lg font-semibold text-white hover:bg-lime-200 hover:text-gray-400 transition-colors duration-300">
                                                    Choose
                                                </button>
                                            }
                                            {(assignmentChoosed == i) &&
                                                <div className="flex p-2 bg-lime-400 rounded-lg font-semibold text-white w-[71px] py-[10px] items-center justify-center">
                                                    <Icheck className="fill-white w-5" />
                                                </div>
                                            }
                                        </div>
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

const optionSkill = [
    { value: "Speaking", label: "Speaking" },
    { value: "Listening", label: "Listening" },
    { value: "Writing", label: "Writing" },
    { value: "Reading", label: "Reading" }
];

const optionModule = [
    { value: "IELTS", label: "IELTS" },
    { value: "TOEIC", label: "TOEIC" },
    { value: "TOEFL", label: "TOEFL" }
];

