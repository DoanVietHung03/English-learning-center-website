/* eslint-disable react/jsx-key */
'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import Ieye from "@/components/icons/eye"
import IfileDelete from "@/components/icons/icon_file_delete"
import { ReactElement, useState, useEffect, useRef } from "react"
import Select from "react-select";
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import ItripleBar from "@/components/icons/icon_triple_bars"
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useRouter } from "next/navigation";
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index'

export default function Exercise_bank() {
    const [module, setModule] = useState('')
    const [skill, setSkill] = useState('')
    const [content, setContent] = useState<ReactElement | any | null>(null)
    const [exercises, setExercises] = useState([])
    const [exerciseList, setExerciseList] = useState([])
    const [selectedButton, setSelectedButton] = useState<number | null>(1);
    const [resetKey, setResetKey] = useState(0);
    const [currentEx3, setCurrentEx] = useState([])

    const router = useRouter()

    var currentEx: any[]
    const [currentPage, setCurrentPage] = useState(1);
    const exPerPage = 3;
    currentEx = exercises.slice((currentPage - 1) * exPerPage, currentPage * exPerPage);
    var currentEx2: any[]
    var filteredEx: any[]
    var [length, setLength] = useState(Number)



    var delete_ex
    const handleButtonClick = (buttonNumber: number) => {
        setSelectedButton(buttonNumber);
    };


    const handleChangeRemoveF = (ev) => {
        setLength(exercises.length)
        localStorage.setItem('skill_filter', '')
        localStorage.setItem('module_filter', '')
        setResetKey((prevKey) => prevKey + 1);
        setCurrentPage(1)
    };

    const handleSkillFilter = (ev) => {
        console.log(ev)
        localStorage.setItem('skill_filter', ev.value)
        if (localStorage.getItem('module_filter') === 'IELTS' || localStorage.getItem('module_filter') === 'TOEFL' || localStorage.getItem('module_filter') === 'TOEIC') {
            filteredEx = exercises
                .filter(ex => ex.skill == localStorage.getItem('skill_filter'))
                .filter(ex => ex.module == localStorage.getItem('module_filter'))
        }
        else {
            filteredEx = exercises
                .filter(ex => ex.skill == localStorage.getItem('skill_filter'))
        }
        setLength(filteredEx.length)
        currentEx2 = filteredEx.slice((1 - 1) * exPerPage, 1 * exPerPage);
        //setCurrentPage(1)
        setCurrentEx(currentEx2)
    }

    const handleModuleFilter = (ev) => {
        console.log(ev)
        localStorage.setItem('module_filter', ev.value)

        if (localStorage.getItem('skill_filter') === 'Listening' || localStorage.getItem('skill_filter') === 'Speaking' || localStorage.getItem('skill_filter') === 'Reading' || localStorage.getItem('skill_filter') === 'Writing') {
            filteredEx = exercises
                .filter(ex => ex.skill == localStorage.getItem('skill_filter'))
                .filter(ex => ex.module == localStorage.getItem('module_filter'))
        }
        else {
            filteredEx = exercises
                .filter(ex => ex.skill == localStorage.getItem('module_filter'))
        }
        setLength(filteredEx.length)
        currentEx2 = filteredEx.slice((1 - 1) * exPerPage, 1 * exPerPage);
        //setCurrentPage(1)
        setCurrentEx(currentEx2)
    }

    async function handleDelete(ev: SyntheticEvent) {
        ev.preventDefault()
        const response = await fetch('/api/exercise', {
            method: 'POST',
            body: JSON.stringify({ ex_id: delete_ex, method: 'delete' }),
            headers: { 'Content-Type': 'application/json' },
        })
        window.location.reload(true);
    }

    useEffect(() => {
        localStorage.setItem('sidebar', 1)
        localStorage.setItem('module_filter', '')
        localStorage.setItem('skill_filter', '')

        fetch('/api/exercise')
            .then(res => res.json())
            .then(data => {
                setExercises(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        fetch('/api/exercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("userName"), method: 'getDoneList' }),
        })
            .then(res => res.json())
            .then(data => {
                setExerciseList(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, []);
    const handleChangeModule = (ev) => {
        setModule(ev.value);
    };

    const handleChangeSkill = (ev) => {
        setSkill(ev.value);
    };


    const handleActionClick = (link) => {
        router.push(link);
    };



    const [currentPage1, setCurrentPage1] = useState(1);
    const exercisesPerPage1 = 3; // Adjust as needed
    const currentExercises1 = exerciseList.slice((currentPage1 - 1) * exercisesPerPage1, currentPage1 * exercisesPerPage1);

    const actions = [
        { icon: <Ieye />, name: "View Exercise", link: '/ex_in_exbank' },
        { icon: <IfileDelete />, name: "Delete Exercise" },
    ];

    const popupRef = useRef();

    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3 pb-12">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black">
                        Exercises Bank
                    </div>
                    <div className="bg-white rounded pb-3">
                        <div className="flex gap-32 justify-center px-11 py-7">
                            <Select key={`module-select-${resetKey}`}
                                options={optionModule}
                                onChange={handleChangeModule}
                                className="w-1/4 text-center border-2 border-zinc-300 rounded-md" placeholder="Module" />
                            <Select key={`skill-select-${resetKey}`}
                                options={optionSkill}
                                onChange={handleChangeSkill}
                                className="w-1/4 text-center border-2 border-zinc-300 rounded-md" placeholder="Skill" />
                        </div>

                        <div className="mt-16 flex items-center ml-9 gap-2">
                            <button onClick={handleChangeRemoveF}
                                className="text-red-700 rounded-lg text-base font-medium border-2 border-red-600 px-4 py-[2px]
                             hover:bg-red-200 transition-colors duration-300">
                                Remove filter
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pl-4 pt-3">
                        <div className="flex items-center gap-4">
                            {localStorage.getItem('userType') === 'Student' ?
                                <button
                                    onClick={() => handleButtonClick(1)}
                                    className={`hover:bg-sky-500 text-black hover:text-white text-base font-medium px-4 py-2 
                                    rounded-lg border border-zinc-300 transition-colors duration-300 ${selectedButton === 1 ? 'bg-sky-500' : 'bg-white'}`}>
                                    All
                                </button> : null}
                            {localStorage.getItem('userType') === 'Student' ?
                                <button
                                    onClick={() => handleButtonClick(2)}
                                    className={`hover:bg-sky-500 text-black hover:text-white text-base font-medium px-4 py-2
                                    rounded-lg border border-zinc-300 transition-colors duration-300 ${selectedButton === 2 ? 'bg-sky-500' : 'bg-white'}`}>
                                    Your Exercises
                                </button> : null}
                        </div>
                        {localStorage.getItem('userType') === 'Teacher' ?
                            <Link href={'./exbank_add'}>
                                <button className="bg-lime-300 hover:bg-lime-400 px-4 py-2 text-black text-base font-medium rounded-lg leading-tight tracking-tight mr-4">
                                    Add Exercise
                                </button>
                            </Link> : null}
                    </div>

                    <div className="mt-4 -mr-3">
                        {
                            (selectedButton === 2 ?
                                <div>
                                    <div className="grid grid-cols-3">
                                        {currentEx.map(exercise => (
                                            ((((exercise.module == module || module == '') && (exercise.skill == skill || skill == ''))) &&
                                                <div className="inline-block bg-white mr-4 pl-10 pr-10 py-4 mb-4 rounded-xl">
                                                    <div className="font-semibold mb-4 h-[48px]">
                                                        {exercise.title}
                                                    </div>
                                                    <div className="flex text-gray-400 text-sm font-medium pb-3 border-b-2 border-gray-400">
                                                        <div className="p-2 border-2 border-gray-300 rounded-lg mr-10">
                                                            {exercise.module}
                                                        </div>
                                                        <div className="p-2 border-2 border-gray-300 rounded-lg">
                                                            {exercise.skill}
                                                        </div>
                                                    </div>
                                                    <Link onClick={() => localStorage.setItem('exerciseID', exercise._id)}
                                                        href='/ex_in_exbank'
                                                        className="flex p-2 mt-3 w-full items-center gap-4 border-2 bg-gray-300 rounded-lg hover:bg-gray-50
                                                        transition-colors duration-300">
                                                        <Ieye className="fill-blue-400 w-6" />
                                                        <div className="text-blue-400">View Exercise</div>
                                                    </Link>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                    <div className="flex justify-center">
                                        <Pagination
                                            count={Math.ceil(exerciseList.length / exercisesPerPage1)}
                                            shape="rounded"
                                            onChange={(event, newPage) => setCurrentPage1(newPage)}
                                            className=""
                                            color="primary"
                                        />
                                    </div>
                                </div> :
                                ((localStorage.getItem('module_filter') === 'IELTS') || (localStorage.getItem('module_filter') === 'TOEFL') || (localStorage.getItem('module_filter') === 'TOEIC') || (localStorage.getItem('skill_filter') === 'Listening') || (localStorage.getItem('skill_filter') === 'Speaking') || (localStorage.getItem('skill_filter') === 'Writing') || (localStorage.getItem('skill_filter') === 'Reading')) ?
                                    <div>
                                        <div className="grid grid-cols-3">
                                            {currentEx3.map((exercise) => (
                                                <div className="inline-block bg-white mr-4 pl-10 pr-10 py-4 mb-4 rounded-xl">
                                                    <div className="font-semibold mb-4 h-[48px]">
                                                        {exercise.title}
                                                    </div>
                                                    <div className="flex text-gray-400 text-sm font-medium pb-3 border-b-2 border-gray-400 ">
                                                        <div className="p-2 border-2 border-gray-300 rounded-lg mr-10">
                                                            {exercise.module}
                                                        </div>
                                                        <div className="p-2 border-2 border-gray-300 rounded-lg">
                                                            {exercise.skill}
                                                        </div>
                                                    </div>
                                                    {localStorage.getItem('userType') !== 'Admin' ?
                                                        <Link onClick={() => localStorage.setItem('exerciseID', exercise._id)}
                                                            href='/ex_in_exbank'
                                                            className="flex p-2 mt-3 w-full items-center gap-4 border-2 bg-gray-300 rounded-lg hover:bg-gray-50
                                                        transition-colors duration-300">
                                                            <Ieye className="fill-blue-400 w-6" />
                                                            <div className="text-blue-400">View Exercise</div>
                                                        </Link>
                                                        :
                                                        <Box sx={{ mt: 1, transform: "translateZ(0px)", flexGrow: 1 }}>
                                                            <SpeedDial
                                                                ariaLabel="SpeedDial basic example"
                                                                sx={{ transform: "translateZ(0px)", flexGrow: 1 }}
                                                                icon={<ItripleBar />}
                                                                direction="right"
                                                            >
                                                                {actions.map((action) => (
                                                                    <SpeedDialAction
                                                                        key={action.name}
                                                                        icon={action.icon}
                                                                        tooltipTitle={action.name}
                                                                        onClick={() => {
                                                                            if (action.name === 'View Exercise') {
                                                                                handleActionClick(action.link)
                                                                            } else {
                                                                                popupRef.current.open();
                                                                            }
                                                                        }}
                                                                        FabProps={{ size: "small" }}
                                                                    />
                                                                ))}
                                                            </SpeedDial>
                                                            <Popup
                                                                ref={popupRef}>
                                                                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-44 bg-gray-200 p-4 border-2 border-gray-500 rounded-lg">
                                                                    <div className="mt-4">
                                                                        <p className="text-center text-lg font-semibold">Do you want to delete permanently ?</p>
                                                                        <div className="flex items-center justify-between mt-10 gap-2 text-lg font-medium">
                                                                            <button className="w-1/2 border-2 border-black bg-lime-400 hover:bg-lime-500 rounded-md py-2" onClick={ev => { delete_ex = exercise._id, handleDelete(ev) }}>
                                                                                Yes
                                                                            </button>

                                                                            <button className="w-1/2 border-2 border-black bg-red-400 hover:bg-red-500 rounded-md py-2"
                                                                                onClick={() => { popupRef.current.close() }}>
                                                                                No
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Popup>
                                                        </Box>}
                                                </div>
                                            )
                                            )}
                                        </div>
                                        <div className="flex justify-center">
                                            <Pagination
                                                count={Math.ceil(exercises.length / exPerPage)}
                                                shape="rounded"
                                                onChange={(event, newPage) => setCurrentPage(newPage)}
                                                className=""
                                                color="primary"
                                            />
                                        </div>
                                    </div> :
                                    <div>
                                        <div className="grid grid-cols-3">
                                            {currentEx.map((exercise) => (
                                                <div className="inline-block bg-white mr-4 pl-10 pr-10 py-4 mb-4 rounded-xl">
                                                    <div className="font-semibold mb-4 h-[48px]">
                                                        {exercise.title}
                                                    </div>
                                                    <div className="flex text-gray-400 text-sm font-medium pb-3 border-b-2 border-gray-400 ">
                                                        <div className="p-2 border-2 border-gray-300 rounded-lg mr-10">
                                                            {exercise.module}
                                                        </div>
                                                        <div className="p-2 border-2 border-gray-300 rounded-lg">
                                                            {exercise.skill}
                                                        </div>
                                                    </div>
                                                    {localStorage.getItem('userType') !== 'Admin' ?
                                                        <Link onClick={() => localStorage.setItem('exerciseID', exercise._id)}
                                                            href='/ex_in_exbank'
                                                            className="flex p-2 mt-3 w-full items-center gap-4 border-2 bg-gray-300 rounded-lg hover:bg-gray-50
                                                     transition-colors duration-300">
                                                            <Ieye className="fill-blue-400 w-6" />
                                                            <div className="text-blue-400">View Exercise</div>
                                                        </Link>
                                                        :
                                                        <Box sx={{ mt: 1, transform: "translateZ(0px)", flexGrow: 1 }}>
                                                            <SpeedDial
                                                                ariaLabel="SpeedDial basic example"
                                                                sx={{ transform: "translateZ(0px)", flexGrow: 1 }}
                                                                icon={<ItripleBar />}
                                                                direction="right"
                                                            >
                                                                {actions.map((action) => (
                                                                    <SpeedDialAction
                                                                        key={action.name}
                                                                        icon={action.icon}
                                                                        tooltipTitle={action.name}
                                                                        onClick={() => {
                                                                            if (action.name === 'View Exercise') {
                                                                                handleActionClick(action.link)
                                                                            } else {
                                                                                popupRef.current.open();
                                                                            }
                                                                        }}
                                                                        FabProps={{ size: "small" }}
                                                                    />
                                                                ))}
                                                            </SpeedDial>
                                                            <Popup
                                                                ref={popupRef}>
                                                                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-44 bg-gray-200 p-4 border-2 border-gray-500 rounded-lg">
                                                                    <div className="mt-4">
                                                                        <p className="text-center text-lg font-semibold">Do you want to delete permanently ?</p>
                                                                        <div className="flex items-center justify-between mt-10 gap-2 text-lg font-medium">
                                                                            <button className="w-1/2 border-2 border-black bg-lime-400 hover:bg-lime-500 rounded-md py-2" onClick={ev => { delete_ex = exercise._id, handleDelete(ev) }}>
                                                                                Yes
                                                                            </button>

                                                                            <button className="w-1/2 border-2 border-black bg-red-400 hover:bg-red-500 rounded-md py-2"
                                                                                onClick={() => { popupRef.current.close() }}>
                                                                                No
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Popup>
                                                        </Box>}
                                                </div>
                                            )
                                            )}
                                        </div>
                                        <div className="flex justify-center">
                                            <Pagination
                                                count={Math.ceil(exercises.length / exPerPage)}
                                                shape="rounded"
                                                onChange={(event, newPage) => setCurrentPage(newPage)}
                                                className=""
                                                color="primary"
                                            />
                                        </div>
                                    </div>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const optionModule = [
    { value: "IELTS", label: "IELTS" },
    { value: "TOEIC", label: "TOEIC" },
    { value: "TOEFL", label: "TOEFL" }
];

const optionSkill = [
    { value: "Speaking", label: "Speaking" },
    { value: "Listening", label: "Listening" },
    { value: "Writing", label: "Writing" },
    { value: "Reading", label: "Reading" }
];