/* eslint-disable @next/next/no-img-element */
'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import { SyntheticEvent, useState } from "react"
import Select from "react-select";
import * as React from 'react';
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
import ReactAudioPlayer from "react-audio-player"
import { styled } from '@mui/material/styles';
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

export default function Exercise_Add() {
    const [skill, setSkill] = useState('')
    const [module, setModule] = useState('')
    const [title, setTitle] = useState('')
    const [solution, setSolution] = useState('');
    const [file, setFile] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(false)
    const router = useRouter();
    const [image, setImage] = useState("")
    const [fileType, setFileType] = useState('');

    const [file2, setFile2] = useState('');
    const [fileType2, setFileType2] = useState('');



    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile)
        setImage(selectedFile)
        setFile(URL.createObjectURL(selectedFile))
        setFileType(selectedFile.name)
    };

    const handleFileChange2 = (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile)
        setSolution(selectedFile)
        setFile2(URL.createObjectURL(selectedFile))
        setFileType2(selectedFile.name)
    };

    const handleDeleteImage = () => {
        setFile("")
        setFileType('')
        setImage('')
    }

    const handleDeleteImage2 = () => {
        setFile2("")
        setFileType2('')
        setSolution('')
    }

    const handleChangeSkill = (ev) => {
        setSkill(ev.value);
    };
    const handelChangeModule = (ev) => {
        setModule(ev.value);
    }

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        let fileSave = ''
        const data1 = new FormData()
        data1.append("file", image);
        data1.append("folder", "exercises");
        data1.append("upload_preset", "introSE");
        data1.append("cloud_name", "dzdmbflvk")
        await fetch("https://api.cloudinary.com/v1_1/dzdmbflvk/raw/upload", {
            method: "post",
            body: data1
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                fileSave = data.url
            }).catch((err) => {
                console.log(err);
            })

        let fileSave2 = ''
        const data2 = new FormData()
        data2.append("file", solution);
        data2.append("folder", "exercises");
        data2.append("upload_preset", "introSE");
        data2.append("cloud_name", "dzdmbflvk")
        await fetch("https://api.cloudinary.com/v1_1/dzdmbflvk/raw/upload", {
            method: "post",
            body: data2
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                fileSave2 = data.url
            }).catch((err) => {
                console.log(err);
            })
        const response = await fetch('/api/exercise', {
            method: 'POST',
            body: JSON.stringify({ title, attachedFile: fileSave, content, skill, solution: fileSave2, module, method: 'add' }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (!response.ok) {
            setError(true)
            setTimeout(() => {
                window.location.reload(true);
            }, 1500);
        }
        else {
            setTimeout(() => {
                router.push('/exercise_bank')
            }, 1500)
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
        localStorage.setItem('sidebar', 1)

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
            }, 1400);
        }
    };

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
                        Exercise Bank
                    </div>

                    <div className="bg-white mt-2 pb-8 rounded px-7 py-8">
                        <form className="h-[550px] p-4 bg-zinc-100 rounded-lg border border-neutral-400">
                            <div className="flex h-3/4">
                                <div className="flex flex-col w-1/2 p-4 gap-5 pr-10">
                                    <div>
                                        <div className="mb-2">Choose Module (*)</div>
                                        <Select options={optionModule} onChange={handelChangeModule} className="w-full" />
                                    </div>

                                    <div>
                                        <div className="mb-2">Choose Skill (*)</div>
                                        <Select options={optionSkill} onChange={handleChangeSkill} className="w-full" />
                                    </div>

                                    <div>
                                        <div className="text-lg">Title (*)</div>
                                        <input type="text" placeholder="Type title" onChange={ev => setTitle(ev.target.value)}
                                            className="py-2 px-2 w-full border-gray-300 border-2 rounded-md" />
                                    </div>
                                    {(skill != "") &&
                                        (
                                            <>
                                                <div className="container mx-auto mt-4">

                                                    <Button className="w-full justify-between items-center"
                                                        color="primary"
                                                        onChange={handleFileChange} component="label" variant="contained"
                                                        startIcon={<IfileCirclePlus className="w-[1em] fill-white" />}>
                                                        <div className="flex w-full justify-between items-center">
                                                            <div>
                                                                file
                                                            </div>
                                                            <VisuallyHiddenInput
                                                                type="file" accept="auto" />
                                                            {file && (
                                                                <div className="w-full ml-4">
                                                                    {(image.name).length > 21 ?
                                                                        ((image.name).substring(0, 21) + '... ' + (image.name).substring(fileType.lastIndexOf('.') + 1)) : image.name}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Button>
                                                    {(file !== '') ?
                                                        <>
                                                            <div className="flex items-center justify-end mr-6 mt-2">
                                                                <button onClick={handleDeleteImage2}>
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
                                                                        <ReactAudioPlayer
                                                                            src={file}
                                                                            controls
                                                                            className="w-full"
                                                                        />
                                                                    </div> :
                                                                    <div className="border border-zinc-300 px-2 py-2 mt-2">
                                                                        <a style={{ wordWrap: 'break-word' }} href={file}>{file}</a>
                                                                    </div>)}

                                                        </> : null}
                                                </div>
                                            </>
                                        )
                                    }
                                </div>

                                <div className="flex flex-col w-1/2 p-4 pr-6 gap-1">
                                    <p className="text-black text-base font-normal leading-tight tracking-tight mb-2">Content (*)</p>
                                    <div className="mb-[27px]">
                                        <textarea onChange={ev => setContent(ev.target.value)}
                                            className="w-full h-[218px] border-2 rounded-md pt-2 pl-2 focus:outline-none"
                                            id="myContent" placeholder="Type content of the assignment"></textarea>
                                    </div>

                                    {(skill != "") && (
                                        <div className="container mx-auto">
                                            <Button className="w-full justify-between items-center"
                                                color="primary"
                                                onChange={handleFileChange2} component="label" variant="contained"
                                                startIcon={<IfileCirclePlus className="w-[1em] fill-white" />}>
                                                <div className="flex w-full justify-between items-center">
                                                    <div>
                                                        solution
                                                    </div>
                                                    <VisuallyHiddenInput
                                                        type="file" accept="auto" />
                                                    {file2 && (
                                                        <div className="w-full ml-4">
                                                            {(solution.name).length > 21 ?
                                                                ((solution.name).substring(0, 21) + '... ' + (solution.name).substring((solution.name).lastIndexOf('.') + 1)) : solution.name}
                                                        </div>
                                                    )}
                                                </div>
                                            </Button>
                                            {(file2 !== '') ?
                                                <>
                                                    <div className="flex items-center justify-end mr-6 mt-2">
                                                        <button onClick={handleDeleteImage2}>
                                                            <IcircleXmark className="w-[1.5em]" />
                                                        </button>
                                                    </div>
                                                    {imgTail.includes(fileType2.substring(fileType2.lastIndexOf('.') + 1)) ?
                                                        <div className="bg-white w-[120px] h-[80px] rounded-md border border-zinc-400 ml-7 pl-2 py-1 overflow-y-auto">
                                                            <img
                                                                src={file2}
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

                                                        </div> : ((audioTail.includes(fileType2.substring(fileType2.lastIndexOf('.') + 1))) ?
                                                            <div>
                                                                <div>Solution</div>
                                                                <ReactAudioPlayer
                                                                    src={file2}
                                                                    controls
                                                                    className="w-full"
                                                                />
                                                            </div> :
                                                            <div className="border border-zinc-300 px-2 py-2 mt-2">
                                                                <a style={{ wordWrap: 'break-word' }} href={file2}>{file2}</a>
                                                            </div>)}
                                                </> : null}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-end mt-[77px] mr-4">
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