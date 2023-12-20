'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import ProfileUser from "@/components/icons/profile_user"
import Ieye from "@/components/icons/eye";
import { SyntheticEvent, useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { User } from "@/models/user"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

export default function Profile() {
    // useEffect(() => {
    //     let showPassword = false;
    //     const passwordInput = document.getElementById('myNewPassword');
    //     const toggleButton = document.getElementById('togglePasswordButton');
    //     const togglePasswordVisibility = () => {
    //       showPassword = !showPassword;
    //       passwordInput.type = showPassword ? 'text' : 'password';
    //     };
    //     if (toggleButton) {
    //       toggleButton.addEventListener('click', togglePasswordVisibility);
    //     }
    //     // Hủy đăng ký sự kiện khi component unmount
    //     return () => {
    //       if (toggleButton) {
    //         toggleButton.removeEventListener('click', togglePasswordVisibility);
    //       }
    //     };
    //   }, []);
    const [phone, setPhone] = useState('')
    const [name, setName] = useState(localStorage.getItem('userFname') || '')
    const [email, setEmail] = useState('')
    const [birth, setBirth] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const router = useRouter();

    useEffect(() => {
        fetch('/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: localStorage.getItem("userName"), name: localStorage.getItem("userFname") }),
        })
        .then(response => response.json())
        // .then(data => {
            
        // })
        .catch(error => console.error('Error:', error));
    }, []);

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        const response = await fetch('api/profile', {
            method: 'POST',
            body: JSON.stringify({phone, name, email, birth, address, password}),
            headers: {'Content-Type': 'application/json'},
        })
        if (!response.ok)
            setError(true)
        else {
            router.push('/profile')
        }
    }

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
                            <ProfileUser />
                            <p className="ml-4 text-2xl font-semibold font-poppins">
                                {localStorage.getItem('userFname')}
                            </p>
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
                                    value={localStorage.getItem('userName')}
                                    readOnly
                                />
                                
                                <div className="font-poppins text-sm mt-4">
                                    Full name
                                </div>
                                <input
                                    className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                <div className="font-poppins text-sm mt-4">
                                    Email
                                </div>
                                <input className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none" type="text" id="myEmail" placeholder="...@gmail.com" 
                                    onChange={ev => setEmail(ev.target.value)}
                                /> 
                                

                                <div className="font-poppins text-sm mt-4">
                                    Date of Birth
                                </div>
                                <input className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none" type="text" id="myBirthDate" placeholder="dd/mm/yyyy" />
                                
                                a
                                <div className="font-poppins text-sm mt-4">
                                    Address 
                                </div>
                                <input className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none" type="text" id="myAddress" placeholder="...." />
                            </div>

                            <div className="pl-5 pt-5 ml-8">
                                <div className="font-poppins text-sm">
                                    Enter new password
                                </div>
                                <div className="flex items-center">
                                    <input className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none border-r-0" type="password" id="myNewPassword" placeholder="New password" />
                                    <button className="transition transform hover:scale-110 active:scale-100">
                                        <Ieye className="w-4 items-center mt-2 ml-2" />
                                    </button>
                                </div>
                                <div className="font-poppins text-sm mt-4">
                                    Confirm new password
                                </div>
                                <div className="flex items-center">
                                <input className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none" type="password" id="myConfirmPassword" placeholder="Confirm password" />
                                    <button className="transition transform hover:scale-110 active:scale-100">
                                        <Ieye className="w-4 items-center mt-2 ml-2" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="items-center justify-center flex mt-6">
                            <button className="bg-sky-300 rounded-lg border border-stone-300 pt-1 pb-1 pl-3 pr-3">
                                Apply
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}