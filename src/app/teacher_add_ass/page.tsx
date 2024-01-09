/* eslint-disable @next/next/no-img-element */
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
import ReactAudioPlayer from "react-audio-player"
import IfileCirclePlus from "@/components/icons/icon_fileCirclePlus";
import IcircleXmark from "@/components/icons/icon_circle_xmark";

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
    const [skill, setSkill] = useState()
    const [deadline, setDeadline] = React.useState<Dayjs | null>(dayjs());
    const [title, setTitle] = useState()
    //const [file, setFile] = useState('');
    const [content, setContent] = useState();
    const router = useRouter();
    const [file, setFile] = useState('');
    const [error, setError] = useState(false);
    const [image, setImage] = useState("")
    const [fileType, setFileType] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile)
        setImage(selectedFile)
        setFile(URL.createObjectURL(selectedFile))
        setFileType(selectedFile.name)
    };

    const handleDeleteImage = () => {
        setFile("")
        setFileType('')
        setImage('')
    }

    const handleChangeSkill = (ev) => {
        setSkill(ev.value);
    };

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        let fileSave = ''
        const data = new FormData()
        data.append("file", image);
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

    const [showLargeImage, setShowLargeImage] = useState(false);

    const handleClick = () => {
        setShowLargeImage(!showLargeImage);
    };

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
        localStorage.setItem('sidebar', 0)

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
                        <div className="p-2 ml-2 font-poppins text-xs">{localStorage.getItem('course_name')}</div>
                    </div>

                    <div className="bg-white pb-8 pt-8 rounded px-7 mt-6">
                        <div>
                            <form className="h-[500px] p-4 pb-6 bg-zinc-100 rounded-lg border border-neutral-400">
                                <div className="flex h-3/4">
                                    <div className="flex flex-col w-1/2 p-4 gap-5 pr-10">
                                        <div>
                                            <div className="mb-2">Choose Skill (*)</div>
                                            <Select options={optionSkill} onChange={handleChangeSkill} className="w-full" />
                                        </div>
                                        <div>
                                            <div>Due Date (*)</div>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                                    <DatePicker value={deadline} onChange={(newValue) => setDeadline(newValue)}
                                                        className="w-full bg-white text-xs"
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </div>
                                        <div>
                                            <div className="text-lg">Title (*)</div>
                                            <input type="text" placeholder="Type title" onChange={ev => setTitle(ev.target.value)}
                                                className="py-2 px-2 w-full border-gray-300 border-2 rounded-md" />
                                        </div>

                                        {(skill != "") &&
                                            (
                                                <div className="container mx-auto mt-4">

                                                    <Button className="w-full justify-between items-center"
                                                        color="primary"
                                                        onChange={handleFileChange} component="label" variant="contained"
                                                        startIcon={<IfileCirclePlus className="w-[1em] fill-white" />}>
                                                        <div className="flex w-full justify-between items-center overflow-x-auto">
                                                            <div className="w-[100px]">
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
                                                    {(file !== '') ?
                                                        <>
                                                            <div className="flex items-center justify-end mr-6 mt-2">
                                                                <button onClick={handleDeleteImage}>
                                                                    <IcircleXmark className="w-[1.5em]" />
                                                                </button>
                                                            </div>
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

                                                        </> : null}


                                                </div>
                                            )
                                        }
                                    </div>

                                    <div className="flex flex-col w-1/2 mt-3 gap-3">
                                        <div className="h-96 items-center text-black text-base font-normal leading-tight tracking-tight">
                                            <p>Content (*)</p>
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
                                                {success ? (!error ? <CheckIcon /> : <Ixmark />) : <IfileAdd className="w-[1.4em] fill-white" />}
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
                </div >
            </div >
        </>
    )
}

const optionSkill = [
    { value: "Speaking", label: "Speaking" },
    { value: "Listening", label: "Listening" },
    { value: "Writing", label: "Writing" },
    { value: "Reading", label: "Reading" }
];