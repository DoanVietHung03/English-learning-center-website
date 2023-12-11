'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import SubjectDropdown from "./subjectDropdown"
import ModuleDropdown from "./moduleDropdown"
import SkillDropdown from "./skillDropdown"

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

                    <div className="flex justify-between">
                        <div className="w-1/3">

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