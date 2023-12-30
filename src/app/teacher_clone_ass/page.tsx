/* eslint-disable react/jsx-key */
'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import { SyntheticEvent, useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import Select from "react-select";
import * as React from 'react';
import Link from "next/link";
import Icheck from "@/components/icons/icon_check";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function Clone_Assignment() {
    const [courses, setCourses] = useState([])
    const [deadline, setDeadline] = React.useState<Dayjs | null>(dayjs('2023-12-30'));
    const [assignments, setAssignments] = useState([])
    const [assignmentChoosed, setAssignmentChoosed] = useState(Number)
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
        const response = await fetch('/api/assignment', {
            method: 'POST',
            body: JSON.stringify({
                title: assignments[assignmentChoosed].title,
                content: assignments[assignmentChoosed].content,
                skill: assignments[assignmentChoosed].skill,
                deadline: deadline,
                attachedFile: assignments[assignmentChoosed].attachedFile,
                id: localStorage.getItem('course_id')
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        router.push('/assignments')
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
                                <button onClick={handleFormSubmit}
                                    className="bg-lime-400 text-white hover:bg-lime-200 hover:text-gray-400 rounded-lg px-4 py-1 font-medium leading-tight tracking-tight transition-colors duration-300">
                                    Clone
                                </button>                     
                            </div>
                        </div>

                        <div className="bg-zinc-100 rounded-lg border border-neutral-400 pb-6 mt-4">
                            <div className="ml-14 py-10">
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

