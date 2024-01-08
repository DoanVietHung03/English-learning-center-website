/* eslint-disable @next/next/no-img-element */
'use client'

import Iuser from '../icons/icon_user'
import Link from 'next/link'
import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index'
import { SyntheticEvent, useState, useEffect } from "react"


export default function Header() {
    const name = localStorage.getItem('userFname')
    const type = localStorage.getItem('userType')
    const [avatar, setAvatar] = useState('')


    useEffect(() => {
        localStorage.setItem('sidebar', 0)

        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: localStorage.getItem("userName"), method: 'getInfo' }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.avatar);
                setAvatar(data.avatar)
            })
            .catch(error => console.error('Error:', error));
    }, []);


    return (
        <header>
            <div className='bg-white flex justify-between px-3 py-3 items-center'>
                <Link href={'/courseList'}>
                    <div className='ml-3 flex items-center gap-4'>
                        <div>
                            <img className='w-24 h-24' src="/icon.png" alt="" />
                        </div>
                        <h1 className='font-bold text-5xl text-primary'>Academy Of English</h1>
                    </div>
                </Link>
                <div className='mr-2'>
                    <Popup trigger={<button>
                        {((avatar === null) || (avatar === undefined) || (avatar === '')) ?
                            <Iuser className='w-[4.5em] fill-[#717171]' /> :
                            <img
                                className="w-[4.5em] rounded-full border-2 border-black"
                                src={avatar}
                                alt="" />}
                    </button>} position={"bottom right"}>
                        <div className='w-[18em] rounded-2xl border border-stone-400 bg-white pb-4'>
                            <div className='flex items-center justify-center mt-4'>
                                {((avatar === null) || (avatar === undefined) || (avatar === '')) ?
                                    <Iuser className='w-[4.5em] fill-[#717171]' /> :
                                    <img
                                        className="w-[4.5em] rounded-full border-2 border-black"
                                        src={avatar}
                                        alt="" />}
                            </div>
                            <p className='relative text-center mt-2 text-black text-lg font-semibold break-words px-4'>{name}</p>
                            <p className='relative text-center mt-1 text-stone-400 text-base font-semibold'>({type})</p>
                            <Link href={"/setting_profile"}>
                                <p className='text-center text-black text-lg font-semibold mt-6 pt-4 mb-4 border-t border-zinc-400 mx-8 hover:text-gray-400'>Setting</p>
                            </Link>
                            <Link href={"/"}>
                                <p className='text-center text-black text-lg font-semibold hover:text-gray-400'>Sign out</p>
                            </Link>
                        </div>
                    </Popup>
                </div>
            </div>
        </header>)
}