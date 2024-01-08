/* eslint-disable @next/next/no-img-element */
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
    const [fileType, setFileType] = useState('');

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
        localStorage.setItem('sidebar', 0)
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

    const audioTail = ['mp3', 'wav']
    const imgTail = ['jpg', 'png', 'jpeg']

    const handleClick = () => {
        setShowLargeImage(!showLargeImage);
    };

    const [showLargeImage, setShowLargeImage] = useState(false);

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
                        {((sub.attachedFile == null) || (sub.attachedFile == undefined) || (sub.attachedFile == '')) ? null :
                            <>
                                {imgTail.includes(fileType.substring(fileType.lastIndexOf('.') + 1)) ?
                                    <div className="bg-white w-[120px] h-[80px] rounded-md border border-zinc-400 ml-7 pl-2 py-1 overflow-y-auto">
                                        <img
                                            src={file}
                                            width={120}
                                            height={80}
                                            alt={"Cannot load"}
                                            onClick={handleClick}
                                            style={{
                                                width: showLargeImage ? '70%' : 'auto',
                                                height: showLargeImage ? '70vh' : 'auto',
                                                objectFit: 'contain',
                                                position: showLargeImage ? 'fixed' : 'static',
                                                margin: 'auto',
                                                display: 'flex',
                                                left: '50%',
                                                top: '50%',
                                                transform: showLargeImage ? 'translate(-50%, -50%)' : 'none',
                                                zIndex: showLargeImage ? 2 : 'auto',
                                                transition: '0.5s',
                                            }} />
                                        {showLargeImage && (
                                            <div
                                                style={{
                                                    position: 'fixed',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    background: 'rgba(0, 0, 0, 0.7)', // Điều này tạo ra một lớp đen với độ mờ là 0.7
                                                    zIndex: 1, // Đặt z-index để nó hiển thị phía trên ảnh, nhưng đằng sau nó
                                                }}
                                            />
                                        )}

                                    </div> : ((audioTail.includes(fileType.substring(fileType.lastIndexOf('.') + 1))) ?
                                        <div>
                                            <div>File listening</div>
                                            <ReactAudioPlayer
                                                src={file}
                                                controls
                                                className="w-full"
                                            />
                                        </div> :
                                        <div className="border border-zinc-300 px-2 py-2">
                                            <a style={{ wordWrap: 'break-word' }} href={file}>{file}</a>
                                        </div>)}
                            </> }
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
                        <textarea readOnly className="mt-4 ml-[62px] px-[14] py-3 w-16 h-14 focus:outline-none rounded border border-zinc-300 text-center" type="text" id="myScore" placeholder="Type score">
                            {sub.grade}
                        </textarea>
                    </div>
                ) : (
                    //setGrade(null),
                    <>
                    <div key={i}>
                        <textarea onChange={handleGrading} className="mt-4 ml-[62px] px-[14] py-3 w-16 h-14 focus:outline-none rounded border border-zinc-300 text-center" type="text" id="myScore" placeholder="Type score">
                        </textarea>
                    </div>
                    <div className="flex items-center justify-end mr-6 mt-2">
                    <button onClick={handleFormSubmit} className="bg-lime-300 rounded-lg text-center text-black text-base font-semibold font-poppins leading-3 tracking-tight px-5 py-2 hover:bg-lime-400">
                        Grade
                    </button>
                </div></>
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
                                    
                                </>
                                ) : null}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}