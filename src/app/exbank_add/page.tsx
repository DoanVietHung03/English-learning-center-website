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
import { useRouter } from 'next/navigation'
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import { green, red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Ixmark from "@/components/icons/icon_xmark"
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import IfileAdd from "@/components/icons/icon_file_add";


export default function Exercise_Add() {
    const [skill, setSkill] = useState('')
    const [module, setModule] = useState('')
    const [title, setTitle] = useState('')
    const [file, setFile] = useState('');
    const [filemp3, setFilemp3] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(false)
    const router = useRouter();


    function handleChangeImage(ev) {
        setFile(URL.createObjectURL(ev.target.files[0]));
    }
    function handleChangeImage1(ev) {
        setFilemp3(URL.createObjectURL(ev.target.files[0]));
    }
    const handleChangeSkill = (ev) => {
        setSkill(ev.value);
    };
    const handelChangeModule = (ev) => {
        setModule(ev.value);
    }

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        const response = await fetch('/api/exercise', {
            method: 'POST',
            body: JSON.stringify({ title, filemp3, content, skill, file, module, method: 'add'}),
            headers: { 'Content-Type': 'application/json' },
        })
        if (!response.ok) {
            setError(true)
            setTimeout(() => {
                window.location.reload(true);
            }, 2000);
        }
        else {
            setTimeout(() => {
                router.push('/exercise_bank')
            }, 2000)
        }
    }

    //Function for add
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef<number>();

    const buttonSx = {
        ...((success && !error) && {
            bgcolor: green[500],
            "&:hover": {
                bgcolor: green[700],
            },
        }),
        ...((success && error) && {
            bgcolor: red[500],
            "&:hover": {
                bgcolor: red[700],
            },
        }),

    };

    React.useEffect(() => {
        setError(false)
        setSuccess(false)
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonSend = (ev) => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 1500);
        }
    };
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
                                        <div className="mb-2">Choose Module</div>
                                        <Select options={optionModule} onChange={handelChangeModule} className="w-full" />
                                    </div>

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
                            <Grid item>
                                        <Tooltip disableFocusListener disableTouchListener title="Click to add">
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Box sx={{ m: 1, position: "relative" }}>
                                                    <Fab
                                                        aria-label="save"
                                                        color="primary"
                                                        sx={buttonSx}
                                                        onClick={(ev) => { handleButtonSend(ev); handleFormSubmit(ev) }}
                                                    >
                                                        {success ? (!error ? <CheckIcon /> : <Ixmark /> )  : <IfileAdd />}
                                                    </Fab>
                                                    {loading && (
                                                        <CircularProgress
                                                            size={68}
                                                            sx={{
                                                                color: green[500],
                                                                position: "absolute",
                                                                top: -6,
                                                                left: -6,
                                                                zIndex: 1,
                                                            }}
                                                        />
                                                    )}
                                                </Box>
                                            </Box>
                                        </Tooltip>
                                    </Grid>
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

const optionModule = [
    { value: "IELTS", label: "IELTS" },
    { value: "TOEIC", label: "TOEIC" },
    { value: "TOEFL", label: "TOEFL" }
]