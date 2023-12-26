"use client"

import Link from "next/link"
import React, { useState, useEffect, ReactElement } from "react"
import IarrowLeft from "../icons/icon_arrow_left"
import dynamic from "next/dynamic"
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";

export default function SideBar() {
    const type = localStorage.getItem('userType')
    const [open, setOpen] = useState(true);

    const IconBook1 = dynamic(() => import('../icons/icon_book1'));
    const IconBank = dynamic(() => import('../icons/icon_bank'));
    const IconFlag = dynamic(() => import('../icons/icon_flag'));
    const IconChat = dynamic(() => import('../icons/icon_chat'));
    const IconUser = dynamic(() => import('../icons/icon_user'));

    const Menus = [
        { title: 'Course List', src: <IconBook1 className="w-8 fill-white" /> },
        { title: 'Exercise Bank', src: <IconBank className="w-8 fill-white" /> },
        { title: 'Bug Report', src: <IconFlag className="w-8 fill-white" /> },
        { title: 'Chat', src: <IconChat className="w-8 fill-white" /> },
        { title: 'User Management', src: <IconUser className="w-8 fill-white" /> },
      ];

    const paths = ["/courseList", "/exercise_bank", "/report_bug", "/chat", "/user_management"]


    return (
        <div className="flex bg-[#8edaf1] rounded-tr-3xl rounded-br-3xl mt-16 h-fit pb-8">
            <div className={` ${open ? "w-72" : "w-24 "} p-6 pt-8 relative duration-300`}>
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
                <ul className="-pt-2">
                    {Menus.slice(0, 4).map((Menu, index) => (
                        <Link key={index} href={index < 3 ? paths[index] : (type === 'Admin' ? "/user_management" : "/chat")}>
                            <li
                                className={`w-full mt-6 p-2 flex cursor-pointer rounded-lg text-white font-bold text-base items-center gap-x-4 hover:bg-sky-400 transition-colors 
                                            ${localStorage.getItem('sidebar') == index ? "bg-sky-400" : ""}`}>
                                {!open ? 
                                <div>
                                    <Tooltip disableFocusListener disableTouchListener title={index < 3 ? Menu.title : (type !== 'Admin' ? Menus[3].title : Menus[4].title)}>
                                        <Grid item>
                                            {index < 3 ? (Menu.src) : (type !== 'Admin' ? <IconChat className="w-8 fill-white"/> : <IconUser className="w-8 fill-white"/>)}
                                       </Grid>
                                    </Tooltip>   
                                </div> : 
                                <div>{index < 3 ? (Menu.src) : (type !== 'Admin' ? <IconChat className="w-8 fill-white"/> : <IconUser className="w-8 fill-white"/>)}</div>}
                                
                                <div className={`${!open && "hidden"} origin-left duration-200 ml-4`}>
                                    {index < 3 ? Menu.title : (type !== 'Admin' ? Menus[3].title : Menus[4].title)}
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}