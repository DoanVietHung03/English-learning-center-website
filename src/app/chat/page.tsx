import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
export default function Chat() {
    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black pb-2">
                        Chatting
                    </div>
                    <div className="bg-white rounded grid grid-cols-3">

                        <div className="p-5 border-r border-[#DEDADA]">
                            <div className="border-b-2 border-[#DEDADA] pb-4 mt-3">
                                <div className="flex justify-center items-center border rounded border-[#DEDADA] p-2">
                                    <input className="items-center justify-center rounded w-full text-zinc-400 text-xs font-semibold font-poppins" type="text" id="mySearch" oninput="saveMySearch()" placeholder="Search..." />
                                    <button className="ml-4">
                                        <img src="/img/search.svg" alt="" />
                                    </button>
                                </div>
                            </div>

                            <button className="bg-none hover:bg-gray-100 ml-4 mt-6">
                                <div className="flex">
                                    <svg className="avt" xmlns="http://www.w3.org/2000/svg" height="2.5em"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                                    </svg>
                                    <div className="ml-3 items-center">
                                        <div className="text-sm font-semibold font-poppins">
                                            Do Hoang Khanh Duy
                                        </div>

                                        <div className="font-poppins text-zinc-400 text-xs text-left">
                                            Ok beo
                                        </div>
                                    </div>
                                    <div className="font-poppins text-xs font-normal ml-[26px]">
                                        sent
                                    </div>
                                </div>
                            </button>

                            <button className="bg-none hover:bg-gray-100 ml-4 mt-8">
                                <div className="flex">
                                    <svg className="avt" xmlns="http://www.w3.org/2000/svg" height="2.5em"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                                    </svg>
                                    <div className="ml-3 items-center">
                                        <div className="text-sm font-semibold font-poppins text-left">
                                            Dinh Bao Tran
                                        </div>

                                        <div className="font-poppins text-zinc-400 text-xs text-left">
                                            cam on ban nha :3
                                        </div>
                                    </div>
                                    <div className="font-poppins text-xs font-normal ml-16">
                                        sent
                                    </div>
                                </div>
                            </button>

                            <button className="bg-none hover:bg-gray-100 ml-4 mt-8">
                                <div className="flex">
                                    <svg className="avt" xmlns="http://www.w3.org/2000/svg" height="2.5em"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                                    </svg>
                                    <div className="ml-3 items-center">
                                        <div className="text-sm font-semibold font-poppins text-left">
                                            Dinh Thi Thuy Duong
                                        </div>

                                        <div className="font-poppins text-zinc-400 text-xs text-left">
                                            alo alo
                                        </div>
                                    </div>
                                    <div className="font-poppins text-xs font-normal ml-[27px]">
                                        1m ago
                                    </div>
                                </div>
                            </button>

                            <button className="bg-none hover:bg-gray-100 ml-4 mt-8">
                                <div className="flex">
                                    <svg className="avt" xmlns="http://www.w3.org/2000/svg" height="2.5em"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                                    </svg>
                                    <div className="ml-3 items-center">
                                        <div className="text-sm font-semibold font-poppins text-left">
                                            Hung Viet Doan
                                        </div>

                                        <div className="font-poppins text-zinc-400 text-xs text-left">
                                            Thay oi, cho em hoi bai n...
                                        </div>
                                    </div>
                                    <div className="font-poppins text-11 font-normal ml-[18px]">
                                        1m ago
                                    </div>
                                </div>
                            </button>
                        </div>


                        <div className="col-span-2">
                            <div className="p-4 border-b border-[#DEDADA] ml-6 mt-[9px] mr-6">
                                <div className="flex items-center">
                                    <svg className="avt" xmlns="http://www.w3.org/2000/svg" height="2.5em"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                                    </svg>
                                    <p className="ml-4 font-poppins font-semibold">Do Hoang Khanh Duy</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="bg-zinc-300 rounded-2xl border border-zinc-300 mt-4 font-poppins w-1/5 text-sm text-center pt-1 pb-1">
                                    Fri, 17th Nov
                                </div>
                            </div>

                            <div className="flex items-center mt-8 ml-10">
                                <svg className="avt" xmlns="http://www.w3.org/2000/svg" height="2.5em"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                                </svg>
                                <p className="ml-4 p-2 border bg-zinc-100">Good morning bro</p>
                            </div>

                            <div className="justify-end items-end flex mr-6">
                                <div className="flex items-center mt-8">
                                    <p className="mr-4 p-2 border bg-sky-300">Hi, what do you want, beo?</p>
                                    <svg className="avt" xmlns="http://www.w3.org/2000/svg" height="2.5em"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex items-center mt-8 ml-10">
                                <svg className="avt" xmlns="http://www.w3.org/2000/svg" height="2.5em"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                                </svg>
                                <p className="ml-4 p-2 border bg-zinc-100">Hok biec nua, hok co nho</p>
                            </div>

                            <div className="justify-end items-end flex mr-6">
                                <div className="flex items-center mt-8">
                                    <p className="mr-4 p-2 border bg-sky-300">oke</p>
                                    <svg className="avt" xmlns="http://www.w3.org/2000/svg" height="2.5em"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                                    </svg>
                                </div>
                            </div>

                            <div className=" m-4 border border-[#DEDADA] rounded-lg">
                                <input className="w-full focus:outline-none p-4 pb-12" type="text" id="myInput" placeholder="Ấn shift + enter hoặc alt + enter để xuống dòng" />
                                <div className="flex justify-end">
                                    <button className="flex items-center bg-neutral-200 hover:bg-neutral-300 rounded font-poppins text-sm mr-3 mb-2 p-1 text-neutral-500">
                                        Send
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