'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import ChooseSkillDropdown from "./chooseSkill"

export default function Ass_Reading() {
    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black">
                        Assignments
                    </div>
                    <div className="mt-4 bg-white rounded-lg">
                        <div className="p-2 ml-2 font-poppins text-xs">[INTER_CLASS] aoe - Q.5 ClassRoom IELTS 5.5 6.5 | 25/09/2023 Writing, Speaking, Writing Task 1, Writing Task 2</div>
                    </div>

                    <div className="bg-white mt-2 pb-8 rounded">
                        <div className="mx-11 border-b border-stone-300 pb-2">
                            <div className="grid grid-cols-2">
                                <div className="flex items-center justify-start mt-4">
                                    <button className="rounded-tl rounded-bl border border-stone-300 bg-white hover:bg-blue-300 text-center text-black text-base font-bold font-poppins leading-tight tracking-tight hover:text-white px-[60px] pb-3 pt-[10px]">
                                        Add
                                    </button>
                                    <button className="rounded-tr rounded-br border border-stone-300 bg-white hover:bg-blue-300 text-center text-black text-base font-bold font-poppins leading-tight tracking-tight hover:text-white px-[60px] pb-3 pt-[10px]">
                                        Clone
                                    </button>
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <button className="bg-lime-300 rounded-lg text-center text-black text-base font-poppins leading-tight tracking-tight px-[30px] pb-3 pt-[10px] hover:bg-lime-400">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center bg-zinc-100 rounded-lg border border-neutral-400">
                            <div>
                                <div>
                                    <div>
                                        <p>Choose skill</p>
                                        <ChooseSkillDropdown />
                                    </div>
                                </div>
                            </div>

                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}