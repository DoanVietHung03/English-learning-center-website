/* eslint-disable react/jsx-key */
'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import Ieye from "@/components/icons/eye"
import { ReactElement, useState, useEffect } from "react"
import Select from "react-select";
import * as React from 'react';

export default function Exercise_bank() {
    const [module, setModule] = useState('')
    const [skill, setSkill] = useState('')
    const [content, setContent] = useState<ReactElement | any | null>(null)
    const [exercises, setExercises] = useState([])
    const [exerciseList, setExerciseList] = useState([])
    const [selectedButton, setSelectedButton] = useState<number | null>(null);
    const [emptyFilter, setEmptyfilter] = useState(true)
    const [resetKey, setResetKey] = useState(0);
    const handleButtonClick = (buttonNumber: number) => {
        setSelectedButton(buttonNumber);
    };
    useEffect(() => {
        localStorage.setItem('sidebar', 1)
        fetch('/api/exercisesBank')
            .then(res => res.json())
            .then(data => {
                setExercises(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        fetch('/api/exDone_list' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("userName") }),
        })
        .then(res => res.json())
        .then(data => {
            setExerciseList(data)
            console.log(data)
            //console.log(exercises)
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
    const handleChangeRemoveF = (ev) => {
        setEmptyfilter(true);
        setModule('');
        setSkill('');
        setResetKey((prevKey) => prevKey + 1);
    };

    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />

                <div className="ml-14 w-2/3">
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

                    <div className="flex items-center gap-4 pl-4 pt-3">
                        <button
                            onClick={() => handleButtonClick(1)}
                            className={`bg-white hover:bg-sky-500 text-black hover:text-white text-base font-medium px-4 py-2 
                            rounded-lg border border-zinc-300 transition-colors duration-300 ${selectedButton === 1 ? 'bg-blue-400' : ''}`}>
                            All
                        </button>

                        <button
                            onClick={() => handleButtonClick(2)}
                            className={`bg-white hover:bg-sky-500 text-black hover:text-white text-base font-medium px-4 py-2
                             rounded-lg border border-zinc-300 transition-colors duration-300 ${selectedButton === 2 ? 'bg-blue-400' : ''}`}>
                            Your Exercises
                        </button>
                    </div>

                    <div className="grid grid-cols-3 mt-4">
                        {
                            exercises.map(exercise => (
                                ((((exercise.module == module || module == '') && (exercise.skill == skill || skill == ''))) &&
                                    <div className="inline-block bg-white mr-4 pl-10 pr-10 py-4 mb-4 rounded-xl">
                                        <div className="font-semibold mb-4">
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
                            ))
                        }
                    </div>
                </div>
            </div >
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