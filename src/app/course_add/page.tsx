'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import { useState } from "react"

export default function Course_Add() {
    const [title, setTitle] = useState('')
    const [module, setModule] = useState('')
    const [teacher, setTeacher] = useState('')
    const [sDate, setSDate] = useState('')
    const [cDate, setCDate] = useState('')
    const [student, setStudent] = useState('')

    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="flex justify-between mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black">
                        <div>
                            Create Course
                        </div>
                        <div className="flex items-center justify-end">
                            <button className="bg-lime-300 rounded-lg text-center text-black text-base font-poppins leading-tight tracking-tight px-[30px] pb-2 pt-[8px] hover:bg-lime-400">
                                Create 
                            </button>
                        </div>
                    </div> 

                    <div className="bg-white mt-2 rounded">
                        <div className="ml-6">
                            <div className="flex items-center gap-20 pt-8">
                                <div className=" ml-5 w-2/3">
                                    <p className="text-black text-base font-medium leading-tight tracking-tight">Course Name</p>
                                    <input className="w-full h-[34px] px-2 py-2 mt-3 rounded-md border border-zinc-300 focus:outline-none " type="text" id="myTitle" placeholder="Type name of the course" />
                                </div>                           
                            </div>


                            <div className="flex items-center gap-20 pt-8 ml-5">
                                <p className="text-black text-base font-medium leading-tight tracking-tight">Choose a module</p>
                                
                            </div>
                        </div>
                    </div>






                </div>
            </div>
        </>
    )
}