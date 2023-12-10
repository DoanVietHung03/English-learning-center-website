import Icross from "../icons/icon_cross"
import Imenu from "../icons/icon_menu"
import Ibook1 from "../icons/icon_book1"
import Ibank from "../icons/icon_bank"
import Iflag from "../icons/icon_flag"
import Ichat from "../icons/icon_chat"
import Image from "next/image"
import Link from "next/link"
export default function SideBar() {
    return (
        <div className="w-1/5">
            <div
                className="sideBar flex-col bg-[#68C6E3] mt-16 w-full h-full rounded-tr-3xl rounded-br-3xl transition-all duration-300 ease-in-out">
                <div className="flex icon-closed pt-7 mr-6 justify-end">
                    <Icross className="w-8 h-8 fill-white" />
                </div>

                <div className="flex icon-opened justify-center pt-7 mb-6 hidden">
                    <Imenu className="w-8 h-8 fill-white" />
                </div>

                <div className="logoTxt mb-10 font-montseratt-alt font-bold text-6xl text-center text-white">
                    aoe
                </div>

                <div className="logo flex justify-center mb-7 hidden">
                    <Image width={48} height={48} src="/icon.png" alt="" />
                </div>

                <div className="selection flex flex-col gap-5 ml-3 mr-3">
                    <Link href={'/courseList'}
                        className="flex gap-2 cursor-pointer h-16 pl-9 w-full rounded-xl items-center transition duration-300 ease-in-out hover:bg-gray-400 hover:bg-opacity-40 focus:bg-gray-400 focus:bg-opacity-40 active:bg-gray-400 active:bg-opacity-40">
                        <Ibook1 className="w-8 h-8 fill-white" />
                        <button className="text1 text-sm font-poppins font-semibold text-white">Courses List</button>
                    </Link>
                    <Link href={'/courseList'}
                        className="flex gap-2 cursor-pointer h-16 pl-9 w-full rounded-xl items-center transition duration-300 ease-in-out hover:bg-gray-400 hover:bg-opacity-40 focus:bg-gray-400 focus:bg-opacity-40 active:bg-gray-400 active:bg-opacity-40">
                        <Ibank className="w-8 h-8 fill-white" />
                        <button className="text2 font-poppins font-semibold text-sm text-white">Excerises
                            Bank</button>
                    </Link>
                    <Link href={'/report_bug'}
                        className="flex gap-2 cursor-pointer h-16 pl-9 w-full rounded-xl items-center transition duration-300 ease-in-out hover:bg-gray-400 hover:bg-opacity-40 focus:bg-gray-400 focus:bg-opacity-40 active:bg-gray-400 active:bg-opacity-40">
                        <Iflag className="w-8 h-8 fill-white" />
                        <button className="text3 font-poppins font-semibold text-sm text-white">Feedback and Bug
                            Report</button>
                    </Link>
                    {/* <!-- chatting --> */}
                    <Link href={'/chat'}
                        className="flex gap-2 cursor-pointer h-16 pl-9 w-full rounded-xl items-center transition duration-300 ease-in-out hover:bg-gray-400 hover:bg-opacity-40 focus:bg-gray-400 focus:bg-opacity-40 active:bg-gray-400 active:bg-opacity-40">
                        <Ichat className="w-8 h-8 fill-white" />
                        <button className="text4 font-poppins font-semibold text-sm text-white ml-3">Chat</button>
                    </Link>

                </div>
            </div>
        </div>
    )
}