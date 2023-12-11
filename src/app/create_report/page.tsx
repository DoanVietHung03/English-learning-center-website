'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import RPtypeDropdown from "./reportType_dropdown"

export default function create_RP() {
    return (
        <>
            <body>
                <Header />
                <div className="flex">
                    <SideBar />
                    <div className="ml-14 w-2/3">
                        <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black pb-2">
                            Feedback and Bug report
                        </div>

                        <div className="bg-white rounded">
                            <div className="flex items-center gap-24 pt-12">
                                <div className=" ml-14 w-1/3">
                                    <p className="text-black text-base font-medium leading-tight tracking-tight">Title of report (*)</p>
                                    <input className="w-full h-[34px] px-3 py-2 mt-3 rounded-md border border-zinc-400 focus:outline-none " type="text" id="myTitle" placeholder="Title of the content you wish to report" />
                                </div>

                                <div className="w-1/3">
                                    <p className="text-black text-base font-medium leading-tight tracking-tight">Type of report</p>
                                    <RPtypeDropdown />
                                </div>
                            </div>

                            <div className="ml-14 items-center mt-12 mr-12 text-black text-base font-medium leading-tight tracking-tight">
                                <p>Content of report</p>
                                <textarea className="w-full border-2 rounded-md mt-4 pt-2 pl-2 focus:outline-none" id="myContent" placeholder="Type content of the report"></textarea>
                            </div>

                        </div>

                    </div>
                </div>
            </body>
        </>
    )
}