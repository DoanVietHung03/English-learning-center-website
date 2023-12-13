import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import Icalendar from "@/components/icons/icon_cal"
import Ibook from "@/components/icons/icon_book"
import Ixmark from "@/components/icons/icon_xmark"

export default function CourseTime() {
    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black">
                        Courses List
                    </div>
                    <div className="mt-4 bg-white rounded-lg">
                        <div className="p-2 ml-2 font-poppins text-xs">[INTER_CLASSName] aoe - Q.5 ClassNameRoom IELTS 5.5 6.5 | 25/09/2023 Writing, Speaking, Writing Task 1, Writing Task 2</div>
                    </div>
                    <div className="bg-sky-100 mt-2 pb-12">
                        <div className="ml-6">
                            <div className="flex items-center p-4">
                                <button className="flex items-center justify-center border border-stone-300 bg-blue-300 p-2 rounded-lg">
                                    <Icalendar />
                                    <p className="ml-2">Timetable</p>
                                </button>
                                <button className="flex items-center justify-center bg-zinc-100 border border-stone-300 hover:bg-blue-300 p-2 rounded-lg ml-8">
                                    <Ibook />
                                    <Link href={'/assignments'} className="ml-2">
                                        Assignments
                                    </Link>
                                </button>
                            </div>

                            <div className="p-4">
                                <div className=" font-poppins text-blue-500 bg-blue-200 border inline-block p-1 text-sm">
                                    Overall: 24 sessions
                                </div>
                            </div>

                            <div className="grid grid-cols-3 p-4">
                                <div className="bg-stone-200">
                                    <div className="font-bold font-poppins m-3 text-blue-400">
                                        OFFLINE
                                    </div>
                                    <div className="font-poppins font-normal ml-3 text-sm">
                                        29/9/2023
                                    </div>
                                    <div className="font-bold font-poppins ml-3 m-1 text-sm">
                                        23:00 - 2:00
                                    </div>
                                </div>

                                <div className="bg-white col-span-2 w-3/4">
                                    <div className="m-3 font-poppins font-semibold">
                                        IELTS Speaking
                                    </div>
                                    <div className="font-poppins font-normal ml-3 text-sm">
                                        GV: Danh Khuy
                                    </div>
                                    <div className="font-poppins font-normal ml-3 text-sm">
                                        Room: C-23
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-black text-3xl font-bold ml-4">Attendance List</p>
                            </div>

                            <div className="mt-8 mx-4 rounded-xl bg-white grid grid-cols-2">
                                <div className="my-4 border-r border-black w-full">
                                    <div className="flex items-center justify-center">
                                        <div className=" flex gap-10 px-3 py-1 bg-zinc-300 rounded-lg">
                                            <p className="text-black text-sm font-semibold leading-tight tracking-tight">0789169838 - Do Hoang Khanh Duy</p>
                                            <button>
                                                <Ixmark />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center mt-3">
                                        <div className=" flex gap-10 px-3 py-1 bg-zinc-300 rounded-lg">
                                            <p className="text-black text-sm font-semibold leading-tight tracking-tight">0789169838 - Do Hoang Khanh Duy</p>
                                            <button>
                                                <Ixmark />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center mt-3">
                                        <div className=" flex gap-10 px-3 py-1 bg-zinc-300 rounded-lg">
                                            <p className="text-black text-sm font-semibold leading-tight tracking-tight">0789169838 - Do Hoang Khanh Duy</p>
                                            <button>
                                                <Ixmark />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-4 w-full">
                                    <div className="flex items-center justify-center">
                                        <div className=" flex gap-10 px-3 py-1 bg-zinc-300 rounded-lg">
                                            <p className="text-black text-sm font-semibold leading-tight tracking-tight">0789169838 - Do Hoang Khanh Duy</p>
                                            <button>
                                                <Ixmark />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center mt-3">
                                        <div className=" flex gap-10 px-3 py-1 bg-zinc-300 rounded-lg">
                                            <p className="text-black text-sm font-semibold leading-tight tracking-tight">0789169838 - Do Hoang Khanh Duy</p>
                                            <button>
                                                <Ixmark />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center mt-3">
                                        <div className=" flex gap-10 px-3 py-1 bg-zinc-300 rounded-lg">
                                            <p className="text-black text-sm font-semibold leading-tight tracking-tight">0789169838 - Do Hoang Khanh Duy</p>
                                            <button>
                                                <Ixmark />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end mr-4 mt-10">
                                <button className="rounded-md px-4 py-2 bg-lime-300 hover:bg-lime-400 text-black text-base font-medium leading-3 tracking-tight">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}