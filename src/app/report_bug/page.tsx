'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Ihand from "@/components/icons/icon_hand"
import Link from "next/link"
import Select from "react-select";
import * as React from 'react';
import { ReactElement, useState, useEffect } from "react"

export default function RP() {
    const [status, setStatus] = useState('')

    const handleChangeStatus = (ev) => {
        setStatus(ev.value);
    };

    useEffect(() => {
        localStorage.setItem('sidebar', 2)
    })

    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black pb-2">
                        Feedback and Bug report
                    </div>

                    <div className="bg-white rounded pb-16">
                        <div className="pl-10 pt-7 w-fit">
                            <Link href="/create_report">
                                <button className="flex items-center gap-2 px-4 py-4 bg-lime-300 rounded-lg justify-center hover:bg-lime-400">
                                    <Ihand />
                                    <p className="text-center text-black text-sm font-['Poppins'] leading-tight tracking-tight">Create report</p>
                                </button>
                            </Link>
                        </div>

                        <div className="ml-10 mt-4 w-[141px]">
                            <Select 
                                options={optionStatus}
                                onChange={handleChangeStatus}
                                placeholder="Status" />
                        </div>

                        <div className="mt-12 mx-10">
                            <div className="flex items-center bg-zinc-300 justify-between text-center text-black text-base font-bold leading-tight tracking-tight px-4">
                                <p>ID</p>
                                <p>Title</p>
                                <p>Type</p>
                                <p>Status</p>
                                <p>Date Created</p>
                                <p>Date Completed</p>
                            </div>
                            <div className="flex items-center gap-16 text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300">
                                <p>AOE-48</p>
                                <p className="ml-3">Infor not display</p>
                                <p className="bg-rose-200 text-red-600 font-semibold px-2 py-1">System issue</p>
                                <p className="ml-2">Completed</p>
                                <p className="ml-10">20:39 04/06/2023</p>
                                <p className="ml-16">10:45 07/06/2023</p>
                            </div>

                            <div className="flex items-center gap-16 text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300">

                            </div>

                            <div className="flex items-center gap-16 text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300">

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

const optionStatus = [
    { value: "Completed", label: "Completed" },
    { value: "Uncompleted", label: "Uncompleted" }
];