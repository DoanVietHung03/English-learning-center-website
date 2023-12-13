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

export default function Ass_Reading() {
    const [skill, setSkill] = useState('')
    const [deadline, setDeadline] = React.useState<Dayjs | null>(dayjs('2023-12-30'));
    const [Title, setTitle] = useState('')
    const [file, setFile] = useState('');
    const [content, setContent] = useState('');
    function handleChangeImage(ev) {
        setFile(URL.createObjectURL(ev.target.files[0]));
    }
    const handleChangeSkill = (ev) => {
        setSkill(ev.value);
    };

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        await fetch('/api/assignment', {
            method: 'POST',
            body: JSON.stringify({ skill, deadline, Title, file, content }),
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
                        <div className="mx-10 border-b border-stone-300 pb-2">
                            <div className="grid grid-cols-2">
                                <div className="flex items-center justify-start mt-4">
                                    <button className="rounded-tl rounded-bl border border-stone-300 bg-blue-300 text-center text-xs font-bold font-poppins leading-tight tracking-tight text-white px-[60px] pb-3 pt-[10px] transition-colors duration-300">
                                        Add
                                    </button>
                                    <button className="rounded-tr rounded-br border border-stone-300 bg-white hover:bg-blue-300 text-center text-black text-xs font-bold font-poppins leading-tight tracking-tight hover:text-white px-[60px] pb-3 pt-[10px] transition-colors duration-300">
                                        Clone
                                    </button>
                                </div>

                            </div>
                        </div>
                        <form className="h-[500px] p-4 bg-zinc-100 rounded-lg border border-neutral-400">
                            <div className="flex h-3/4">
                                <div className="flex flex-col w-1/2 p-4 gap-5 pr-10">
                                    <div>
                                        <div className="mb-2">Choose Skill</div>
                                        <Select options={optionSkill} onChange={handleChangeSkill} className="w-full" />
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
                                    <div>
                                        <div className="text-lg">Title</div>
                                        <input type="text" placeholder="Type title" onChange={ev => setTitle(ev.target.value)}
                                            className="py-2 px-2 w-full border-gray-300 border-2 rounded-md" />
                                    </div>
                                    {(skill == "Listening") &&
                                        (
                                            <div className="bg-white p-3 rounded-lg border-2">
                                                <h2>Choose file Listening:</h2>
                                                <input type="file" accept="audio" onChange={handleChangeImage} />
                                                <ReactAudioPlayer
                                                    src={file}
                                                    autoPlay
                                                    controls
                                                    className="w-full"
                                                />
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="flex flex-col w-1/2 mt-3 gap-3">
                                    <div className="h-96 items-center text-black text-base font-normal leading-tight tracking-tight">
                                        <p>Content</p>
                                        <textarea onChange={ev => setContent(ev.target.value)}
                                            className="w-full h-[350px] border-2 rounded-md mt-4 pt-2 pl-2 focus:outline-none"
                                            id="myContent" placeholder="Type content of the assignment"></textarea>
                                    </div>
                                </div>

                            </div>
                            <div className="flex items-center justify-end mt-16 mr-4">

                                <button type="submit" onClick={handleFormSubmit}
                                    className="bg-lime-600 text-white rounded-lg text-center border-2 border-white text-xs font-poppins leading-tight tracking-tight px-[30px] pb-3 pt-[10px] font-bold hover:bg-white hover:border-lime-200 hover:text-black transition-colors duration-300">
                                    submit
                                </button>
                            </div>
                        </form>
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