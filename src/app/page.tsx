'use client';    
import Image from "next/image"
import Link from "next/link"
import Ilock from "@/components/icons/icon_lock"
import Iman from "@/components/icons/icon_man"
import { SyntheticEvent, useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { cookies } from  'next/headers'
import { getCookies, setCookie } from 'cookies-next'


export default function Login() {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [loginProgress, setloginProgress] = useState(true);
    const [error, setError] = useState(false);
    const [courses, setCourses] = useState([])
    // const [checkUser, setCheck] = useState(Boolean)
    // const [userType, setType] = useState('')


    const router = useRouter();
    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault();
        var checkUser
        var userType
        // try {
        await fetch('/api/authentication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, password }), // Gửi dữ liệu
        })
        .then(response => response.json())
        .then(data => {
            checkUser = data.check
            userType = data.userType
        })
        .catch(error =>{
            console.error('Error fetching data:', error);
        })
        console.log(userType)
        
        if (checkUser) {
            localStorage.setItem('userName', phone)
            localStorage.setItem("userType", userType)
            console.log(localStorage.getItem("userType"))
            router.push('/courseList')
            console.log(courses)
        }
        else {
            setError(true);
        }
    }

    
    return (
        <>
            <div className="mt-20 rounded-lg mx-auto my-auto w-2/3 h-[550px] bg-white border-gray-200 border-2">
                <div className="flex h-full">
                    <div className="w-1/2">
                        <div className="flex items-center p-4">
                            <img className="w-14" src="/icon.png" alt="logo" />
                            <p className=" font-bold ml-4 text-[#68C6E3] text-xl">Academy of English</p>
                        </div>

                        <div    >
                            <img className="flex items-center justify-center " src="/login.svg" alt="picture" />
                        </div>
                    </div>

                    <div className="w-1/2">

                        <h1 className="flex justify-center items-center mt-14 font-bold text-5xl text-[#50BFE2]">
                            Welcome to aoe
                        </h1>
                        <form onSubmit={handleFormSubmit}>
                            <div className="font-mono mt-12 ml-6 mr-4 text-xl">
                                <div className="w-full p-2 inline-flex justify-center items-center border-2 border-solid rounded-md border-gray-100">
                                    <Iman className="w-[21px] h-[24px] fill-[#D3CECE]" />
                                    <input className="w-full h-8 ml-5 text-base font-semibold focus:outline-none"
                                        type="phone" placeholder="Your telephone number"
                                        name="Username" required value={phone}
                                        onChange={ev => setPhone(ev.target.value)} />
                                </div>
                            </div>

                            <div className="font-mono mt-8 ml-6 mr-4 text-xl">
                                <div className="w-full p-2 inline-flex justify-center items-center border-2 border-solid rounded-md border-gray-100">
                                    <Ilock className="w-[21px] h-[24px] fill-[#D3CECE]" />
                                    <input className="w-full h-8 ml-5 text-base font-semibold focus:outline-none"
                                        type="password" placeholder="Your password"
                                        name="Password" required value={password}
                                        onChange={ev => setPassword(ev.target.value)} />
                                </div>
                            </div>
                            {(error) &&
                                (
                                    <div className="ml-6 mt-5 text-red-800 font-semibold 
                                        bg-red-300 rounded-lg p-3 mr-5">
                                        Wrong phone number or password
                                    </div>
                                )
                            }
                            <button
                                onClick={handleFormSubmit}
                                className="rounded-md my-4 ml-40 w-36 h-11 p-1 pt-2 pb-2 font-bold text-xl font-poppins text-white
                                        transition transform hover:scale-110 active:scale-100 bg-primary"
                                type="submit">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}