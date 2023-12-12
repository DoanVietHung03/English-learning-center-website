'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import SubjectDropdown from "./subjectDropdown"
import ModuleDropdown from "./moduleDropdown"
import SkillDropdown from "./skillDropdown"
import Link from "next/link"
import Ieye from "@/components/icons/eye"

export default function Profile() {
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
                        <div className="flex justify-between px-11 py-7">
                            <SubjectDropdown />
                            <ModuleDropdown />
                            <SkillDropdown />
                        </div>

                        <div className="mt-16 flex items-center ml-9 gap-2">
                            <button className="bg-purple-500 rounded-lg text-white text-base font-medium font-['Poppins'] px-6 py-1 hover:bg-purple-400">
                                Sort Data
                            </button>

                            <button className="text-red-700 rounded-lg text-base font-medium font-['Poppins'] border-2 border-red-600 px-4 py-[2px] hover:bg-red-200">
                                Remove filter
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between mt-10">
                        <div className="w-1/3 bg-white rounded-xl border border-zinc-300 px-2 pb-4">
                            <p className="text-center text-black text-base font-semibold font-['Poppins'] mt-4">IELTS Academic Grammar 0 - 2.5 | Tân ngữ</p>
                            <div className="flex items-center justify-between mt-4 border-b border-stone-200 pb-4">
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">IELTS</p>
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">Academic</p>
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">Grammar</p>
                                <p className="rounded-md border-2 border-stone-300 text-center text-stone-300 text-base font-semibold font-['Poppins'] px-1">0 - 2.5</p>
                            </div>

                            <div className="mt-10 ml-4">
                                <Link href={""}>
                                    <button className="flex items-center gap-2 bg-stone-300 rounded-md px-3 py-1 hover:bg-stone-200">
                                        <Ieye className="w-[1em] fill-blue-400"/>
                                        <p className="text-sky-400 text-sm font-medium font-['Poppins']">View Exercise</p>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="w-1/3">

                        </div>

                        <div className="w-1/3">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}    