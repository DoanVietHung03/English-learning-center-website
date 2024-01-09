/* eslint-disable @next/next/no-img-element */
'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import IfileExport from "@/components/icons/file_export"
import Select from "react-select";
import * as React from 'react';
import { SyntheticEvent, useState } from "react"
import { useRouter } from 'next/navigation'
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import { green, red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Ixmark from "@/components/icons/icon_xmark"
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

export default function Create_RP() {
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState("");
    const [date_created, setDate_created] = useState(Date.now());
    const [date_completed, setDate_completed] = useState(null);
    const [status, setStatus] = useState('Uncompleted');
    const [error, setError] = useState(false)
    const router = useRouter()
    const [image, setImage] = useState("")
    const [fileName, setFileName] = useState('')

    const handleChangeType = (ev) => {
        setType(ev.value);
    };

    const handleChangeFile = (event) => {
        const selectedFile = event.target.files[0];
        setImage(selectedFile)
        setFile(URL.createObjectURL(selectedFile))
        setFileName(selectedFile)
    };

    const handleDeleteImage = () => {
        setFile("")
        setImage('')
    }

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        let fileSave = ''
        const data = new FormData()
        data.append("file", image)
        data.append("folder", "report")

        data.append("upload_preset", "introSE")
        data.append("cloud_name", "dzdmbflvk")

        await fetch("https://api.cloudinary.com/v1_1/dzdmbflvk/image/upload", {
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

        const response = await fetch('/api/report', {
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem('userName'), title, type, file: fileSave, content, date_created, date_completed, status, method: 'add' }),
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
                router.push('/report_bug')
            }, 1500);
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
        localStorage.setItem('sidebar', 2)
        setError(false)
        setSuccess(false)
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
            }, 1400);
        }
    };

    const [showLargeImage, setShowLargeImage] = useState(false);

    const handleClick = () => {
        setShowLargeImage(!showLargeImage);
    }

    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black pb-2">
                        Feedback and Bug report
                    </div>

                    <div className="bg-white rounded pb-6">
                        <div className="flex items-center gap-24 pt-12">
                            <div className=" ml-14 w-1/3">
                                <p className="text-black text-base font-medium leading-tight tracking-tight">Title of report (*)</p>
                                <input onChange={(ev) => { setTitle(ev.target.value) }}
                                    className="w-full h-[34px] px-3 py-2 mt-3 rounded-md border border-zinc-300 focus:outline-none "
                                    type="text" id="myTitle" placeholder="Title of the content you wish to report" />
                            </div>

                            <div className="w-1/3">
                                <p className="text-black text-base font-medium leading-tight tracking-tight mb-3">Type of report (*)</p>
                                <Select options={optionType} onChange={handleChangeType} className="w-full" />
                            </div>
                        </div>

                        <div className="ml-14 h-96 items-center mt-12 mr-12 text-black text-base font-medium leading-tight tracking-tight">
                            <p>Content of report (*)</p>
                            <textarea onChange={(ev) => { setContent(ev.target.value) }}
                                className="w-full h-[340px] border-2 rounded-md mt-4 pt-2 pl-2 focus:outline-none"
                                placeholder="Type content of the report"></textarea>
                        </div>
                        <p className="text-black text-base font-medium leading-tight tracking-tight mb-3 ml-14 mt-3">Attach images</p>
                        <div className="rounded-md border border-zinc-400 ml-14 mr-12 mt-2 px-2 py-1">
                            <Button className="w-full justify-between items-center"
                                color="primary"
                                onChange={handleChangeFile} component="label" variant="contained"
                                startIcon={<IfileCirclePlus />}>
                                <div className="flex w-full justify-between items-center overflow-x-auto">
                                    <div className="w-[100px]">
                                        Input file
                                    </div>
                                    <VisuallyHiddenInput
                                        type="file" accept="auto" />
                                    {file && (
                                        <div className="overflow-x-visible">
                                            {fileName.name}
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

                                    </div>
                                </> 
                                : null}
                        </div>

                        <div className="flex items-center justify-end mr-12 mt-12">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box sx={{ m: 1, position: "relative" }}>
                                    <Fab
                                        aria-label="save"
                                        color="primary"
                                        sx={buttonSx}
                                        onClick={(ev) => { handleButtonClick(ev); handleFormSubmit(ev) }}
                                    >
                                        {success ? (!error ? <CheckIcon /> : <Ixmark />) : <IfileExport />}
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
                        

                    </div>

                </div>
            </div>
        </>
    )
}

const optionType = [
    { value: "Data_error", label: "Data error" },
    { value: "System_error", label: "System error" },
    { value: "Operation_error", label: "Operation error" },
    { value: "Suggest new function", label: "Suggest new function" },
    { value: "Other", label: "Other" }
];