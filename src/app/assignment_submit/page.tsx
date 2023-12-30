/* eslint-disable react/jsx-key */
"use client"
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import React from "react"
import { SyntheticEvent, useEffect, useState } from "react"
import ReactAudioPlayer from "react-audio-player"
import { useRouter } from "next/navigation";

export default function Do_Assignment() {
    const [assignment, SetAssignment] = useState([])
    const [answer, SetAnswer] = useState('')
    const [file, setFile] = useState('');
    const [submission, setSubmission] = useState([])
    const router = useRouter();

    function handleChangeFile(ev) {
        setFile(URL.createObjectURL(ev.target.files[0]));
    }


    useEffect(() => {
        fetch('/api/assignment', {
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem("assignment_id"), method: 'getInfo' }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                SetAssignment(data)
            })

        fetch('/api/submission', {
            method: 'POST',
            body: JSON.stringify({ assignment_id: localStorage.getItem("assignment_id"), id: localStorage.getItem('userName'), method: 'getInfo' }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                setSubmission(data)
            })

    }, []);

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        const response = await fetch('/api/submission', {
            method: 'POST',
            body: JSON.stringify({ answer, id_student: localStorage.getItem("userName"), id_assignment: localStorage.getItem("assignment_id"), file, method: 'add' }),
            headers: { 'Content-Type': 'application/json' },
        })
        router.push('/assignments')
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

                    <div className="bg-white mt-2 pb-10 rounded">
                        <div className="flex items-center justify-between py-2 border-b border-stone-300 mx-4">
                            <div className="font-bold">
                                Title:{" " + assignment.title}
                            </div>
                            {(submission === null) ? <Link href={''}>
                                <button onClick={handleFormSubmit}
                                    className="flex items-center bg-lime-500 rounded-lg px-3 py-1 font-poppins text-sm
                                                            font-bold text-white hover:bg-lime-300 hover:text-gray-600 transition-colors">
                                    Submit
                                </button>
                            </Link> : (submission.grade !== null) ?
                                <div className="flex items-center bg-lime-300 rounded-lg px-3 py-1 font-poppins text-medium
                                                        font-semibold">
                                    Grade: {submission.grade}
                                </div> : <div className="flex items-center bg-yellow-200 rounded-lg px-3 py-1 font-poppins text-medium
                                                                font-semibold">
                                    Grade: Pending
                                </div>}
                        </div>


                        <div className="grid grid-cols-2 py-4 mx-4 gap-6">
                            <div>
                                <p className="text-base font-medium leading-tight tracking-tight">Content</p>
                                <div className="rounded-lg border border-stone-300 pl-6 py-8 pr-4 h-[371px] overflow-y-auto"
                                    style={{ wordWrap: 'break-word' }}>
                                    {assignment.content}
                                </div>
                            </div>

                            <div>
                                <p className="text-base font-medium leading-tight tracking-tight">Answer</p>
                                <div className="bg-orange-100 bg-opacity-40 rounded-lg shadow-lg border flex-col justify-start items-center pl-4 pt-4">
                                    {(submission !== null) ?
                                        <div className="h-[266px]" style={{ wordWrap: 'break-word' }}>{submission.answer}</div> :
                                        <textarea onChange={(ev) => { SetAnswer(ev.target.value) }} className="w-full h-[348px] rounded-lg border border-zinc-400 p-3 focus:outline-none" id="myText" placeholder="Type..." ></textarea>}
                                </div>
                                
                                <div>
                                    {(submission !== null &&
                                        <div className="flex items-center">
                                            <div className="w-full h-10">
                                                <p className="mt-3 text-base font-medium leading-tight tracking-tight">Comment</p>
                                                {submission.comment !== null ? <div className="rounded pl-2 py-1 border border-stone-300 w-full h-[55px] overflow-y-auto bg-lime-100">
                                                                                    {submission.comment}
                                                                                </div> : 
                                                                                <div className="rounded pl-2 py-1 border border-stone-300 w-full h-[55px] overflow-y-auto">
                                                                                    No comment
                                                                                </div>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                            </div>
                        </div>


                        {(assignment.skill === "Speaking" && submission === null &&
                            <div className="bg-white p-3 rounded-lg border-2">
                                <h2>Add your file:</h2>
                                <input type="file" accept="audio" onChange={handleChangeFile} />
                                <ReactAudioPlayer
                                    src={file}
                                    autoPlay
                                    controls
                                    className="w-full"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}