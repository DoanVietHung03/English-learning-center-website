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
import { useRouter } from 'next/navigation'
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import IfileAdd from "@/components/icons/icon_file_add";
import Ixmark from "@/components/icons/icon_xmark";
import { green, red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Imp3 from "@/components/icons/icon_mp3";

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

export default function Add_Ass() {
    const [skill, setSkill] = useState('')
    const [deadline, setDeadline] = React.useState<Dayjs | null>(dayjs());
    const [title, setTitle] = useState('')
    //const [file, setFile] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const [audio, setAudio] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setAudio(selectedFile)
        setFile(selectedFile);
    };

    // function handleChangeImage(ev) {
    //     setFile(URL.createObjectURL(ev.target.files[0]));
    // }
    const handleChangeSkill = (ev) => {
        setSkill(ev.value);
    };

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        let fileSave = ''
        const data = new FormData()
        data.append("file", audio);
        data.append("folder", "assignments");
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
        const response = await fetch('/api/assignment', {
            method: 'POST',
            body: JSON.stringify({ title, deadline, content, skill, file: fileSave, id: localStorage.getItem('course_id'), method: 'add' }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (!response.ok) {
            setError(true)
            setTimeout(() => {
                window.location.reload(true);
            }, 1200);
        }
        else {
            setTimeout(() => {
                router.push('/assignments')
            }, 2000);
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
        setSuccess(false);
        setError(false)
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
                                        
                                        {(skill != "") &&
                                            (
                                                <div className="container mx-auto mt-4">

                                                    <Button style={{ backgroundColor: "#33bbff" }} onChange={handleFileChange} component="label" variant="contained" startIcon={<Imp3 />}>
                                                        Input file
                                                        <VisuallyHiddenInput type="file" accept="auto" />
                                                    </Button>
                                                    {file && (
                                                        <>
                                                            <div className="border border-zinc-300">
                                                                <p className="mt-2">Selected file: {file.name}</p>
                                                                {skill == 'Listening' && (
                                                                <audio controls>
                                                                    <source src={URL.createObjectURL(file)} type="audio" />
                                                                    Your browser does not support the audio tag.
                                                                </audio>)}
                                                            </div>
                                                        </>
                                                    )}


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
                                                onClick={(ev) => { handleButtonClick(ev); handleFormSubmit(ev) }}
                                            >
                                                {success ? (!error ? <CheckIcon /> : <Ixmark />) : <IfileAdd />}
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
                                </div>
                            </form>
                            {(error) &&
                                <div className="mt-5 max-w-xs text-red-800 font-semibold 
                                bg-red-300 rounded-lg p-3 mr-5">
                                    Some information is missed.
                                </div>
                            }
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