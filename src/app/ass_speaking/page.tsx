'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import Imicro from "@/components/icons/microphone"
import React, { useState } from 'react'
import { Span } from "next/dist/trace"

export default function Ass_Speaking() {
    const [file, setFile] = useState('');
    function handleChangeFile(ev) {
        setFile(URL.createObjectURL(ev.target.files[0]));
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
                        <div className="p-2 ml-2 font-poppins text-xs">[INTER_CLASSName] aoe - Q.5 ClassNameRoom IELTS 5.5 6.5 | 25/09/2023 Writing, Speaking, Writing Task 1, Writing Task 2</div>
                    </div>

                    <div className="bg-white mt-2 pb-8 rounded">
                        <div className="flex items-center justify-end py-2 border-b border-stone-300 mx-4">
                            <Link href={''}>
                                <button className="flex items-center bg-lime-300 rounded-lg px-3 py-1 font-poppins text-sm">
                                    Submit
                                </button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 mt-4 py-4 mx-4 gap-6">
                            <div className="rounded-lg border border-stone-300 pl-6 py-8 pr-4 overflow-y-scroll h-96">
                                <div className=""><span className="text-black text-base font-bold font-['Poppins']">Part 1: Housework and Cooking<br/></span><span className="text-black text-base font-normal font-['Poppins']">Viết và ghi âm câu trả lời hoàn chỉnh cho các câu hỏi sau<br/>1. Do you do some cooking/help your family cook at home now?<br/>2. Did you do some house cleaning when you were young?<br/>3. Do you have breakfast at home every day?<br/>4. Do you want to learn how to cook well?</span></div>
                                <div className="mt-6"><span className="text-black text-base font-bold font-['Poppins']">Part 2: Describe a time when you got up early<br/></span><span className="text-black text-base font-normal font-['Poppins']">Học viên chọn 1 chủ đề để trả lời<br/>Viết và ghi âm câu trả lời hoàn chỉnh cho chủ đề đã chọn<br/>You should say:<br/></span><span className="text-black text-base font-normal font-['Poppins']">When it was<br/>What you did<br/>Why you got up early<br/>And how you felt about it</span></div>
                                <div className="mt-6"><span className="text-black text-base font-bold font-['Poppins']">Part 3: Part 3<br/></span><span className="text-black text-base font-normal font-['Poppins']">Học viên chỉ trả lời các câu Part 3 có cùng chủ đề với câu Part 2 đã chọn ở phần trước<br/>Viết và ghi âm câu trả lời hoàn chỉnh cho các câu đã chọn<br/>1. Do you know anyone who likes to get up early?<br/>2. Why do people get up early?<br/>3. What kinds of occasions need people to arrive early?<br/>4. Why do some people like to stay up late?<br/>5. What kind of advice do parents give to their children?<br/>6. How do experts give advice to others? (e.g a doctor gives advice to patients)</span></div>
                            </div>

                            <div className="bg-orange-100 bg-opacity-40 rounded-lg shadow-lg border flex-col justify-start items-center inline-flex p-4 pb-12">
                                <textarea className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none h-96" id="myText" placeholder="Type..."></textarea>
                                <div className="mt-[65px] w-full items-center justify-end flex">
                                    <div className="w-1/3">
                                        <div className="w-fit py-1 px-2 border border-zinc-400 bg-white rounded-lg">
                                            <div className="flex items-center justify-end border p-1 bg-zinc-300">
                                                <Imicro />
                                                <p className="ml-2 font-poppins text-center text-sm">Choose recorded file</p>
                                            </div>
                                        </div>
                                        <input
                                            className="mb-3 mt-2"
                                            type="file"
                                            onChange={handleChangeFile} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}