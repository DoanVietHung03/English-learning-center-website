/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client"
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import React from "react"
import moment from "moment"
import { SyntheticEvent, useEffect, useState } from "react"
import ReactAudioPlayer from "react-audio-player"
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import IfileCirclePlus from "@/components/icons/icon_fileCirclePlus"

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function Do_Assignment() {
    const [assignment, SetAssignment] = useState([])
    const [answer, SetAnswer] = useState('')
    const [file, setFile] = useState('');
    const [submission, setSubmission] = useState([])
    const router = useRouter();

    const currentDate = moment();
    const [audio, setAudio] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setAudio(selectedFile)
        setFile(selectedFile);
    };


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
        ev.preventDefault()
        let fileSave = ''
        const data = new FormData()
        data.append("file", audio);
        data.append("folder", "submissions");
        data.append("upload_preset", "introSE");
        data.append("cloud_name", "dzdmbflvk");
        await fetch("https://api.cloudinary.com/v1_1/dzdmbflvk/raw/upload", {
            method: "post",
            body: data
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                fileSave = data.url
            }).catch((err) => {
                console.log(err);
            })
        const response = await fetch('/api/submission', {
            method: 'POST',
            body: JSON.stringify({ answer, id_student: localStorage.getItem("userName"), id_assignment: localStorage.getItem("assignment_id"), file: fileSave, method: 'add' }),
            headers: { 'Content-Type': 'application/json' },
        })
        router.push('/assignments')
    }

    const [showLargeImage, setShowLargeImage] = useState(false);

    const handleClick = () => {
        setShowLargeImage(!showLargeImage);
    };

    const audioTail = ['mp3', 'wav']
    const imgTail = ['jpg', 'png', 'jpeg']

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
                            {(submission === null) ?
                                <Link href={''}>
                                    {(currentDate.isAfter(moment.utc(assignment.deadline))) ? null
                                        : <button onClick={handleFormSubmit}
                                            className="flex items-center bg-lime-500 rounded-lg px-3 py-1 font-poppins text-sm
                                                            font-bold text-white hover:bg-lime-300 hover:text-gray-600 transition-colors">
                                            Submit
                                        </button>}
                                </Link> :
                                (submission.grade !== null) ?
                                    <div className="flex items-center bg-lime-300 rounded-lg px-3 py-1 font-poppins text-medium
                                                        font-semibold">
                                        Grade: {submission.grade}
                                    </div> : <div className="flex items-center bg-yellow-200 rounded-lg px-3 py-1 font-poppins text-medium
                                                                font-semibold">
                                        Grade: Pending
                                    </div>}
                        </div>

                        <div className="grid grid-cols-2 py-4 mx-4 gap-6">
                            {(currentDate.isAfter(moment.utc(assignment.deadline))) ?
                                <>
                                    <div>
                                        <p className="text-base font-medium leading-tight tracking-tight">Content</p>
                                        <div className="rounded-lg border border-stone-300 pl-6 py-8 pr-4 h-[371px] overflow-y-auto"
                                            style={{ wordWrap: 'break-word' }}>
                                            {assignment.content}
                                        </div>
                                    </div>
                                    <img
                                        src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/165482761_510677450344194_7997565227561803700_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7f8c78&_nc_eui2=AeHBHopgCKVUvKsb1vCaH8tn9SEzRUEmzPT1ITNFQSbM9JCBPunBQhcTtRiXi50UhdoPTmuSVQRNi-ApYHSk4Vou&_nc_ohc=n1X7i_ii7o0AX-ow7Lw&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfAfyzYeuzWHS8gipcjzVo19xxZY4-hpKrRyLqd_XfcmSQ&oe=65C20433"
                                        alt=""
                                        className="w-[400px] h-[371px] mt-[18px] ml-5" />
                                </>
                                :
                                <>
                                    <div>
                                        <p className="text-base font-medium leading-tight tracking-tight">Content</p>
                                        <div className="rounded-lg border border-stone-300 pl-6 py-4 pr-4 h-[378px]">
                                            <div style={{ wordWrap: 'break-word' }} className="h-[355px] overflow-y-auto">
                                                {assignment.content}

                                                <div className="mt-6">
                                                    {((assignment.attachedFile == null) || (assignment.attachedFile == '') || (assignment.attachedFile == undefined)) ?
                                                        null
                                                        : <>
                                                            {imgTail.includes((assignment.attachedFile).substring((assignment.attachedFile).lastIndexOf('.') + 1)) ?
                                                                <>
                                                                    <img
                                                                        src={assignment.attachedFile}
                                                                        alt="Cannot load"
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
                                                                        }}
                                                                    />
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
                                                                    )} </> : (audioTail.includes((assignment.attachedFile).substring((assignment.attachedFile).lastIndexOf('.') + 1))) ?
                                                                    <div>
                                                                        <div>File listening</div>
                                                                        <ReactAudioPlayer
                                                                            src={assignment.attachedFile}
                                                                            controls
                                                                            className="w-full"
                                                                        />
                                                                    </div> :
                                                                    <div className="border border-zinc-300 px-2 py-2">
                                                                        <a style={{ wordWrap: 'break-word' }} href={assignment.attachedFile}>{assignment.attachedFile}</a>
                                                                    </div>
                                                            }
                                                        </>}


                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div>
                                        <p className="text-base font-medium leading-tight tracking-tight">Answer</p>
                                        <div className="bg-orange-100 h-[378px] bg-opacity-40 rounded-lg shadow-lg border flex-col justify-start items-center px-4 pt-4 pb-2">
                                            {(submission !== null) ?
                                                <>
                                                    <div className="h-[266px] overflow-y-auto" style={{ wordWrap: 'break-word' }}>
                                                        {submission.answer}
                                                    </div>
                                                    {(assignment.skill == 'Speaking' &&
                                                        <>
                                                            <div>File speaking</div>
                                                            <ReactAudioPlayer
                                                                src={submission.attachedFile}
                                                                controls
                                                                className="w-full"
                                                            />
                                                        </>)}

                                                </> :
                                                <div>
                                                    <textarea onChange={(ev) => { SetAnswer(ev.target.value) }} className="w-full h-[200px] rounded-lg border border-zinc-400 p-3 focus:outline-none mb-4" id="myText" placeholder="Type..." ></textarea>
                                                    {(assignment.skill == 'Speaking' &&
                                                        <>
                                                            <Button className="w-full justify-between items-center mt-4"
                                                                color="primary"
                                                                onChange={handleFileChange} component="label" variant="contained"
                                                                startIcon={<IfileCirclePlus className="w-[1em] fill-white" />}>
                                                                <div className="flex w-full justify-between items-center overflow-x-auto">
                                                                    <div className="w-1/3">
                                                                        Input file 
                                                                    </div>
                                                                    <VisuallyHiddenInput
                                                                        type="file" accept="auto" />
                                                                    {file && (
                                                                        <div className="w-full ml-4">
                                                                            {(file.name).length > 21 ?
                                                                                ((file.name).substring(0, 21) + '... ' + (file.name).substring((file.name).lastIndexOf('.') + 1)) : file.name}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </Button>
                                                            {((file === '') || (file === null) || (file === undefined)) ? null :
                                                                <>
                                                                    <ReactAudioPlayer
                                                                        src={file}
                                                                        controls
                                                                        className="w-full mt-8"
                                                                    />
                                                                </>}

                                                        </>)}
                                                </div>
                                            }
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
                                </>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}