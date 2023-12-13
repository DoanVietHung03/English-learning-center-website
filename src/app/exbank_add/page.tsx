'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import { SyntheticEvent, useState } from "react"
import Select from "react-select";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Image from "next/image";
import ReactAudioPlayer from 'react-audio-player';

export default function Ass_Reading() {
    const [skill, setSkill] = useState('')
    const [deadline, setDeadline] = React.useState<Dayjs | null>(dayjs('2023-12-30'));
    const [title, setTitle] = useState('')
    const [file, setFile] = useState('');
    const [filemp3, setFilemp3] = useState('');
    const [content, setContent] = useState('');
    function handleChangeImage(ev) {
        setFile(URL.createObjectURL(ev.target.files[0]));
    }
    function handleChangeImage1(ev) {
        setFilemp3(URL.createObjectURL(ev.target.files[0]));
    }
    const handleChangeSkill = (ev) => {
        setSkill(ev.value);
    };

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        await fetch('/api/assignment', {
            method: 'POST',
            body: JSON.stringify({title, deadline, content, skill, file }),
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
                        Exercise Bank
                    </div>

                    <div className="bg-white mt-2 pb-8 rounded px-7 py-8">
                        <form className="h-[500px] p-4 bg-zinc-100 rounded-lg border border-neutral-400">
                            <div className="flex h-3/4">
                                <div className="flex flex-col w-1/2 p-4 gap-5 pr-10">
                                    <div>
                                        <div className="mb-2">Choose Skill</div>
                                        <Select options={optionSkill} onChange={handleChangeSkill} className="w-full" />
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
                                                <input type="file" accept="audio" onChange={handleChangeImage1} />
                                                <ReactAudioPlayer
                                                    src={file}
                                                    autoPlay
                                                    controls
                                                    className="w-full"
                                                />
                                            </div>
                                        )
                                    }
                                    
                                    <p className="text-lg">Upload sample answer</p>
                                    <div className="bg-white p-2 rounded-lg border-2">
                                        <input type="file" accept="audio" onChange={handleChangeImage} />
                                    </div>
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
                                    className="bg-lime-300 rounded-lg text-center text-sm font-poppins leading-tight tracking-tight px-[30px] pb-3 pt-[10px] font-bold hover:bg-lime-400">
                                        Add
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