'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Ihand from "@/components/icons/icon_hand"
import Link from "next/link"
import Select from "react-select";
import React, { useState, useEffect, useRef } from "react"
import moment from 'moment';
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index'
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Pagination from '@mui/material/Pagination';

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
    var [reports, setReports] = useState([])
    const mongoose = require('mongoose');
    const { Date } = mongoose.Schema.Types;


    var currentRP: any[]

    const handleChangeStatus = (ev) => {
        localStorage.setItem('status_filter', ev.value) 
    };

    var [length, setLength] = useState(Number)
    const [resetKey, setResetKey] = useState(0);
    const [currentRP3, setReport] = useState([])

    var filteredReport: any[]
    const [currentPage, setCurrentPage] = useState(1);
    const rpPerPage = 7;
    currentRP = reports.slice((currentPage - 1) * rpPerPage, currentPage * rpPerPage);
    var currentRP2: any[]

    const handleChangeRemoveF = (ev) => {
        setLength(reports.length)
        console.log(reports.length)
        localStorage.setItem('status_filter', '')
        setResetKey((prevKey) => prevKey + 1);

    };

    const handleFilter = (ev) => {
        console.log(ev)
        filteredReport = reports.filter(report => report.status == localStorage.getItem('status_filter'))
        setLength(filteredReport.length)
        currentRP2 = filteredReport.slice((currentPage - 1) * rpPerPage, currentPage * rpPerPage);
        setReport(currentRP2)
    }

    const handlePageChange = (index: number) => {
        setCurrentPage(index)
        if (localStorage.getItem('status_filter') === 'Completed' || localStorage.getItem('status_filter') === 'Uncompleted'){
            filteredReport = reports.filter(report => report.status == localStorage.getItem('status_filter'))
            currentRP2 = filteredReport.slice((index - 1) * rpPerPage, index * rpPerPage), setReport(currentRP2)
        }
    }


    useEffect(() => {
        fetch('/api/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("userName"), userType: localStorage.getItem("userType"), method: 'getList' }),
        })
            .then(response => response.json())
            .then(data => {
                setReports(data)
                setLength(data.length)
            })
            .catch(error => console.error('Error:', error));

        localStorage.setItem('sidebar', 2)
        localStorage.setItem('status_filter', '')
    }, []);

    const handleSwitchChange = (index: number) => {
        if(reports[index].isCompleted === false){
            reports[index].status = 'Completed'
            reports[index].date_completed = new Date()
            reports[index].isCompleted = true
            localStorage.setItem('status', 'Completed') 
        }
        else{
            reports[index].status = 'Uncompleted'
            reports[index].date_completed = null
            reports[index].isCompleted = false
            localStorage.setItem('status', 'Uncompleted') 
        }

  
        filteredReport = reports.filter(report => report.status == localStorage.getItem('status_filter'))
        if(localStorage.getItem('status_filter') === ''){
            setLength(reports.length)
        }  
        else{
            setLength(filteredReport.length)
        }
        currentRP2 = filteredReport.slice((currentPage - 1) * rpPerPage, currentPage * rpPerPage);
        setReport(currentRP2)   
    };

    async function handleFormSubmit(ev: React.SyntheticEvent) {
        ev.preventDefault()
        await fetch('/api/report', {
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem('report_id'), status: localStorage.getItem('status'), method: 'changeStatus' }),
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const popupRef = useRef();

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
                        {localStorage.getItem('userType') !== 'Admin' ?
                            <div className="pl-10 pt-7 w-fit">
                                <Link href="/create_report">
                                    <button className="flex items-center gap-2 px-4 py-4 bg-lime-300 rounded-lg justify-center hover:bg-lime-400">
                                        <Ihand />
                                        <div className="text-center text-black text-sm font-['Poppins'] leading-tight tracking-tight">Create report</div>
                                    </button>
                                </Link>
                            </div> :
                            <div className="pt-7">
                            </div>}
                        <div className="flex items-center mt-4 gap-4">
                            <div className="ml-10 w-[141px]">
                                <Select key={`status-select-${resetKey}`}
                                    options={optionStatus}
                                    onChange={(ev) => { handleChangeStatus(ev); handleFilter(ev) }}
                                    placeholder="Status" />
                            </div>
                            <button onClick={handleChangeRemoveF}
                                className="text-red-700 rounded-lg text-base font-medium border-2 border-red-600 px-4 py-[2px]
                             hover:bg-red-200 transition-colors duration-300">
                                Remove filter
                            </button>
                        </div>

                        <div className="mt-12 mx-10">
                            <div className="grid grid-cols-6 items-center text-center">
                                <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight">ID</p>
                                <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight">Title</p>
                                <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight">Type</p>
                                <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight">Date Created</p>
                                <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight">Date Completed</p>
                                <p className="bg-zinc-300 text-black text-base font-bold leading-tight tracking-tight">Status</p>
                            </div>
                            <div className="h-[253px]">
                                {((localStorage.getItem('status_filter') === 'Completed') || (localStorage.getItem('status_filter') === 'Uncompleted'))   ?
                                    currentRP3.map((rep, index) => (
                                        // ((checkStatus[index] == status || status == '') &&
                                        <div key={index} className="grid grid-cols-6 items-center text-center">
                                            <div className="items-center text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                                <div>{rep.userID}</div>
                                            </div>
                                            <div className="items-center text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                                <Tooltip 
                                                disableFocusListener 
                                                disableTouchListener 
                                                title='Click to see full'>
                                                    <Grid item>
                                                        <Popup 
                                                            ref={popupRef} 
                                                            trigger={<button className="hover:underline">{rep.title}</button>} 
                                                            position={"right bottom"}>
                                                            <div className="bg-white w-52 h-fit rounded-md border-2 border-zinc-300 p-2">
                                                                <div className="overflow-y-auto h-44 border border-zinc-200 px-1"
                                                                    style={{ wordWrap: 'break-word' }}>
                                                                    {rep.content}
                                                                </div>
                                                                <div className="flex items-center ml-4">
                                                                    {(localStorage.getItem('userType') === 'Admin') && (
                                                                        <PinkSwitch
                                                                            id={String(index)}
                                                                            {...label}
                                                                            defaultChecked={rep.isCompleted}
                                                                            checked={rep.isCompleted}
                                                                            onChange={(ev) => {
                                                                                localStorage.setItem('report_id', rep._id);
                                                                                handleSwitchChange(rep.index);
                                                                                handleFormSubmit(ev)
                                                                                popupRef.current.close()                                                                            
                                                                            }} />)}
                                                                    {rep.isCompleted && <span>Completed</span>}
                                                                </div>
                                                            </div>
                                                        </Popup>
                                                    </Grid>
                                                </Tooltip>
                                            </div>
                                            <div className="items-center text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                                <div>{rep.type}</div>
                                            </div>
                                            <div className="items-center text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                                <div>{moment.utc(rep.date_created).format('MM/DD/YYYY')}</div>
                                            </div>
                                            <div className="items-center text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                                <div>{(rep.status === 'Uncompleted' ? <div>Not yet</div> : moment.utc(rep.date_completed).format('MM/DD/YYYY'))}</div>
                                            </div>
                                            <div className="flex items-center justify-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300">
                                                <div>{(rep.status === 'Uncompleted' ? <div className="bg-rose-200 text-red-500 px-2 py-1 font-medium w-fit">{rep.status}</div> : <div className="bg-lime-100 text-green-500 px-2 py-1 font-medium w-fit">{rep.status}</div>)}</div>
                                            </div>
                                        </div>)) :
                                    currentRP.map((rep, index) => (
                                        // ((checkStatus[index] == status || status == '') &&
                                        <div key={index} className="grid grid-cols-6 items-center text-center">
                                            <div className="items-center text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                                <div>{rep.userID}</div>
                                            </div>
                                            <div className="items-center text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                                <Tooltip disableFocusListener disableTouchListener title='Click to see full'>
                                                    <Grid item>
                                                        <Popup trigger={<button className="hover:underline">{rep.title}</button>} position={"right bottom"}>
                                                            <div className="bg-white w-52 h-fit rounded-md border-2 border-zinc-300 p-2">
                                                                <div className="overflow-y-auto h-44 border border-zinc-200 px-1"
                                                                    style={{ wordWrap: 'break-word' }}>
                                                                    {rep.content}
                                                                </div>
                                                                <div className="flex items-center ml-4">
                                                                    {(localStorage.getItem('userType') === 'Admin') && (
                                                                        <PinkSwitch
                                                                            id={String(index)}
                                                                            {...label}
                                                                            defaultChecked={rep.isCompleted}
                                                                            checked={rep.isCompleted}
                                                                            onChange={(ev) => {
                                                                                localStorage.setItem('report_id', rep._id);
                                                                                handleSwitchChange(rep.index);
                                                                                handleFormSubmit(ev)
                                                                            }} />)}
                                                                    {rep.isCompleted && <span>Completed</span>}
                                                                </div>
                                                            </div>
                                                        </Popup>
                                                    </Grid>
                                                </Tooltip>
                                            </div>
                                            <div className="items-center text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                                <div>{rep.type}</div>
                                            </div>
                                            <div className="items-center text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                                <div>{moment.utc(rep.date_created).format('MM/DD/YYYY')}</div>
                                            </div>
                                            <div className="items-center text-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300 pb-3">
                                                <div>{(rep.status === 'Uncompleted' ? <div>Not yet</div> : moment.utc(rep.date_completed).format('MM/DD/YYYY'))}</div>
                                            </div>
                                            <div className="flex items-center justify-center text-black text-xs leading-tight tracking-tight px-1 py-1 mt-1 border-b border-stone-300">
                                                <div>{(rep.status === 'Uncompleted' ? <div className="bg-rose-200 text-red-500 px-2 py-1 font-medium w-fit">{rep.status}</div> : <div className="bg-lime-100 text-green-500 px-2 py-1 font-medium w-fit">{rep.status}</div>)}</div>
                                            </div>
                                        </div>))}

                            </div>
                            <div className="flex justify-center mt-8">
                                <Pagination
                                    count={Math.ceil(length / rpPerPage)}
                                    shape="rounded"
                                    onChange={(event, newPage) => handlePageChange(newPage)}
                                    className=""
                                    color="primary"
                                />
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