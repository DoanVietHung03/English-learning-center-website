import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import ProfileUser from "@/components/icons/profile_user"
import Ieye from "@/components/icons/eye";
import React, { useEffect } from 'react';

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
                        <div className="flex items-center p-3">
                            <ProfileUser />
                            <p className="ml-4 text-2xl font-semibold font-poppins">Duong Tran Duy Hung</p>
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
                                    Username
                                </div>
                                <input className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none" type="text" id="myUsername" placeholder="Username" />

                                <div className="font-poppins text-sm mt-4">
                                    Full name
                                </div>
                                <input className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none" type="text" id="myFullName" placeholder="Nguyen Van A" />

                                <div className="font-poppins text-sm mt-4">
                                    Phone Number
                                </div>
                                <input className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none" type="text" id="myPhoneNumber" placeholder="09..." />
                                <div className="font-poppins text-sm mt-4">
                                    Email
                                </div>
                                <input className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none" type="text" id="myEmail" placeholder="...@gmail.com" />
                                <div className="font-poppins text-sm mt-4">
                                    Date of Birth
                                </div>
                                <input className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none" type="text" id="myBirthDate" placeholder="dd/mm/yyyy" />
                                <div className="font-poppins text-sm mt-4">
                                    Address 
                                </div>
                                <input className="w-4/5 bg-zinc-100 rounded border border-neutral-200 p-1 mt-2 -ml-2 focus:outline-none" type="text" id="myAddress" placeholder="...." />
                            </div>

                            <div className="pl-5 pt-5 ml-4">
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