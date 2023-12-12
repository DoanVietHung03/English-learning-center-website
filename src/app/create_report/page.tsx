'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import RPtypeDropdown from "./reportType_dropdown"
import Iimage from "@/components/icons/icon_image"
import IfileExport from "@/components/icons/file_export"

export default function create_RP() {
    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black pb-2">
                        Feedback and Bug report
                    </div>

                    <div className="bg-white rounded pb-6">
                        <div className="flex items-center gap-24 pt-12">
                            <div className=" ml-14 w-1/3">
                                <p className="text-black text-base font-medium leading-tight tracking-tight">Title of report (*)</p>
                                <input className="w-full h-[34px] px-3 py-2 mt-3 rounded-md border border-zinc-300 focus:outline-none " type="text" id="myTitle" placeholder="Title of the content you wish to report" />
                            </div>

                            <div className="w-1/3">
                                <p className="text-black text-base font-medium leading-tight tracking-tight">Type of report</p>
                                <RPtypeDropdown />
                            </div>
                        </div>

                        <div className="ml-14 h-96 items-center mt-12 mr-12 text-black text-base font-medium leading-tight tracking-tight">
                            <p>Content of report</p>
                            <textarea className="w-full h-[340px] border-2 rounded-md mt-4 pt-2 pl-2 focus:outline-none" id="myContent" placeholder="Type content of the report"></textarea>
                        </div>

                        <button className="flex items-center ml-14 mt-2 gap-2 bg-gray-200 rounded-xl px-3 py-2 hover:bg-gray-300">
                            <Iimage />
                            <p className=" text-zinc-500 text-base leading-tight tracking-tight">Attached image</p>
                        </button>

                        <div className="rounded-md border border-zinc-400 ml-14 mr-12 mt-2 pl-2 py-1">
                            <button className="bg-zinc-300 border border-black text-sm px-5 hover:bg-zinc-400">
                                Choose file
                            </button>
                        </div>

                        <div className="ml-14 mt-16">
                            <button className="flex items-center gap-2 bg-lime-300 rounded-lg px-4 py-1 hover:bg-lime-400">
                                <p className="text-base leading-tight tracking-tight font-medium">Send</p>
                                <IfileExport />
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}