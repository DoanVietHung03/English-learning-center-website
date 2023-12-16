'use client'

import Iuser from '../icons/icon_user'
import Link from 'next/link'
import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index'

export default function Header() {
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
                    <Popup trigger={<button><Iuser /></button>} position={"bottom right"}>
                        <div className='w-[18em] rounded-2xl border border-stone-400 bg-white pb-4'>
                            <div className='flex items-center justify-center mt-4'>
                                <Iuser className='w-[4.5em] fill-[#717171]' />
                            </div>
                            <p className='relative text-center mt-2 text-black text-lg font-semibold'>Duong Tran Duy Hung</p>
                            <p className='relative text-center mt-1 text-stone-400 text-base font-semibold'>(Student)</p>
                            <Link href={"/setting_profile"}>
                                <p className='text-center text-black text-lg font-semibold mt-6 pt-4 mb-4 border-t border-zinc-400 mx-8 hover:text-gray-400'>Setting</p>
                            </Link>
                            <p className='text-center text-black text-lg font-semibold hover:text-gray-400'>Sign out</p>
                        </div>
                    </Popup>
                </div>
            </div>
        </header>)
}