'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DateCalendar } from "@mui/x-date-pickers"
import Assigments from "../assignments/page"
import ReactAudioPlayer from "react-audio-player"

export default function ExBank() {
    const [exercise, setExercise] = useState([])
    const [ex_progress, setExProgress] = useState([])
    const [progress, setProgress] = useState('')
    const router = useRouter()

    useEffect(() => {
        fetch('/api/exercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("exerciseID"), method: 'getInfo' }),
        })
            .then(response => response.json())
            .then(data => {
                setExercise(data)
            })
            .catch(error => console.error('Error:', error));
        fetch('/api/exercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("userName"), ex_id: localStorage.getItem("exerciseID"), method: 'getProgress' }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.length !== 0) {
                    localStorage.setItem('saved', 'already')
                    setExProgress(data)
                    console.log(data)
                    setProgress(data.progress)
                }
                else {
                    localStorage.setItem('saved', 'new')
                }

            })
            .catch(error => console.error('Error:', error));

    }, []);
    console.log(exercise.solution)
    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        console.log(progress)
        const response = await fetch('/api/exercise', {
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem('userName'), ex_id: localStorage.getItem("exerciseID"), status: localStorage.getItem('saved'), progress: progress, method: 'saveProgress' }),
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
                        <div className="px-2 ml-2 my-2 text-black text-base font-semibold font-['Poppins'] border-r border-stone-300">
                            {exercise.title}
                        </div>
                        <div className="px-2 ml-2 my-2 text-black text-base font-semibold font-['Poppins'] border-r border-stone-300">
                            Module {' '} {exercise.module}
                        </div>
                        <div className="px-2 ml-2 my-2 text-black text-base font-semibold font-['Poppins']">
                            Skill {' '} {exercise.skill}
                        </div>
                    </div>

                    <div className="bg-white mt-2 pb-[13px] rounded">
                        {localStorage.getItem('userType') === 'Student' ?
                            (<>
                                <div className="flex items-center justify-end py-2 border-b border-stone-300 mx-4">

                                    <button className="flex items-center bg-lime-500 font-semibold hover:bg-lime-400 duration-300 text-white rounded-lg px-3 py-2 font-poppins text-sm"
                                        onClick={handleFormSubmit}>
                                        Save your progress
                                    </button>

                                </div>
                                <div className="grid grid-cols-2 mt-4 py-4 mx-4 gap-6">
                                    <div className="rounded-lg border border-stone-300 pl-6 py-8 pr-4 overflow-y-scroll h-[450px]">
                                        <div className="text-black text-base font-normal break-words h-3/4">
                                            {exercise.content}
                                        </div>
                                        {exercise.attachedFile && (
                                            <div className="rounded-xl py-3 mt-3">
                                                <p className="font-semibold ml-3">File listening</p>
                                                <ReactAudioPlayer
                                                    src={exercise.attachedFile}
                                                    controls
                                                    className="w-full"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {localStorage.getItem('saved') === 'already' ?
                                        ex_progress.map((exercise, index) => (
                                            <div key={index} className="bg-orange-100 bg-opacity-40 rounded-lg shadow-lg border flex-col items-center inline-flex p-4">
                                                <textarea onChange={(ev) => { setProgress(ev.target.value) }} className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none h-96" id="myText" placeholder="Type...">{exercise.progress}</textarea>
                                                {exercise.solution &&
                                                    <a className="bg-lime-500 p-2 mt-6 rounded-lg duration-300 hover:bg-lime-400 text-white font-semibold" href={exercise.solution}>
                                                        View solution
                                                    </a>
                                                }
                                            </div>)) :
                                        <div className="bg-orange-100 bg-opacity-40 rounded-lg shadow-lg border flex-col items-center inline-flex p-4">
                                            <textarea onChange={(ev) => { setProgress(ev.target.value) }} className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none h-96" id="myText" placeholder="Type..."></textarea>
                                            {exercise.solution &&
                                                <a className="bg-lime-500 p-2 mt-6 rounded-lg duration-300 hover:bg-lime-400 text-white font-semibold" href={exercise.solution}>
                                                    {/* View solution */}
                                                    {exercise.solution}
                                                </a>
                                            }
                                        </div>}
                                </div>
                            </>) :
                            (<>
                                <div className="mt-4 pt-4 mx-4">
                                    <p className="ml-4 mb-2 text-base font-medium leading-tight tracking-tight">Content</p>
                                    <div className="rounded-lg border border-stone-300 pl-6 pt-8 overflow-y-auto h-[350px]">
                                        <span className="text-black text-base font-normal h-3/4"
                                            style={{ wordWrap: 'break-word' }}>
                                            {exercise.content}
                                        </span>
                                        {exercise.attachedFile && (
                                            <div className="rounded-xl py-3 mt-3">
                                                <p className="font-semibold ml-3">File listening</p>
                                                <ReactAudioPlayer
                                                    src={exercise.attachedFile}
                                                    controls
                                                    className="w-1/2"
                                                />
                                            </div>
                                        )}
                                        {exercise.solution &&
                                            <a className="bg-lime-500 p-2 mt-6 rounded-lg duration-300 hover:bg-lime-400 text-white font-semibold"
                                                href={exercise.solution}>
                                                {/* View solution */}
                                                {exercise.solution}
                                            </a>
                                        }
                                    </div>
                                </div>
                            </>)}

                    </div>
                </div>
            </div>
        </>
    )
}

function typeOf(ex_progress: string): any {
    throw new Error("Function not implemented.")
}
