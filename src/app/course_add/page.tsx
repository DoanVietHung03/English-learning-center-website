'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Select from "react-select";
import Iplus from "@/components/icons/icon_plus";
import Link from "next/link"
import { useState } from "react"

export default function Course_Add() {
    const [title, setTitle] = useState('')
    const [module, setModule] = useState('')
    const [teacher, setTeacher] = useState('')
    const [sDate, setSDate] = useState('')
    const [cDate, setCDate] = useState('')
    const [student, setStudent] = useState('')
    const handleChangeModule = (ev) => {
        setModule(ev.value);
    };
    const handleChangeTeacher = (ev) => {
        setTeacher(ev.value);
    };
    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="flex justify-between mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black pb-2">
                        <div>
                            Create Course
                        </div>
                        <button className="gap-2 flex items-center justify-end bg-lime-300 rounded-lg text-center text-black text-base font-poppins leading-tight tracking-tight hover:bg-lime-400 px-4">
                            <Iplus />
                            <p className="flex items-center">Create</p> 
                        </button>
                    </div> 

                    <div className="bg-white mt-2 rounded">
                        <div className="ml-6">
                            <div className="flex items-center gap-20 pt-8">
                                <div className=" ml-5 w-2/3">
                                    <div className="mb-2">Course Name</div>
                                    <input className="w-full h-[34px] px-2 py-2 mt-3 rounded-md border border-zinc-300 focus:outline-none " type="text" id="myTitle" placeholder="Type name of the course" />
                                </div>                           
                            </div>


                            <div className="flex flex-col w-1/2 mt-3 mr-3 gap-3">
                                <div className="h-96 items-center text-black text-base font-normal leading-tight tracking-tight">
                                    <p>Choose a module</p>
                                        <Select options={optionModule} onChange={handleChangeModule} className="w-1/3" />
                                </div>
                            </div>
                            
                            <div className="flex flex-col w-1/2 mt-3 mr-3 gap-3">
                                <div className="h-96 items-center text-black text-base font-normal leading-tight tracking-tight">
                                    <p>Choose a teacher</p>
                                    <Select options={optionModule} onChange={handleChangeTeacher} className="w-1/3" />
                                </div>
                            </div>
                           

                        </div>
                    </div>






                </div>
            </div>
        </>
    )
}

const optionModule = [
    { value: "IELTS", label: "IELTS" },
    { value: "TOEIC", label: "TOEIC" },
    { value: "TOEFL", label: "TOEFL" },
];

const optionTeacher = [
    { value: "IELTS", label: "IELTS" },
    { value: "TOEIC", label: "TOEIC" },
    { value: "TOEFL", label: "TOEFL" },
];