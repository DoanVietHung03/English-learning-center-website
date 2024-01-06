'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import { SyntheticEvent, useState } from "react"
import Select from "react-select";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ReactAudioPlayer from 'react-audio-player';
import { useRouter } from 'next/navigation'
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import IfileAdd from "@/components/icons/icon_file_add";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

export default function Add_Ass() {
    const [skill, setSkill] = useState('')
    const [deadline, setDeadline] = React.useState<Dayjs | null>(dayjs());
    const [title, setTitle] = useState('')
    const [file, setFile] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    function handleChangeImage(ev) {
        setFile(URL.createObjectURL(ev.target.files[0]));
    }
    const handleChangeSkill = (ev) => {
        setSkill(ev.value);
    };

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        await fetch('/api/assignment', {
            method: 'POST',
            body: JSON.stringify({ title, deadline, content, skill, file, id: localStorage.getItem('course_id'), method: 'add' }),
            headers: { 'Content-Type': 'application/json' },
        })
        setTimeout(() => {
            router.push('/assignments')
          }, 2000);
    }

    //Function for add
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef<number>();

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            "&:hover": {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = (ev) => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 800);
        }
    };

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
                        <div className="p-2 ml-2 font-poppins text-xs">{localStorage.getItem('course_name')}</div>
                    </div>

                    <div className="bg-white pb-8 pt-8 rounded px-7 mt-6">
                        <div>
                            <form className="h-[500px] p-4 pb-6 bg-zinc-100 rounded-lg border border-neutral-400">
                                <div className="flex h-3/4">
                                    <div className="flex flex-col w-1/2 p-4 gap-5 pr-10">
                                        <div>
                                            <div className="mb-2">Choose Skill</div>
                                            <Select options={optionSkill} onChange={handleChangeSkill} className="w-full" />
                                        </div>
                                        <div>
                                            <div>Due Date</div>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                                    <DatePicker value={deadline} onChange={(newValue) => setDeadline(newValue)}
                                                        className="w-full bg-white text-xs"
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
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
                                                    <input type="file" accept="audio" onChange={handleChangeImage} />
                                                    <ReactAudioPlayer
                                                        src={file}
                                                        autoPlay
                                                        controls
                                                        className="w-full"
                                                    />
                                                </div>
                                            )
                                        }
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
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Box sx={{ m: 1, position: "relative" }}>
                                            <Fab
                                                aria-label="save"
                                                color="primary"
                                                sx={buttonSx}
                                                onClick={handleButtonClick}
                                            >
                                                {success ? <CheckIcon /> : <IfileAdd />}
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
                                        <Box sx={{ m: 1, position: "relative" }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={buttonSx}
                                                disabled={loading}
                                                onClick={(ev) => {handleButtonClick(ev); handleFormSubmit(ev)}}
                                            >
                                                Add
                                            </Button>
                                            {loading && (
                                                <CircularProgress
                                                    size={24}
                                                    sx={{
                                                        color: green[500],
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: "50%",
                                                        marginTop: "-12px",
                                                        marginLeft: "-12px",
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </Box>
                                </div>
                            </form>
                        </div>
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