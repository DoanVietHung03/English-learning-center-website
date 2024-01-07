'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Imicro from "@/components/icons/microphone";
import Iuser from "@/components/icons/icon_user";
import * as React from 'react';
import { useEffect, useState, ReactElement, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import ReactAudioPlayer from "react-audio-player";

export default function Ass_Grading() {
    const [submissions, setSubmissions] = useState([])
    const [file, setFile] = useState('');
    const [comment, setComment] = useState('')
    const [commentContent, setCommentContent] = useState<ReactElement | any | string>('')
    const [gradeContent, setGradeContent] = useState<ReactElement | any | string>('')
    const [grade, setGrade] = useState('')


    function handleChangeImage(ev) {
        setFile(URL.createObjectURL(ev.target.files[0]));
    }

    const handleGrading = (ev: SyntheticEvent) => {
        setGrade(ev.target.value)
    };

    const handleComment = (ev: SyntheticEvent) => {
        setComment(ev.target.value)
    };

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault();
        await fetch('/api/submission', {
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem('submission_id'), comment, grade, assignment_id: localStorage.getItem('assignment_id'), method: 'grading' }),
            headers: { 'Content-Type': 'application/json' },
        })
        window.location.reload(true);
    }

    useEffect(() => {
        fetch('/api/submission', {
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem('assignment_id'), method: 'getList' }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                setSubmissions(data)
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
                        <p>{sub.student_Name}</p>
                    </div>
                    <div className="mx-[34px] px-7 py-4 border-t border-b border-stone-300 h-80 h-fixed">
                        <div className="text-black text-base font-normal font-poppins leading-tight tracking-tight border-b border-zinc-300 h-3/5 overflow-y-auto"
                            style={{ wordWrap: 'break-word' }}>
                            {sub.answer}
                        </div>
                        {((sub.attachedFile !== null) || (sub.attachedFile !== '') || (sub.attachedFile !== '')) &&
                            (
                                <div>
                                    <p className="text-base font-semibold leading-tight tracking-tight mt-2">Submission file</p>
                                    <ReactAudioPlayer
                                    src={sub.attachedFile}
                                    autoPlay
                                    controls
                                    className="w-full mt-6"
                                />
                                </div>
                            )}
                    </div>

                </div>
            ) : null
        ));
        setStudentContent(content);

        const comments = submissions.map((sub, i) => (
            index === i ? (
                sub.comment !== null ? (
                    setComment(sub.comment),
                    <div key={i}>
                        <textarea readOnly className="w-full h-56 border border-zinc-300 pt-3 pl-4 focus:outline-none" id="myComment" placeholder="Type comment...">
                            {sub.comment}
                        </textarea>
                    </div>
                ) : (
                    //setComment(null),
                    <div key={i}>
                        <textarea onChange={handleComment} className="w-full h-56 border border-zinc-300 pt-3 pl-4 focus:outline-none" id="myComment" placeholder="Type comment...">

                        </textarea>
                    </div>
                )
            ) : null
        ));
        setCommentContent(comments)

        const grades = submissions.map((sub, i) => (
            index === i ? (
                sub.grade !== null ? (
                    setGrade(sub.grade),
                    <div key={i}>
                        <input readOnly className="mt-4 ml-[62px] px-[14] py-3 w-16 h-14 focus:outline-none rounded border border-zinc-300 text-center" type="text" id="myScore" placeholder="Type score">
                            {sub.grade}
                        </input>
                    </div>
                ) : (
                    //setGrade(null),
                    <div key={i}>
                        <input onChange={handleGrading} className="mt-4 ml-[62px] px-[14] py-3 w-16 h-14 focus:outline-none rounded border border-zinc-300 text-center" type="text" id="myScore" placeholder="Type score">
                        </input>
                    </div>
                )
            ) : null
        ));
        setGradeContent(grades);
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
                        <div className="p-2 ml-2 font-poppins text-xs">{localStorage.getItem("course_name")}</div>
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
                                            onClick={() => { handleButtonClick(index), localStorage.setItem('submission_id', sub._id) }}
                                            key={index}
                                            className={`w-full flex items-center  overflow-y-auto border-b py-4 border-stone-300 hover:bg-zinc-100 ${selectedButton === index ? 'bg-zinc-100' : ''}`}>
                                            <Iuser className="w-[3em] fill-zinc-300" />
                                            <div>
                                                <p className="text-black text-sm font-semibold font-poppins ml-4">{sub.student_Name} - {sub.student_id}</p>
                                                {sub.grade !== null ?
                                                    <p className="text-zinc-400 text-sm font-semibold font-poppins ml-4">Marked</p> : null}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="w-2/3">
                                    {studentContent}
                                </div>
                            </div>

                            {selectedButton !== null ? (
                                <>
                                <div className="mt-4 ml-[62px]">
                                <p className="text-black text-xl font-semibold font-poppins leading-tight tracking-tight">Type comment</p>
                            </div>

                            <div className="mt-4 mx-[62px]">
                                {commentContent}
                            </div>

                            <p className="text-black text-xl font-semibold font-poppins leading-tight tracking-tight mt-4 ml-[62px]">Score</p>
                            <div>{gradeContent}</div>

                            <div className="flex items-center justify-end mr-6 mt-2">
                                <button onClick={handleFormSubmit} className="bg-lime-300 rounded-lg text-center text-black text-base font-semibold font-poppins leading-3 tracking-tight px-5 py-2 hover:bg-lime-400">
                                    Grade
                                </button>
                            </div> </>) : null}
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}