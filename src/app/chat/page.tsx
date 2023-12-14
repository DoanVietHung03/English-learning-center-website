'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Iuser from "@/components/icons/icon_user"
import Iimage from "@/components/icons/icon_image"
import Example from "./chat_dropdown"
import { SyntheticEvent, useEffect, useState } from "react"
import Image from "next/image"
import Select from "react-select";
export default function Chat() {
    const [receiver, setReceiver] = useState('')
    const [content, setContent] = useState('')
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [file, setFile] = useState('');
    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => {
                setTeachers(data.teachers)
                setStudents(data.students)
            })
    }, []);
    const handleChangeReceiver = (ev) => {
        setReceiver(ev.value);
    };
    function handleChangeFile(ev) {
        setFile(URL.createObjectURL(ev.target.files[0]));
    }
    const optionReceiver = teachers.map(teacher => {
        return {
            value: teacher.phone,
            label: teacher.phone + " - " + teacher.name + " - " + "Teacher"
        }
    }).concat(students.map(student => {
        return {
            value: student.phone,
            label: student.phone + " - " + student.name + ' - ' + "Student"
        }
    }))

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        await fetch('/api/report', {
            method: 'POST',
            body: JSON.stringify({ title, type, content, file, date_created, date_completed, status }),
            headers: { 'Content-Type': 'application/json' },
        })
    }
    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black pb-2">
                        Chat
                    </div>
                    <div className="bg-white rounded pb-10">
                        <div className="mt-6 grid grid-cols-2">
                            {/* left side */}
                            <div className="border-r-2 border-black mt-6 ml-9">
                                <div className="text-black text-sm font-semibold">
                                    Chat received
                                </div>

                                <div className="bg-zinc-200 rounded-lg mr-8 mt-3">
                                    <div className="flex items-center pl-7 pt-4">
                                        <Iuser className="w-10 fill-zinc-400 mr-4" />
                                        <p className="text-black text-sm font-semibold font-['Poppins']">Do Hoang Khanh Duy</p>
                                    </div>

                                    <div className="text-stone-400 text-sm font-semibold pl-7 mt-3">
                                        Teacher please answer me this question, it’s so hard that I cannot do it myself, please answer me senpai !!
                                    </div>

                                    <button className="flex items-center pl-7 mt-3 pb-6">
                                        <Iimage className="w-6 mr-2 fill-zinc-500" />
                                        <p className="text-center text-zinc-400 text-base font-normal leading-tight tracking-tight hover:underline">Click to see image</p>
                                    </button>
                                </div>

                                <div className="mt-3 border-t-2 border-stone-300 pt-3 text-black text-sm font-semibold mr-8">
                                    Chat sent
                                </div>

                                <div className="bg-zinc-200 rounded-lg mr-8 mt-3">
                                    <div className="flex items-center pl-7 pt-4">
                                        <Iuser className="w-10 fill-zinc-400 mr-4" />
                                        <p className="text-black text-sm font-semibold font-['Poppins']">Do Hoang Khanh Duy</p>
                                    </div>

                                    <div className="text-stone-400 text-sm font-semibold pl-7 mt-3">
                                        You need to do it yourself, remember there’s nothing that you cannot do my son. There’s no room for self-doubt.
                                    </div>

                                    <button className="flex items-center pl-7 mt-3 pb-6">
                                        <Iimage className="w-6 mr-2 fill-zinc-500" />
                                        <p className="text-center text-zinc-400 text-base font-normal leading-tight tracking-tight hover:underline">Click to see image</p>
                                    </button>
                                </div>
                            </div>

                            {/* Right side */}
                            <div className="bg-zinc-100 rounded-lg border border-neutral-400 mt-6 mr-7 ml-8">
                                <div className="mt-12 ml-7">
                                    <p className="text-black text-base font-medium leading-tight tracking-tight">Choose receiver</p>
                                    {/* Dropdown list */}
                                    <Select options={optionReceiver} onChange={handleChangeReceiver}
                                        className="w-3/4 mt-2" placeholder="Select receiver" />
                                </div>

                                <div className="mt-12 ml-6 mr-4">
                                    <p className="text-black text-base font-medium">Content</p>
                                    <textarea className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none mt-2"
                                        placeholder="Type content..." onChange={ev => setContent(ev.target.value)}></textarea>
                                </div>
                                <div className="font-semibold mt-3 ml-7">Image</div>
                                <div className="bg-white w-[380px] rounded-md border border-zinc-400 ml-7 mt-2 pl-2 py-1">
                                    <input
                                        className="mb-3"
                                        type="file"
                                        onChange={handleChangeFile} />
                                    <Image
                                        src={file}
                                        width={200}
                                        height={200}
                                    />
                                </div>

                                <div className="flex mt-[86px] mr-4 justify-end pb-8">
                                    <button className="text-center text-black text-base font-['Poppins'] bg-lime-300 rounded-lg px-3 py-1 hover:bg-lime-400">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}