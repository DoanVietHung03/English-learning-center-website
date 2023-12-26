'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ExBank() {
    const [exercise, setExercise] = useState([])
    const [ex_progress, setExProgress] = useState([])
    const [progress, setProgress] = useState('')
    const router = useRouter()
    var progress1

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
                //console.log(data)
            })
            .catch(error => console.error('Error:', error));
        fetch('/api/exercise_progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("userName"), ex_id: localStorage.getItem("exerciseID") }),
        })
            .then(response => response.json())
            .then(data => {
                
                console.log(data)

                if (data.length !== 0) {
                    localStorage.setItem('saved', 'already')
                    localStorage.setItem('progress', data) 
                    setExProgress(data)
                }
                else {
                    localStorage.setItem('saved', 'new')
                    localStorage.removeItem('progress') 
                }

            })
            .catch(error => console.error('Error:', error));
            
    }, []);

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        //console.log(ex_progress);

        // var lastProgress
        // if (localStorage.getItem('saved') === 'already') {
        //     lastProgress = ex_progress + progress
        // }
        // else {
        //     lastProgress = progress
        // }
        const response = await fetch('/api/save_progress', {
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem('userName'), ex_id: localStorage.getItem("exerciseID"), status: localStorage.getItem('saved'), progress: progress }),
            headers: { 'Content-Type': 'application/json' },
        })
        router.push('/exercise_bank')
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
                                <button className="flex items-center bg-lime-300 rounded-lg px-3 py-1 font-poppins text-sm"
                                    onClick={handleFormSubmit}>
                                    Save your progress
                                </button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 mt-4 py-4 mx-4 gap-6">
                            <div className="rounded-lg border border-stone-300 pl-6 py-8 pr-4 overflow-y-scroll h-[450px]">
                                <span className="text-black text-base font-normal">
                                    {exercise.content}
                                </span>
                            </div>
                            {localStorage.getItem('saved') === 'already' ?
                                ex_progress.map((exercise, index) => (
                                <div key={index} className="bg-orange-100 bg-opacity-40 rounded-lg shadow-lg border flex-col items-center inline-flex p-4">
                                    <textarea onChange={(ev) => { setProgress(ev.target.value) }} className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none h-96" id="myText" placeholder="Type...">{exercise.progress}</textarea>
                                    <div className="w-full flex items-center mr-12 mt-10 justify-end">
                                        <button
                                            className="rounded-md bg-lime-200 hover:bg-lime-300 px-3 py-1 font-medium leading-tight tracking-tight">
                                            View result
                                        </button>
                                    </div>
                                </div>)) :
                                <div className="bg-orange-100 bg-opacity-40 rounded-lg shadow-lg border flex-col items-center inline-flex p-4">
                                    <textarea onChange={(ev) => { setProgress(ev.target.value) }} className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none h-96" id="myText" placeholder="Type..."></textarea>
                                    <div className="w-full flex items-center mr-12 mt-10 justify-end">
                                        <button
                                            className="rounded-md bg-lime-200 hover:bg-lime-300 px-3 py-1 font-medium leading-tight tracking-tight">
                                            View result
                                        </button>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function typeOf(ex_progress: string): any {
    throw new Error("Function not implemented.")
}
