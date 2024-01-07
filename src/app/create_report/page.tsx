'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Iimage from "@/components/icons/icon_image"
import IfileExport from "@/components/icons/file_export"
import Select from "react-select";
import Image from "next/image"
import * as React from 'react';
import { SyntheticEvent, useState } from "react"
import { useRouter } from 'next/navigation'
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

export default function Create_RP() {
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState("");
    const [date_created, setDate_created] = useState(Date.now());
    const [date_completed, setDate_completed] = useState(null);
    const [status, setStatus] = useState('Uncompleted');
    const router = useRouter()

    const [image, setImage] = useState("")

    const handleChangeType = (ev) => {
        setType(ev.value);
    };

    const handleChangeFile = (event) => {
        const selectedFile = event.target.files[0];
        setImage(selectedFile)
        setFile(URL.createObjectURL(selectedFile))
    };

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

        await fetch('/api/report', {
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem('userName'), title, type, file: fileSave, content, date_created, date_completed, status, method: 'add' }),
            headers: { 'Content-Type': 'application/json' },
        })
        setTimeout(() => {
            router.push('/report_bug')
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
                                <p className="text-black text-base font-medium leading-tight tracking-tight mb-3">Type of report</p>
                                <Select options={optionType} onChange={handleChangeType} className="w-full" />
                            </div>
                        </div>

                        <div className="ml-14 h-96 items-center mt-12 mr-12 text-black text-base font-medium leading-tight tracking-tight">
                            <p>Content of report</p>
                            <textarea onChange={(ev) => { setContent(ev.target.value) }}
                                className="w-full h-[340px] border-2 rounded-md mt-4 pt-2 pl-2 focus:outline-none"
                                placeholder="Type content of the report"></textarea>
                        </div>

                        <div className="flex items-center ml-14 mt-2 gap-2 bg-gray-200 rounded-xl px-3 py-2 w-fit">
                            <Iimage />
                            <p className=" text-zinc-500 text-base leading-tight tracking-tight">Attached image</p>
                        </div>

                        <div className="rounded-md border border-zinc-400 ml-14 mr-12 mt-2 pl-2 py-1">
                            <input
                                className="mb-3"
                                type="file"
                                onChange={handleChangeFile} />
                            <Image
                                src={file}
                                width={300}
                                height={300} alt={""} />
                        </div>

                        <div className="flex items-center justify-end mr-12 mt-12">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box sx={{ m: 1, position: "relative" }}>
                                    <Fab
                                        aria-label="save"
                                        color="primary"
                                        sx={buttonSx}
                                        onClick={handleButtonClick}
                                    >
                                        {success ? <CheckIcon /> : <IfileExport />}
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
                                        onClick={(ev) => { handleButtonClick(ev); handleFormSubmit(ev) }}
                                    >
                                        Create
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

                    </div>

                </div>
            </div>
        </>
    )
}

const optionType = [
    { value: "Exercises_error", label: "Exercises error" },
    { value: "System_error", label: "System error" },
    { value: "Operation_error", label: "Operation error" },
];