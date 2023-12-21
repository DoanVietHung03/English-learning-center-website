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
    const router = useRouter();

    function handleChangeFile(ev) {
        setFile(URL.createObjectURL(ev.target.files[0]));
    }
    //get CourseID
    //lay info assignment where ass.idCourse = Course.idCourse
    //luu info submission voi id ass

    const blobUrl = 'blob:http://localhost:3000/audio/5089f84a-e6bb-4787-8baa-00f695f275ae';
    function handlePlayMp3() {
        console.log("aaaaa")
        fetch(blobUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                // Tạo URL từ blob
                const objectUrl = URL.createObjectURL(blob);

                // Sử dụng URL trong một đối tượng Audio
                const audioElement = new Audio(objectUrl);
                audioElement.play();

                // Nếu bạn muốn hiển thị nó trong một thẻ audio
                const audioPlayer = document.getElementById('audioPlayer');
                audioPlayer.src = objectUrl;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    useEffect(() => {
        handlePlayMp3()
        fetch('/api/assignment_info', {
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem("assignment_id") }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                SetAssignment(data)
                console.log(data)
            })
    }, []);

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        const response = await fetch('/api/submission', {
            method: 'POST',
            body: JSON.stringify({ answer, id_student: localStorage.getItem("userName"), id_assignment: localStorage.getItem("assignment_id"), file }),
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

                    <div className="bg-white mt-2 pb-8 rounded">
                        <div className="flex items-center justify-between py-2 border-b border-stone-300 mx-4">
                            <div className="font-bold">
                                Title:{" " + assignment.title}
                            </div>
                            <Link href={''}>
                                <button onClick={handleFormSubmit}
                                    className="flex items-center bg-lime-500 rounded-lg px-3 py-1 font-poppins text-sm
                                    font-bold text-white hover:bg-lime-300 hover:text-gray-600 transition-colors py-2">
                                    Submit
                                </button>
                            </Link>
                        </div>


                        <div className="grid grid-cols-2 mt-4 py-4 mx-4 gap-6">
                            <span className="rounded-lg border border-stone-300 pl-6 py-8 pr-4"
                                style={{ wordWrap: 'break-word' }}>
                                {assignment.content}
                            </span>

                            <div className="bg-orange-100 bg-opacity-40 rounded-lg shadow-lg border flex-col justify-start items-center inline-flex p-4">
                                <textarea onChange={(ev) => { SetAnswer(ev.target.value) }} className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none h-96" id="myText" placeholder="Type..." ></textarea>
                            </div>
                        </div>


                        {(assignment.skill === "Speaking" &&
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