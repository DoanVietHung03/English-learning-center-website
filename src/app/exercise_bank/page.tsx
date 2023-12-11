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
                    </div>
                </div>
            </div>
        </>
    )
}    