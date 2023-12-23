'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Ihand from "@/components/icons/icon_hand"
import Link from "next/link"
import Select from "react-select";
import React, { ReactElement, useState, useEffect } from "react"
import moment from 'moment';

export default function RP() {
    const [status, setStatus] = useState('')
    const [reports, setReports] = useState([])

    const handleChangeStatus = (ev) => {
        setStatus(ev.value);
    };

    useEffect(() => {
        fetch('/api/report_list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("userName") }),
        })
            .then(response => response.json())
            .then(data => {
                setReports(data)
            })
            .catch(error => console.error('Error:', error));
        localStorage.setItem('sidebar', 2)
    }, []);

    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-3/4">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black pb-2">
                        Feedback and Bug report
                    </div>

                    <div className="bg-white rounded pb-16">
                        <div className="pl-10 pt-7 w-fit">
                            <Link href="/create_report">
                                <button className="flex items-center gap-2 px-4 py-4 bg-lime-300 rounded-lg justify-center hover:bg-lime-400">
                                    <Ihand />
                                    <div className="text-center text-black text-sm font-['Poppins'] leading-tight tracking-tight">Create report</div>
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
                            {reports.map((rep, index) => (
                                <>
                                    <div key={index} className="grid grid-cols-6 items-center">
                                        <div>
                                            <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight">ID</p>
                                            <div key={index}>
                                                <div className="flex items-center justify-between text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300">
                                                    <div>{rep.userID}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div >
                                            <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight">Title</p>
                                            <div key={index}>
                                                <div className="flex items-center justify-between text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300">
                                                    <div>{rep.title}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div >
                                            <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight">Type</p>
                                            <div key={index}>
                                                <div className="flex items-center justify-between text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300">
                                                    <div>{rep.type}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div >
                                            <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight">Date Created</p>
                                            <div key={index}>
                                                <div className="flex items-center justify-between text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300">
                                                    <div>{moment.utc(rep.date_created).format('MM/DD/YYYY')}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div >
                                            <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight">Date Completed</p>
                                            <div key={index}>
                                                <div className="flex items-center justify-between text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300">
                                                    <div>{(rep.date_completed === null ? <div>Not yet</div> : moment.utc(rep.date_completed).format('MM/DD/YYYY'))}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div >
                                            <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight">Status</p>
                                            <div key={index}>
                                                <div className="flex items-center justify-between text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300">
                                                    <div>{rep.status}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </>))}
                        </div>
                        {/* {reports.map((rep, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300">
                                        <div>{rep.userID}</div>
                                        <div className="ml-3">{rep.title}</div>
                                        <div className="bg-rose-200 text-red-600 font-semibold px-2 py-1">{rep.type}</div>
                                        <div className="ml-2">{rep.status}</div>
                                        <div className="ml-10">{moment.utc(rep.date_created).format('MM/DD/YYYY')}</div>
                                        <div className="ml-16">{moment.utc(rep.date_completed).format('MM/DD/YYYY')}</div>
                                    </div>
                                </div>
                            ))} */}
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