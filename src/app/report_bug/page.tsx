'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Ihand from "@/components/icons/icon_hand"
import Link from "next/link"
import Select from "react-select";
import React, { ReactElement, useState, useEffect } from "react"
import moment from 'moment';
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index'
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";

const PinkSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: pink[600],
      "&:hover": {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: pink[600],
    },
  }));
  
const label = { inputProps: { "aria-label": "Color switch demo" } };

export default function RP() {
    const [status, setStatus] = useState('')
    const [reports, setReports] = useState([])

    const handleChangeStatus = (ev) => {
        setStatus(ev.value);
    };

    const [isCompleted, setIsCompleted] = useState(Array(reports.length).fill(false));

    const handleSwitchChange = (index: number) => {
        setIsCompleted((prevStates) => {
          const newStates = [...prevStates];
          newStates[index] = !newStates[index];
          return newStates;
        });
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
                            <div className="grid grid-cols-6 items-center">
                                <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight px-1">ID</p>
                                <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight px-1">Title</p>
                                <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight px-1">Type</p>
                                <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight px-1">Date Created</p>
                                <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight px-1">Date Completed</p>
                                <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight px-1">Status</p>
                            </div>
                            {reports.map((rep, index) => (
                                <div key={index} className="grid grid-cols-6 items-center">
                                    <div className="flex items-center justify-between text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                        <div>{rep.userID}</div>
                                    </div>
                                    <div className="flex items-center justify-between text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                        <Popup trigger={<button className="hover:underline">{rep.title}</button>} position={"right bottom"}>
                                            <div className="bg-white w-52 h-fit rounded-md border-2 border-zinc-300 p-2">
                                                <div className="overflow-y-auto h-44 border border-zinc-200 px-1">
                                                    {rep.content}
                                                </div>
                                                <div className="flex items-center ml-4">
                                                    <PinkSwitch 
                                                        id={String(index)}
                                                        {...label} 
                                                        defaultChecked={isCompleted[index]}
                                                        checked={isCompleted[index]}
                                                        onChange={() => handleSwitchChange(index)} />
                                                    {isCompleted && <span>Completed</span>}
                                                </div>
                                            </div>             
                                        </Popup>
                                    </div>
                                    <div className="flex items-center justify-between text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                        <div>{rep.type}</div>
                                    </div>
                                    <div className="flex items-center justify-between text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                        <div>{moment.utc(rep.date_created).format('MM/DD/YYYY')}</div>
                                    </div>
                                    <div className="flex items-center justify-between text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                        <div>{(rep.date_completed === null ? <div>Not yet</div> : moment.utc(rep.date_completed).format('MM/DD/YYYY'))}</div>
                                    </div>
                                    <div className="flex items-center justify-between text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 ">
                                        <div>{(!isCompleted[index] ? <div className="bg-rose-200 text-red-500 px-2 py-1 font-medium">{rep.status}</div> : <div className="bg-lime-100 text-green-500 px-2 py-1 font-medium">{rep.status}</div>)}</div>
                                    </div>
                                </div>))}
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