'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import Ieye from "@/components/icons/eye"
import { SyntheticEvent, useState } from "react"
import Select from "react-select";
import * as React from 'react';

export default function Exercise_bank() {
    const [subject, setSubject] = useState('')
    const [module, setModule] = useState('')
    const [skill, setSkill] = useState('')
    const [content, setContent] = useState('')

    const handleButtonClick = (ev) => {
        setContent(ev.value)
    }

    const handleChangeSubject = (ev) => {
        setSubject(ev.value);
    };

    const handleChangeModule = (ev) => {
        setModule(ev.value);
    };

    const handleChangeSkill = (ev) => {
        setSkill(ev.value);
    };

    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />

                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black">
                        Exercises Bank
                    </div>
                    <div className="bg-white rounded pb-3">
                        <div className="flex justify-between px-11 py-7">
                            <Select options={optionSubject} onChange={handleChangeSubject} className="w-1/4 text-center border-2 border-zinc-300 rounded-md" placeholder="Subject"/>
                            <Select options={optionModule} onChange={handleChangeModule} className="w-1/4 text-center border-2 border-zinc-300 rounded-md" placeholder="Module"/>
                            <Select options={optionSkill} onChange={handleChangeSkill} className="w-1/4 text-center border-2 border-zinc-300 rounded-md" placeholder="Skill"/>
                        </div>

                        <div className="mt-16 flex items-center ml-9 gap-2">
                            <button className="bg-purple-500 rounded-lg text-white text-base font-medium font-['Poppins'] px-6 py-1 hover:bg-purple-400">
                                Sort Data
                            </button>

                            <button className="text-red-700 rounded-lg text-base font-medium font-['Poppins'] border-2 border-red-600 px-4 py-[2px] hover:bg-red-200">
                                Remove filter
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pl-4 pt-3">
                        <button onClick={handleButtonClick} className="bg-white hover:bg-sky-200 text-black hover:text-white text-base font-medium px-4 py-2 rounded-lg border border-zinc-300">
                            In progress
                        </button>

                        <button className="bg-white hover:bg-sky-200 text-black hover:text-white text-base font-medium px-4 py-2 rounded-lg border border-zinc-300">
                            Done
                        </button>
                    </div>

                    <div className="flex justify-between mt-10 gap-2">
                        <div className="w-1/3 bg-white rounded-xl border border-zinc-300 px-2 pb-4">
                            <p className="text-center text-black text-base font-semibold font-['Poppins'] mt-4">IELTS Academic Grammar 0 - 2.5 | Tân ngữ</p>
                            <div className="flex items-center justify-between mt-4 border-b border-stone-200 pb-4">
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">IELTS</p>
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">Academic</p>
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">Grammar</p>
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">0 - 2.5</p>
                            </div>

                            <div className="mt-10 ml-4">
                                <Link href={"/exercise_bank/ex_in_exbank"}>
                                    <button className="flex items-center gap-2 bg-stone-300 rounded-md px-3 py-1 hover:bg-stone-200">
                                        <Ieye className="w-[1em] fill-blue-400"/>
                                        <p className="text-sky-400 text-sm font-medium font-['Poppins']">View Exercise</p>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="w-1/3 bg-white rounded-xl border border-zinc-300 px-2 pb-4">
                            <p className="text-center text-black text-base font-semibold font-['Poppins'] mt-4">IELTS Academic Grammar 0 - 2.5 | Tân ngữ</p>
                            <div className="flex items-center justify-between mt-4 border-b border-stone-200 pb-4">
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">IELTS</p>
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">Academic</p>
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">Grammar</p>
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">0 - 2.5</p>
                            </div>

                            <div className="mt-10 ml-4">
                                <Link href={"/exercise_bank/ex_in_exbank"}>
                                    <button className="flex items-center gap-2 bg-stone-300 rounded-md px-3 py-1 hover:bg-stone-200">
                                        <Ieye className="w-[1em] fill-blue-400"/>
                                        <p className="text-sky-400 text-sm font-medium font-['Poppins']">View Exercise</p>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="w-1/3 bg-white rounded-xl border border-zinc-300 px-2 pb-4">
                            <p className="text-center text-black text-base font-semibold font-['Poppins'] mt-4">IELTS Academic Grammar 0 - 2.5 | Tân ngữ</p>
                            <div className="flex items-center justify-between mt-4 border-b border-stone-200 pb-4">
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">IELTS</p>
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">Academic</p>
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">Grammar</p>
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">0 - 2.5</p>
                            </div>

                            <div className="mt-10 ml-4">
                                <Link href={"/exercise_bank/ex_in_exbank"}>
                                    <button className="flex items-center gap-2 bg-stone-300 rounded-md px-3 py-1 hover:bg-stone-200">
                                        <Ieye className="w-[1em] fill-blue-400"/>
                                        <p className="text-sky-400 text-sm font-medium font-['Poppins']">View Exercise</p>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}    

const optionSubject = [
    { value: "Speaking", label: "Speaking" },
    { value: "Listening", label: "Listening" },
    { value: "Writing", label: "Writing" },
    { value: "Reading", label: "Reading" }
];

const optionModule = [
    { value: "Speaking", label: "Speaking" },
    { value: "Listening", label: "Listening" },
    { value: "Writing", label: "Writing" },
    { value: "Reading", label: "Reading" }
];

const optionSkill = [
    { value: "Speaking", label: "Speaking" },
    { value: "Listening", label: "Listening" },
    { value: "Writing", label: "Writing" },
    { value: "Reading", label: "Reading" }
];