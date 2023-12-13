import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import Icalendar from "@/components/icons/icon_cal"
import Ibook from "@/components/icons/icon_book"

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
                    <div className="bg-sky-100 mt-2">
                        <div className="ml-6">
                            <div className="flex items-center p-4">
                                <button className="flex items-center justify-center border border-stone-300 bg-blue-300 p-2 rounded-lg">
                                    <Icalendar />
                                    <p className="ml-2">Timetable</p>
                                </button>
                                <button className="flex items-center justify-center bg-zinc-100 border border-stone-300 hover:bg-blue-300 p-2 rounded-lg ml-8">
                                    <Ibook />
                                    <Link href={'/assignments'} className="ml-2">Assignments</Link>
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

                                <div className="bg-white">
                                    <Link href={"/attendance_list"}>
                                        <div className="m-3 font-poppins font-semibold hover:underline">
                                            IELTS Speaking
                                        </div>
                                    </Link>
                                    <div className="font-poppins font-normal ml-3 text-sm">
                                        GV: Danh Khuy
                                    </div>
                                    <div className="font-poppins font-normal ml-3 text-sm">
                                        Room: C-23
                                    </div>
                                </div>

                                <div className="bg-white w-2/3 items-center flex">
                                    <button className="bg-sky-400 hover:bg-sky-300 rounded-xl border border-stone-300 px-4 py-1">
                                        <p className="text-white text-xs font-bold font-['Poppins']">+ Create Attendance List</p>
                                    </button>
                                </div>
                               
                            </div>

                            <div className="grid grid-cols-3 p-4">
                                <div className="bg-stone-200">
                                    <div className="font-bold font-poppins m-3 text-blue-400">
                                        OFFLINE
                                    </div>
                                    <div className="font-poppins font-normal ml-3 text-sm">
                                        1/10/2023
                                    </div>
                                    <div className="font-bold font-poppins ml-3 m-1 text-sm">
                                        23:00 - 2:00
                                    </div>
                                </div>

                                <div className="bg-white">
                                    <Link href={"/attendance_list"}>
                                        <div className="m-3 font-poppins font-semibold hover:underline">
                                            IELTS Speaking
                                        </div>
                                    </Link>
                                    <div className="font-poppins font-normal ml-3 text-sm">
                                        GV: Danh Khuy
                                    </div>
                                    <div className="font-poppins font-normal ml-3 text-sm">
                                        Room: C-23
                                    </div>
                                </div>

                                <div className="bg-white w-2/3 items-center flex">
                                    <button className="bg-sky-400 hover:bg-sky-300 rounded-xl border border-stone-300 px-4 py-1">
                                        <p className="text-white text-xs font-bold font-['Poppins']">+ Create Attendance List</p>
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