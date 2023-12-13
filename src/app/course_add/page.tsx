'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Select from "react-select";
import Iplus from "@/components/icons/icon_plus";
import Link from "next/link"
import { useState, useEffect } from "react"
import { GET } from '@/app/api/user/route';
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

export default function Course_Add() {
    const [title, setTitle] = useState('')
    const [module, setModule] = useState('')
    const [teacher, setTeacher] = useState('')
    const [sDate, setSDate] = React.useState<Dayjs | null>(dayjs('2023-12-30'));
    const [cDate, setCDate] = React.useState<Dayjs | null>(dayjs('2023-12-30'));
    const [student, setStudent] = useState()
    const [student_added, setStudentAdded] = useState([])
    const handleChangeModule = (ev) => {
        setModule(ev.value);
    };
    const handleChangeTeacher = (ev) => {
        setTeacher(ev.value);
    };

    const handleChangeStudentID = (ev) => {
        setStudent(ev.value);
        if (!student_added.includes(student)) {
            student_added.push(student)
        }
    };
    console.log(student_added)
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => {
                setTeachers(data.teachers)
                setStudents(data.students)
            })
    }, []);
    const optionTeachers = teachers.map(
        function (teacher) {
            return {
                value: teacher.phone,
                label: teacher.phone
            }
        }
    );
    const optionStudents = students.map(
        function (student) {
            return {
                value: student.phone,
                label: student.phone
            }
        }
    );
    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="flex justify-between mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black pb-2">
                        <div>
                            Create Course
                        </div>
                        <button className="gap-2 flex items-center justify-end bg-lime-300 rounded-lg text-center text-black text-base font-poppins leading-tight tracking-tight hover:bg-lime-400 px-4">
                            <Iplus />
                            <p className="flex items-center">Create course</p>
                        </button>
                    </div>

                    <div className="bg-white mt-2 rounded">
                        <div className="px-12 py-8">
                            <div className="items-center">
                                <div className="text-base font-medium">Course Name</div>
                                <input className="px-2 py-2 rounded-md border border-zinc-300 focus:outline-none mt-2 w-full" type="text" id="myTitle" placeholder="Type name of the course" />
                            </div>

                            <div className="mt-8 grid grid-cols-2">
                                <div>
                                    <p className="text-black text-base font-medium leading-tight tracking-tight">Choose a module</p>
                                    <Select options={optionModule} onChange={handleChangeModule}
                                        className="w-3/4 mt-2" placeholder="Select module" />
                                </div>

                                <div>
                                    <p className="text-black text-base font-medium leading-tight tracking-tight">Choose a teacher</p>
                                    <Select options={optionTeachers} onChange={handleChangeTeacher} className="w-3/4 mt-2" placeholder="Select teacher" />
                                </div>
                            </div>

                            <div className="mt-10 grid grid-cols-2">
                                <div>
                                    <div className="font-semibold">Start Date</div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker value={sDate} onChange={(newValue) => setSDate(newValue)}
                                                className="w-3/4"
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>

                                <div>
                                    <div className="font-semibold">Complete Date</div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                                            <DatePicker value={cDate} onChange={(newValue) => setCDate(newValue)}
                                                className="w-3/4"
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </div>

                            <div className="mt-12">
                                <p className="text-black text-base font-medium leading-tight tracking-tight">Student</p>
                                <Select options={optionStudents} onChange={handleChangeStudentID}
                                    className="w-[333px] mt-2" placeholder="Telephone numer of student" />
                            </div>

                            <div className="flex mt-8 rounded-lg border border-stone-300 h-40 w-full gap-3">
                                {
                                    student_added.map(c => (
                                        <div className="p-3 bg-gray-300 font-semibold py-2 h-9">
                                            {c}
                                        </div>
                                    )
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const optionModule = [
    { value: "IELTS", label: "IELTS" },
    { value: "TOEIC", label: "TOEIC" },
    { value: "TOEFL", label: "TOEFL" },
];




