'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Imicro from "@/components/icons/microphone";
import Iuser from "@/components/icons/icon_user";
import * as React from 'react';
import { useEffect, useState, ReactElement } from "react";
import { useRouter } from "next/navigation";

export default function Ass_Grading() {
    const [submissions, setSubmissions] = useState([])
    const [file, setFile] = useState('');
    const [comment, setComment] = useState('')
    const [grade, setGrade] = useState(Number)
    const [submission, setSubmission] = useState('')
    const router = useRouter();

    function handleChangeImage(ev) {
        setFile(URL.createObjectURL(ev.target.files[0]));
    }

    const handleGrading = (ev: SyntheticEvent) => {
        setGrade(ev.value)
    };

    const handleComment = (ev: SyntheticEvent) => {
        setComment(ev.value)
    };

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        await fetch('/api/grade', {
            method: 'POST',
            body: JSON.stringify({ assignment_id: localStorage.getItem('assignment_id'), comment, grade, }),
            headers: { 'Content-Type': 'application/json' },
        })
        router.push('/assignments')
    }

    useEffect(() => {
        fetch('/api/submission_list', {
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem('assignment_id') }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                setSubmissions(data)
                console.log(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const [studentContent, setStudentContent] = useState<ReactElement | any | null>(null);
    const [selectedButton, setSelectedButton] = useState<number | any | null>(null);

    const handleButtonClick = (index: number) => {
        setSelectedButton(index);
        const content = submissions.map((sub, i) => (
            index === i ? (
                <div key={i}>
                    <div className="mt-10 ml-[34px] text-black text-sm font-semibold font-poppins mb-2">
                        <p>{sub.student_id}</p>
                    </div>
                    <div className="mx-[34px] px-7 py-4 border-t border-b border-stone-300 overflow-y-auto h-80 h-fixed">
                        <div className="text-black text-base font-normal font-poppins leading-tight tracking-tight">
                            {sub.answer}
                        </div>
                    </div>
                </div>
            ) : null
        ));
        setStudentContent(content);
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
                        <div className="p-2 ml-2 font-poppins text-xs">{localStorage.getItem("course_id")}</div>
                    </div>

                    <div className="bg-white mt-2 pb-8 rounded px-7">
                        <div className="bg-white mt-2 pb-8">
                            <div className="flex">
                                <div className="w-1/3 border-r px-10 pt-9 pb-2 items-center border-b border-stone-300">
                                    <div className="mb-8">
                                        <p className="text-2xl font-bold">List of submissions</p>
                                    </div>
                                    {submissions.map((sub, index) => (
                                        <button
                                            onClick={() => handleButtonClick(index)}
                                            key={index}
                                            className={`w-full flex items-center  overflow-y-auto border-b py-4 border-stone-300 hover:bg-zinc-100 ${selectedButton === index ? 'bg-zinc-100' : ''}`}>
                                            <Iuser className="w-[3em] fill-zinc-300" />
                                            <p className="text-black text-sm font-semibold font-poppins ml-4">{sub.student_id}</p>
                                        </button>
                                    ))}
                                </div>

                                <div className="w-2/3">
                                    {studentContent}
                                </div>
                            </div>

                            <div className="mt-8 ml-[62px]">
                                <button className="flex items-center justify-center gap-2 bg-gray-200 rounded-2xl px-6 py-3 hover:bg-gray-300">
                                    <Imicro />
                                    <input type="file" onChange={handleChangeImage} />
                                </button>
                            </div>

                            <div className="mt-4 ml-[62px]">
                                <p className="text-black text-xl font-semibold font-poppins leading-tight tracking-tight">Type comment</p>
                            </div>

                            <div className="mt-4 mx-[62px]">
                                <textarea onChange={handleComment} className="w-full h-56 border border-zinc-300 pt-3 pl-4 focus:outline-none" id="myComment" placeholder="Type comment..."></textarea>
                            </div>

                            <p className="text-black text-xl font-semibold font-poppins leading-tight tracking-tight mt-4 ml-[62px]">Score</p>
                            <input onChange={handleGrading} className="mt-4 ml-[62px] px-[14] py-3 w-[136px] focus:outline-none rounded border border-zinc-300 text-center" type="text" id="myScore" placeholder="Type score" />

                            <div className="flex items-center justify-end mr-6 mt-2">
                                <button className="bg-lime-300 rounded-lg text-center text-black text-base font-semibold font-poppins leading-3 tracking-tight px-5 py-2 hover:bg-lime-400">
                                    Grade
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}