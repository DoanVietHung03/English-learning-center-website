/* eslint-disable @next/next/no-img-element */
'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import ProfileUser from "@/components/icons/profile_user"
import Ieye from "@/components/icons/eye";
import { SyntheticEvent, useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import * as React from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Icamera from "@/components/icons/icon_camera";

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

export default function Profile() {
    const [user, setUser] = useState({})
    const [password, setPassword] = useState('')
    var [errorPass, setErrorPass] = useState(false);
    const [checkPass, setCheckPass] = useState('')
    const [file, setFile] = useState("");
    const [image, setImage] = useState("")

    const handleChangeFile = (event) => {
        const selectedFile = event.target.files[0];
        setImage(selectedFile)
        setFile(URL.createObjectURL(selectedFile))
    };

    useEffect(() => {
        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: localStorage.getItem("userName"), method: 'getInfo' })
        })
            .then(response => response.json())
            .then(data => {
                setUser(data)
            })
    }, []);


    const [birth, setBirth] = React.useState<dayjs | null>(dayjs(user.birth))
    const [error, setError] = useState(false)


    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        localStorage.setItem('userFname', user.name)
        if (errorPass === false) {
            setError(false)
            let fileSave = ''
            const data = new FormData()
            data.append("file", image)
            data.append("folder", "avatar")
            data.append("upload_preset", "introSE")
            data.append("cloud_name", "dzdmbflvk")

            await fetch("https://api.cloudinary.com/v1_1/dzdmbflvk/image/upload", {
                method: "post",
                body: data
            })
                .then((res) => res.json())
                .then((data) => {
                    fileSave = data.url
                }).catch((err) => {
                    console.log(err);
                })

            const response = await fetch('api/user', {
                method: 'POST',
                body: JSON.stringify({ userID: user.phone, userBirth: birth, userName: user.name, userEmail: user.email, userAddress: user.address, userAvatar: fileSave, userPassword: password, method: 'changeInfo' }),
                headers: { 'Content-Type': 'application/json' },
            })
            if (!response.ok)
                setError(true)
            else {
                window.location.reload(true)
            }
        }
        else {
            setError(true)
            setErrorPass(true)
        }
    }

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isCheckPasswordVisible, setIsCheckPasswordVisible] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const handleToggleCheckPasswordVisibility = () => {
        setIsCheckPasswordVisible((prev) => !prev);
    };

    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />

                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black">
                        Profile
                    </div>
                    <div className="bg-white rounded pb-3">
                        <div className="flex items-center p-5">

                            {(((user.avatar === null) || (user.avatar === undefined) || (user.avatar === '')) && (file === "")) ?
                                <ProfileUser /> :
                                (file !== "") ?
                                <img
                                    className="w-20 h-20 rounded-full border-2 border-black"
                                    src={file}
                                    alt="" /> : 
                                    <img
                                    className="w-20 h-20 rounded-full border-2 border-black"
                                    src={user.avatar}
                                    alt="" />}

                            <p className="ml-4 text-2xl font-semibold font-poppins">
                                {user.name}
                            </p>
                            <div className="ml-12">
                                <Button style={{backgroundColor: "#33bbff"}} onChange={handleChangeFile} component="label" variant="contained" startIcon={<Icamera />}>
                                    Change avatar
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 border-b-2 border-zinc-400 pl-5 pt-5 pb-2 ml-4 mr-5">
                            <div className="font-poppins font-semibold text-lg">
                                Account Information
                            </div>
                            <div className="font-poppins font-semibold text-lg ml-10">
                                Security Information
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div className="pl-5 pt-5 ml-4">
                                <div className="font-poppins text-sm">
                                    Phone number
                                </div>
                                <input
                                    className="w-4/5 text-gray-400 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none"
                                    type="text"
                                    value={user.phone}

                                    readOnly
                                />

                                <div className="font-poppins text-sm mt-4">
                                    Full name
                                </div>
                                <input
                                    className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none"
                                    type="text"
                                    placeholder={user.name}
                                    onChange={ev => user.name = ev.target.value}
                                />

                                <div className="font-poppins text-sm mt-4">
                                    Email
                                </div>
                                <input className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none"
                                    type="text" placeholder={user.email}
                                    onChange={ev => user.email = ev.target.value}
                                />


                                <div className="font-poppins text-sm mt-4">
                                    Date of Birth
                                </div>
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker value={dayjs(user.birth)} onChange={(ev) => setBirth(ev ? ev.toISOString() : null)}
                                                className="w-3/4"
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>

                                <div className="font-poppins text-sm mt-4">
                                    Address
                                </div>
                                <input className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none"
                                    type="text" id="myAddress"
                                    placeholder={user.address}
                                    onChange={ev => user.address = ev.target.value}
                                />
                            </div>

                            <div className="pl-5 pt-5 ml-8">
                                <div className="font-poppins text-sm">
                                    Enter new password
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={(ev) => { setPassword(ev.target.value); 
                                        if (ev.target.value === checkPass) {
                                            setErrorPass(false);
                                        }
                                        else {
                                            setErrorPass(true);
                                        } 
                                    }}
                                        className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none border-r-0"
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        id="myNewPassword"
                                        placeholder="New password"
                                        value={password} />
                                    <button
                                        onClick={handleTogglePasswordVisibility}
                                        className="transition transform hover:scale-110 active:scale-100">
                                        <Ieye className="w-4 items-center mt-2 ml-2" />
                                    </button>
                                </div>
                                <div className="font-poppins text-sm mt-4">
                                    Confirm new password
                                </div>
                                <div className="flex items-center">
                                    <input 
                                        onChange={(ev) => {setCheckPass(ev.target.value)
                                        if (ev.target.value === password) {
                                            setErrorPass(false);
                                        }
                                        else {
                                            setErrorPass(true);
                                        }
                                    }} 
                                        className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none" 
                                        type={isCheckPasswordVisible ? 'text' : 'password'} 
                                        id="myConfirmPassword" 
                                        placeholder="Confirm password" 
                                        value={checkPass} />
                                    <button
                                        onClick={handleToggleCheckPasswordVisibility} 
                                        className="transition transform hover:scale-110 active:scale-100">
                                        <Ieye className="w-4 items-center mt-2 ml-2" />
                                    </button>
                                </div>
                                {(errorPass) &&
                                    (
                                        <div className="w-4/5 -ml-2 mt-5 text-red-800 font-semibold bg-red-300 rounded-lg p-3 mr-5">
                                            Wrong password
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="items-center justify-center flex mt-6">
                            <button className="bg-sky-300 rounded-lg border border-stone-300 pt-1 pb-1 pl-3 pr-3"
                                onClick={handleFormSubmit}>
                                Apply
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}