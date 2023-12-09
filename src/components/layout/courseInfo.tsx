import Ibuilding from "../icons/icon_building"
import Icalendar from "../icons/icon_cal"
import Imenu from "../icons/icon_menu"
import Itarget from "../icons/icon_target"
import Link from "next/link"
export default function CourseInfo() {
    return (
        <div className="w-full h-36 p-8 rounded-xl bg-white">
            <div className="flex w-full mb-4">
                <Link href={'/course_Time'}
                    className="flex justify-start font-poppins w-[840px] cursor-pointer text-blue-500 font-semibold text-xs hover:underline">
                    [PAYG] AOE - D5 IELTS 5.5 7.5 | 25/9/2023 Writing, Speaking, Writing task 1,
                    Writing task 2
                </Link>
                <div className="flex bg-red-200 px-4 py-1 items-center text-sm text-red-600 font-bold rounded-lg">
                    Finished
                </div>
            </div>
            <div className="flex text-11 gap-4 mt-6">
                <div className="flex items-center gap-2">
                    <Ibuilding className="w-3" />
                    <p className="font-poppins text-xs">AOE - D5</p>
                </div>
                <div className="flex items-center gap-2">
                    <Itarget className="w-3" />
                    <p className="font-poppins text-xs">room</p>
                </div>
                <div className="flex items-center gap-2">
                    <Imenu className="w-3" />
                    <p className="font-poppins text-xs">Ielts</p>
                </div>
                <div className="flex items-center gap-2">
                    <Icalendar className="w-4" />
                    <p className="font-poppins text-xs">25/9/23 → 27/10/23</p>
                </div>
            </div>
        </div>
    )
}