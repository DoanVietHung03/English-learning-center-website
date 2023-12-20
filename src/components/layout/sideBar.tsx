"use client"

import Link from "next/link"
import React, { useState } from "react"
import IarrowLeft from "../icons/icon_arrow_left"
import dynamic from "next/dynamic"

export default function SideBar() {
    const type = localStorage.getItem('userType')
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Course List", src: dynamic(() => import("../icons/icon_book1")) },
        { title: "Exercise Bank", src: dynamic(() => import("../icons/icon_bank")) },
        { title: "Feedback and Bug Report", src: dynamic(() => import("../icons/icon_flag")) },
        { title: "Chat", src: dynamic(() => import("../icons/icon_chat")) },
        { title: "User Management", src: dynamic(() => import("../icons/icon_user")) }
    ];
    const paths = ["/courseList", "/exercise_bank", "/report_bug", "chat", "/user_management"]

    return (
        <div className="flex bg-[#68C6E3] rounded-tr-3xl rounded-br-3xl mt-16">
            <div className={` ${open ? "w-72" : "w-24 "} max-h-[500px] p-6 pt-8 relative duration-300`}>
                <button className={`absolute cursor-pointer -right-3 top-9 w-7 ${!open && "rotate-180"}`}
                        onClick={() => setOpen(!open)}>
                    <IarrowLeft className="w-[2em] fill-black bg-sky-200 rounded-full p-2 hover:bg-sky-300"/>
                </button>
                
                <div className="flex gap-x-4 items-center text-center">
                    <img
                        src="./icon.png"
                        className={`w-[5.5em] pt-4 duration-500 ${open && "rotate-[360deg]"}`}
                    />
                    <h1 className={`font-['Montserrat Alternates'] text-white origin-left text-center font-bold text-6xl duration-200 ${!open && "scale-0"}`}>
                        aoe
                    </h1>
                </div>
                <ul className="pt-3">
                    {Menus.slice(0, 4).map((Menu, index) => (
                        <Link key={index} href={index < 3 ? paths[index] : (type === 'Admin' ? "/user_management" : "/chat")}>
                            <li
                                className={`w-full mt-6 p-2 flex cursor-pointer rounded-lg text-white font-bold text-base items-center gap-x-4 hover:bg-sky-300
                                            ${index === 0 && "bg-transparent"}`}>
                            <Menu.src className="w-8 fill-white"/>
                                <span className={`${!open && "hidden"} origin-left duration-200 ml-4`}>
                                    {index < 3 ? Menu.title : (type !== 'Admin' ? Menus[3].title : Menus[4].title)}
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}