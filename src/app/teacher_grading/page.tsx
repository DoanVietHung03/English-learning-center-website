'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Imicro from "@/components/icons/microphone";
import Iuser from "@/components/icons/icon_user";
import * as React from 'react';
import { useEffect, useState } from "react";

export default function Ass_Grading() {
    const [submissions, setSubmissions] = useState([])
    const [file, setFile] = useState('');
    function handleChangeImage(ev) {
        setFile(URL.createObjectURL(ev.target.files[0]));
    }
    
    useEffect(() => {
        fetch('/api/submission_list',{
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem('assignment_id') }),
            headers: { 'Content-Type': 'application/json' },
        })
         .then(res => res.json())
         .then(data => {
            setSubmissions(data)
            console.log(data)
         })
         .catch(error => {
             console.error('Error fetching data:', error);
        });
    }, []);

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
                        <div className="p-2 ml-2 font-poppins text-xs">{localStorage.getItem("course_id")}</div>
                    </div>

                    <div className="bg-white mt-2 pb-8 rounded px-7">
                        <div className="bg-white mt-2 pb-8">
                            <div className="flex">
                                <div className="w-1/3 border-r border-zinc-400 mt-4 p-10 items-center">
                                    <div className="flex items-center">
                                        <Iuser className="w-[3em] fill-zinc-300"/>
                                        <p className="text-black text-sm font-semibold font-poppins ml-4">Do Hoang Khanh Duy</p>
                                    </div>

                                    <div className="flex items-center mt-11">
                                        <Iuser className="w-[3em] fill-zinc-300"/>
                                        <p className="text-black text-sm font-semibold font-poppins ml-4">Dinh Thi Thuy Duong</p>
                                    </div>

                                    <div className="flex items-center mt-11">
                                        <Iuser className="w-[3em] fill-zinc-300"/>
                                        <p className="text-black text-sm font-semibold font-poppins ml-4">Dinh Bao Tran</p>
                                    </div>

                                    <div className="flex items-center mt-11">
                                        <Iuser className="w-[3em] fill-zinc-300"/>
                                        <p className="text-black text-sm font-semibold font-poppins ml-4">Duong Tran Duy Hung</p>
                                    </div>

                                    <div className="flex items-center mt-11">
                                        <Iuser className="w-[3em] fill-zinc-300"/>
                                        <p className="text-black text-sm font-semibold font-poppins ml-4">Nguyen Chi Luong</p>
                                    </div>
                                </div>

                                <div className="w-2/3">
                                    <div className="mt-10 ml-[34px] text-black text-sm font-semibold font-poppins mb-2">
                                        <p>Do Hoang Khanh Duy</p>
                                    </div>

                                    <div className="mx-[34px] px-7 py-4 border-t border-b border-stone-300">
                                        <div className="text-black text-base font-normal font-poppins leading-tight tracking-tight">People hold widely differing views on whether intelligence is an inborn quality,
                                            or whether intelligence can be acquired through learning. Although it is true that brilliance is a personality trait inherited from family, I personally support the latter view
                                            for several reasons.<br /><br />On the one hand, it is understandable why some people support the idea of intelligence is inborn. First, advocates of this view might think that
                                            brain power is genetic. For instance, the IQ level of Albert Einstein, one of the most celebrated physicists in the world, was very high. His son also inherited these qualities
                                            and had a very high IQ . Furthermore, there are beliefs that the more folds people have in their brain, the more intelligent they are. This is because the brain will contains more
                                            neurons, which helps people boost learning performance.<br /><br />On the other hand, I would side with those who believe that learning can help people improve their brilliance.
                                            To begin with, people can make themselves intelligent through constant learning. Obviously, there are a lot of people in the world who did not show a high level of IQ during their
                                            childhood but became a highly brainy person . In addition, dedication, working hard and practising can help people acquire it . To give an illustration, a smart student may complete
                                            a complicated task very quickly, but a dull student can also accomplish the same task by spending hours learning.<br /><br />In conclusion, I would concur with those who believe that
                                            our brilliance could be improved and acquired through learning and our effort.
                                        </div>
                                    </div>

                                    <div className="mt-4 ml-[62px]">
                                        <button className="flex items-center justify-center gap-2 bg-gray-200 rounded-2xl px-6 py-3 hover:bg-gray-300">
                                            <Imicro />
                                            <input type="file" onChange={handleChangeImage} />
                                        </button>
                                    </div>

                                    <div className="mt-4 ml-[62px]">
                                        <p className="text-black text-xl font-semibold font-poppins leading-tight tracking-tight">Type comment</p>
                                    </div>

                                    <div className="mt-4 mx-[62px]">
                                        <textarea className="w-full h-56 border border-zinc-300 pt-3 pl-4 focus:outline-none" id="myComment" placeholder="Type comment..."></textarea>
                                    </div>

                                    <p className="text-black text-xl font-semibold font-poppins leading-tight tracking-tight mt-4 ml-[62px]">Score</p>
                                    <input className="mt-4 ml-[62px] px-[14] py-3 w-[136px] focus:outline-none rounded border border-zinc-300 text-center" type="text" id="myScore" placeholder="Type score" />
                                </div>
                            </div>

                            <div className="flex items-center justify-end mr-6 mt-2">
                                <button className="bg-lime-300 rounded-lg text-center text-black text-base font-normal font-poppins leading-3 tracking-tight px-5 py-2 hover:bg-lime-400">
                                    GRADE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}