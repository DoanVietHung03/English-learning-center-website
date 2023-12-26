'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function ExBank() {    
    const [exercise, setExercise] = useState([])
    const [progress, setProgress] = useState([])

    useEffect(() => {
        fetch('/api/exercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("exerciseID") }),
        })
            .then(response => response.json())
            .then(data => {
                setExercise(data)
                console.log(data)
                console.log(exercise)
            })
            .catch(error => console.error('Error:', error));
        fetch('/api/exercise_progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("userName"), ex_id: localStorage.getItem("exerciseID")}),
        })
            .then(response => response.json())
            .then(data => {
                setProgress(data)
                if(data !== null){
                    localStorage.setItem('saved', 'already')
                }
                else{
                    localStorage.setItem('saved', 'new')
                }
                console.log(data)
            })
            .catch(error => console.error('Error:', error));
    }, []);

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        const response = await fetch('/api/save_progress', {
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem('userName'), ex_id: localStorage.getItem("exerciseID"), status: localStorage.getItem('saved'), progress}),
            headers: { 'Content-Type': 'application/json' },
        })
    }
    
    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black">
                        Exercises Bank
                    </div>
                    <div className="flex mt-4 bg-white rounded-lg">
                        <div className="p-2 ml-2 text-black text-base font-semibold font-['Poppins']">
                            {exercise.title}
                        </div>
                        <div className="p-2 ml-2 text-black text-base font-semibold font-['Poppins']">
                            Module {' '} {exercise.module}
                        </div>
                        <div className="p-2 ml-2 text-black text-base font-semibold font-['Poppins']">
                            Skill {' '} {exercise.skill}
                        </div>
                    </div>

                    <div className="bg-white mt-2 pb-8 rounded">
                        <div className="flex items-center justify-end py-2 border-b border-stone-300 mx-4">
                            <Link href={''}>
                                <button className="flex items-center bg-lime-300 rounded-lg px-3 py-1 font-poppins text-sm">
                                    Save your progress
                                </button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 mt-4 py-4 mx-4 gap-6">
                            <div className="rounded-lg border border-stone-300 pl-6 py-8 pr-4 overflow-y-scroll h-[450px]">
                                {/* <span className="text-black text-base font-normal font-['Poppins']">Tân ngữ là các danh từ hoặc đại từ đứng sau và bổ nghĩa cho động từ hoặc giới từ. Tân ngữ thường trả lời cho các câu hỏi như “what” (cái gì), “where” (ở đâu) và “when” (khi nào). Ngoài danh từ, bất cứ cụm từ nào có chức năng như một danh từ, chẳng hạn cụm danh từ, mệnh đề danh từ, danh động từ và Infinitives (động từ nguyên mẫu có to), đều có thể làm tân ngữ.<br />Các loại tân ngữ:<br />Tân ngữ trực tiếp (Direct object): Tân ngữ trực tiếp là tân ngữ nhận tác động trực tiếp của động từ trong câu. Đối với các động từ chỉ có một tân ngữ theo sau thì tân ngữ đó chính là tân ngữ trực tiếp.<br />Tân ngữ gián tiếp (Indirect object): Tân ngữ gián tiếp là tân ngữ nhận tác động của động từ một cách gián tiếp, nghĩa là phải thông qua một đối tượng trực tiếp nhận hành động trước đó. Tân ngữ gián tiếp thường là đối tượng được hành động hướng tới thông qua tân ngữ trực tiếp<br /></span>
                                <span className="text-black text-base font-normal font-['Poppins']">Xác định tân ngữ trực tiếp và gián tiếp (nếu có) trong các câu dưới đây<br /></span>
                                <span className="text-black text-base font-normal font-['Poppins']">She gave them a present for their birthday.<br />They invited us to their party<br />I like playing soccer with my friends.<br />She enjoys listening to music in her free time.<br />The teacher gave us a homework assignment to complete.<br />My parents bought me a colorful backpack for school.<br />She asked me when the school bus would arrive.</span> */}
                                <span className="text-black text-base font-normal">
                                    {exercise.content}
                                </span>
                            </div>

                            <div className="bg-orange-100 bg-opacity-40 rounded-lg shadow-lg border flex-col items-center inline-flex p-4">
                                <textarea className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none h-96" id="myText" placeholder="Type..."></textarea>

                                <div className="w-full flex items-center mr-12 mt-10 justify-end">
                                    <button
                                        className="rounded-md bg-lime-200 hover:bg-lime-300 px-3 py-1 font-medium leading-tight tracking-tight">
                                        View result
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