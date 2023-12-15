'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Iuser from "@/components/icons/icon_user"
import Iimage from "@/components/icons/icon_image"
import Example from "./chat_dropdown"
import { useState, useEffect, SyntheticEvent } from "react"
import * as React from 'react';

export default function Chat() {
    const [receiver, setReceiver] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState('')
    const [sentDate, setDate] = useState(Date.now());
    const [receivers, setReceivers] = useState([]);

    const handleChangeReceiver = (ev) => {
        setReceiver(ev.value);
    };

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        await fetch('/api/message', {
            method: 'POST',
            body: JSON.stringify({receiver, content, sentDate, file}),
            headers: { 'Content-Type': 'application/json' },
        })
    }

    useEffect(() => {
        fetch('api/user')
        .then(res => res.json())
        .then(data => {
            setReceivers(data.receivers)
        })
    }, []);

    const optionReceivers = receivers.map(
        function (receiver) {
            return {
                value: receiver.name
            }
        }
    );

    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black pb-2">
                        Chat
                    </div>
                    <div className="bg-white rounded pb-10">
                        <div className="mt-6 grid grid-cols-2">
                            {/* left side */}
                            <div className="border-r-2 border-black mt-6 ml-9">
                                <div className="text-black text-sm font-semibold">
                                    Chat received
                                </div>

                                <div className="bg-zinc-200 rounded-lg mr-8 mt-3">
                                    <div className="flex items-center pl-7 pt-4">
                                        <Iuser className="w-10 fill-zinc-400 mr-4" />
                                        <p className="text-black text-sm font-semibold font-['Poppins']">Do Hoang Khanh Duy</p>
                                    </div>

                                    <div className="text-stone-400 text-sm font-semibold pl-7 mt-3">
                                        Teacher please answer me this question, it’s so hard that I cannot do it myself, please answer me senpai !!
                                    </div>

                                    <button className="flex items-center pl-7 mt-3 pb-6">
                                        <Iimage className="w-6 mr-2 fill-zinc-500"/>
                                        <p className="text-center text-zinc-400 text-base font-normal leading-tight tracking-tight hover:underline">Click to see image</p>
                                    </button>
                                </div>

                                <div className="mt-3 border-t-2 border-stone-300 pt-3 text-black text-sm font-semibold mr-8">
                                    Chat sent
                                </div>

                                <div className="bg-zinc-200 rounded-lg mr-8 mt-3">
                                    <div className="flex items-center pl-7 pt-4">
                                        <Iuser className="w-10 fill-zinc-400 mr-4" />
                                        <p className="text-black text-sm font-semibold font-['Poppins']">Do Hoang Khanh Duy</p>
                                    </div>

                                    <div className="text-stone-400 text-sm font-semibold pl-7 mt-3">
                                        You need to do it yourself, remember there’s nothing that you cannot do my son. There’s no room for self-doubt.
                                    </div>

                                    <button className="flex items-center pl-7 mt-3 pb-6">
                                        <Iimage className="w-6 mr-2 fill-zinc-500"/>
                                        <p className="text-center text-zinc-400 text-base font-normal leading-tight tracking-tight hover:underline">Click to see image</p>
                                    </button>
                                </div>
                            </div>

                            {/* Right side */}
                            <div className="bg-zinc-100 rounded-lg border border-neutral-400 mt-6 mr-7 ml-8">
                                <div className="mt-12 ml-7">
                                    <p className="text-black text-base font-medium leading-tight tracking-tight">Choose receiver</p>
                                    {/* Dropdown list */}
                                    <Example />
                                </div>

                                <div className="mt-12 ml-6 mr-4">
                                    <p className="text-black text-base font-medium">Content</p>
                                    <textarea className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none mt-2" id="myText" placeholder="Type content..."></textarea>
                                </div>

                                <button className="bg-zinc-300 border border-black px-4 py-1 text-center text-black text-base font-normal leading-tight tracking-tight ml-7 hover:bg-zinc-400">
                                    Choose file
                                </button>

                                <div className="flex mt-[86px] mr-4 justify-end pb-8">
                                    <button className="text-center text-black text-base font-['Poppins'] bg-lime-300 rounded-lg px-3 py-1 hover:bg-lime-400">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}