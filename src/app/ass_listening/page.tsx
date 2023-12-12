'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"

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
                        <div className="p-2 ml-2 font-poppins text-xs">[INTER_CLASSName] aoe - Q.5 ClassNameRoom IELTS 5.5 6.5 | 25/09/2023 Writing, Speaking, Writing Task 1, Writing Task 2</div>
                    </div>

                    <div className="bg-white mt-2 pb-8 rounded">
                        <div className="flex items-center justify-end py-2 border-b border-stone-300 mx-4">
                            <Link href={''}>
                                <button className="flex items-center bg-lime-300 rounded-lg px-3 py-1 font-poppins text-sm">
                                    Submit
                                </button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 mt-4 py-4 mx-4 gap-6">
                            <div className="rounded-lg border border-stone-300 pl-6 py-8 pr-4">

                                <div><span className="text-black text-base font-bold font-['Poppins']">
                                    Questions 21-25<br/>Choose the correct letter, A, B or C.<br/></span><span className="text-black text-base font-normal font-['Poppins']">
                                        Food Waste<br/></span><span className="text-black text-base font-bold font-['Poppins']">21 What point does Robert make about the 2013 study in Britain?<br/></span>
                                        <span className="text-black text-base font-normal font-['Poppins']">A It focused more on packaging than wasted food.<br/>
                                            B It proved that households produced more waste than restaurants.<br/>C It included liquid waste as well as solid waste.<br/>Đáp án C<br/></span>
                                            <span className="text-black text-base font-bold font-['Poppins']">22 The speakers agree that food waste reports should emphasise the connection between carbon dioxide emissions and<br/>
                                            </span><span className="text-black text-base font-normal font-['Poppins']">A food production.<br/>B transport of food to landfill sites.<br/>C distribution of food products.<br/>
                                                Đáp án C | A<br/></span><span className="text-black text-base font-bold font-['Poppins']">23 Television programmes now tend to focus on<br/></span>
                                                <span className="text-black text-base font-normal font-['Poppins']">A the nutritional value of food products.<br/>B the origin of food products.<br/>
                                                    C the chemicals found in food products.<br/>Đáp án B<br/></span><span className="text-black text-base font-bold font-['Poppins']">24 For Anna, the most significant point about food waste is<br/></span>
                                                    <span className="text-black text-base font-normal font-['Poppins']">A the moral aspect.<br/>B the environmental impact.<br/>C the economic effect.</span>
                                </div>
                            </div>
                            <div className="bg-orange-100 bg-opacity-40 rounded-lg shadow-lg border flex-col justify-start items-center inline-flex p-4">
                                <textarea className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none h-96" id="myText" placeholder="Type..."></textarea>
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
        </>
    )
}