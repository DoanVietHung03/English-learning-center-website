'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import { SyntheticEvent, useState } from "react"
import Select from "react-select";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Image from "next/image";
import ReactAudioPlayer from 'react-audio-player';
import Link from "next/link";
import ImagnifyingGlass from "@/components/icons/icon_magnifyingGlass";

export default function Ass_Reading() {
    const [skill, setSkill] = useState('')
    const [course, setCourse] = useState('')
    function handleChangeCourse(ev) {
        setCourse(ev.value);
    }
    const handleChangeSkill = (ev) => {
        setSkill(ev.value);
    };

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        await fetch('/api/assignment', {
            method: 'POST',
            body: JSON.stringify({ course, skill }),
            headers: { 'Content-Type': 'application/json' },
        })
    }
    
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
                        <div className="p-2 ml-2 font-poppins text-xs">[INTER_CLASS] aoe - Q.5 ClassRoom IELTS 5.5 6.5 | 25/09/2023 Writing, Speaking, Writing Task 1, Writing Task 2</div>
                    </div>

                    <div className="bg-white mt-2 pb-8 rounded px-7">
                        <div className="mx-6 border-b border-stone-300 pb-2">
                            <div className="grid grid-cols-2">
                                <div className="flex items-center justify-start mt-4">
                                    <Link href={"/teacher_add_ass"}>
                                        <button className="rounded-tl rounded-bl border border-stone-300 bg-white hover:bg-blue-300 text-center text-black text-xs font-bold font-poppins leading-tight tracking-tight hover:text-white px-[60px] pb-3 pt-[10px] transition-colors duration-300">
                                            Add
                                        </button>
                                    </Link>
                                    <button className="rounded-tr rounded-br border border-stone-300 bg-blue-300 text-center text-black text-xs font-bold font-poppins leading-tight tracking-tight px-[60px] pb-3 pt-[10px]">
                                        Clone
                                    </button>
                                </div>
                                
                                <div className="flex items-end justify-end">
                                    <button className="bg-lime-300 hover:bg-lime-400 rounded-lg px-4 py-1 font-medium leading-tight tracking-tight">
                                        Clone
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-100 rounded-lg border border-neutral-400 pb-6 mt-4">
                            <div className="ml-14 py-10">
                                <div className="grid grid-cols-2">
                                    <div>
                                        <p className="text-black text-base font-medium leading-tight tracking-tigh mb-2">Choose course</p>
                                        <Select options={optionCourse} onChange={handleChangeCourse} className="w-3/4" />
                                    </div>

                                    <div>
                                        <p className="text-black text-base font-medium leading-tight tracking-tigh mb-2">Choose skill</p>
                                        <Select options={optionSkill} onChange={handleChangeSkill} className="w-3/4" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <button className="flex items-center justify-center gap-2 bg-zinc-400 hover:bg-zinc-300 rounded-lg px-3 py-1">
                                    <p className="text-neutral-700 text-base font-normal font-['Poppins'] leading-3 tracking-tight">Search</p>
                                    <ImagnifyingGlass />   
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 rounded-lg border border-zinc-400 h-52">
                            <div className="mx-4 text-center border-b border-zinc-400">
                                Result
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

const optionCourse = [
    {}
];