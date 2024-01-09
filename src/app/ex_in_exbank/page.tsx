/* eslint-disable @next/next/no-img-element */
'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ReactAudioPlayer from "react-audio-player"

export default function ExBank() {
    const [exercise, setExercise] = useState([])
    const [ex_progress, setExProgress] = useState([])
    const [progress, setProgress] = useState('')
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem('sidebar', 1)

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

    const audioTail = ['mp3', 'wav']
    const imgTail = ['jpg', 'png', 'jpeg']

    const [showLargeImage, setShowLargeImage] = useState(false);

    const handleClick = () => {
        setShowLargeImage(!showLargeImage);
    };

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
                                <div className="grid grid-cols-2 py-4 mx-4 gap-6">
                                    <div>
                                        <div className="text-base font-semibold leading-tight tracking-tight">
                                            Content
                                        </div>
                                        <div className="rounded-lg border border-stone-300 pl-6 py-8 pr-4 h-[450px]">
                                            <div>
                                                <div className="h-[200px] overflow-y-auto text-black text-base font-normal" style={{ wordWrap: 'break-word' }}>
                                                    {exercise.content}
                                                </div>
                                                {((exercise.attachedFile === '') || (exercise.attachedFile === null) || (exercise.attachedFile === undefined)) ? null :
                                                    (imgTail.includes((exercise.attachedFile).substring((exercise.attachedFile).lastIndexOf('.') + 1)) ?
                                                        <div className="bg-white rounded-md w-[170px] border border-zinc-400 overflow-y-auto">
                                                            <img
                                                                src={exercise.attachedFile}
                                                                width={130}
                                                                height={70}
                                                                alt={"Cannot load"}
                                                                onClick={handleClick}
                                                                style={{
                                                                    width: showLargeImage ? '70%' : 'auto',
                                                                    height: showLargeImage ? '70vh' : 'auto',
                                                                    objectFit: 'contain',
                                                                    position: showLargeImage ? 'fixed' : 'static',
                                                                    margin: 'auto',
                                                                    display: 'flex',
                                                                    left: '50%',
                                                                    top: '50%',
                                                                    transform: showLargeImage ? 'translate(-50%, -50%)' : 'none',
                                                                    zIndex: showLargeImage ? 2 : 'auto',
                                                                    transition: '0.5s',
                                                                }} />
                                                            {showLargeImage && (
                                                                <div
                                                                    style={{
                                                                        position: 'fixed',
                                                                        top: 0,
                                                                        left: 0,
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        background: 'rgba(0, 0, 0, 0.7)', // Điều này tạo ra một lớp đen với độ mờ là 0.7
                                                                        zIndex: 1, // Đặt z-index để nó hiển thị phía trên ảnh, nhưng đằng sau nó
                                                                    }}
                                                                />
                                                            )}

                                                        </div> : (audioTail.includes((exercise.attachedFile).substring((exercise.attachedFile).lastIndexOf('.') + 1))) ?
                                                            <div className="mt-12">
                                                                <div>File listening</div>
                                                                <ReactAudioPlayer
                                                                    src={exercise.attachedFile}
                                                                    controls
                                                                    className="w-full"
                                                                />
                                                            </div> :
                                                            <div className="border border-zinc-300 px-2 py-2 mt-24">
                                                                <a style={{ wordWrap: 'break-word' }} href={exercise.attachedFile}>{exercise.attachedFile}</a>
                                                            </div>)}
                                            </div>  
                                        </div>
                                    </div>

                                    {localStorage.getItem('saved') === 'already' ?
                                        ex_progress.map((exercise, index) => (
                                            <div key={index}>
                                                <div className="text-base font-semibold leading-tight tracking-tight">Answer</div>
                                                <div className="bg-orange-100 bg-opacity-40 rounded-lg shadow-lg border p-4">
                                                    <textarea onChange={(ev) => { setProgress(ev.target.value) }} className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none h-96 mb-4" id="myText" placeholder="Type...">{exercise.progress}</textarea>
                                                    {exercise.solution &&
                                                        <div className="flex items-center justify-end">
                                                            <a className="bg-lime-500 p-2 rounded-lg duration-300 hover:bg-lime-400 text-white font-semibold" href={exercise.solution} >
                                                                View solution
                                                            </a>
                                                        </div>
                                                    }
                                                </div>
                                            </div>)) :
                                        <div>
                                            <div className="text-base font-semibold leading-tight tracking-tight">Answer</div>
                                            <div className="bg-orange-100 bg-opacity-40 rounded-lg shadow-lg border p-4">
                                                <textarea onChange={(ev) => { setProgress(ev.target.value) }} className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none h-96 mb-4" id="myText" placeholder="Type..."></textarea>
                                                {exercise.solution &&
                                                    <div className="flex items-center justify-end">
                                                        <a className="bg-lime-500 p-2 rounded-lg duration-300 hover:bg-lime-400 text-white font-semibold" href={exercise.solution} >
                                                            View solution
                                                        </a>
                                                    </div>
                                                }
                                            </div>
                                        </div>}
                                </div>
                            </>) :
                            (<>
                                <div className="mt-4 mx-4">
                                    <div className="flex items-center justify-between py-2">
                                        <p className="text-base font-medium leading-tight tracking-tight">Content</p>
                                        {exercise.solution &&
                                            <div className="flex items-end justify-end">
                                                <a className="bg-lime-500 p-2 rounded-lg duration-300 hover:bg-lime-400 text-white font-semibold"
                                                    href={exercise.solution}>
                                                    View solution
                                                </a>
                                            </div>

                                        }
                                    </div>

                                    <div className="rounded-lg border border-stone-300 pl-6 pt-8 h-[350px]">
                                        <div className="text-black text-base font-normal"
                                            style={{ wordWrap: 'break-word' }}>
                                            <div className="h-[100px] overflow-y-auto">
                                                {exercise.content}
                                            </div>
                                            {((exercise.attachedFile === '') || (exercise.attachedFile === null) || (exercise.attachedFile === undefined)) ? null :
                                                (imgTail.includes((exercise.attachedFile).substring((exercise.attachedFile).lastIndexOf('.') + 1)) ?
                                                    <div className="bg-white rounded-md w-[170px] border border-zinc-400 overflow-y-auto">
                                                        <img
                                                            src={exercise.attachedFile}
                                                            width={130}
                                                            height={70}
                                                            alt={"Cannot load"}
                                                            onClick={handleClick}
                                                            style={{
                                                                width: showLargeImage ? '70%' : 'auto',
                                                                height: showLargeImage ? '70vh' : 'auto',
                                                                objectFit: 'contain',
                                                                position: showLargeImage ? 'fixed' : 'static',
                                                                margin: 'auto',
                                                                display: 'flex',
                                                                left: '50%',
                                                                top: '50%',
                                                                transform: showLargeImage ? 'translate(-50%, -50%)' : 'none',
                                                                zIndex: showLargeImage ? 2 : 'auto',
                                                                transition: '0.5s',
                                                            }} />
                                                        {showLargeImage && (
                                                            <div
                                                                style={{
                                                                    position: 'fixed',
                                                                    top: 0,
                                                                    left: 0,
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    background: 'rgba(0, 0, 0, 0.7)', // Điều này tạo ra một lớp đen với độ mờ là 0.7
                                                                    zIndex: 1, // Đặt z-index để nó hiển thị phía trên ảnh, nhưng đằng sau nó
                                                                }}
                                                            />
                                                        )}

                                                    </div> : (audioTail.includes((exercise.attachedFile).substring((exercise.attachedFile).lastIndexOf('.') + 1))) ?
                                                        <div className="mt-12">
                                                            <div>File listening</div>
                                                            <ReactAudioPlayer
                                                                src={exercise.attachedFile}
                                                                controls
                                                                className="w-2/3"
                                                            />
                                                        </div> :
                                                        <div className="border border-zinc-300 px-2 py-2 w-fit mt-24">
                                                            <a style={{ wordWrap: 'break-word' }} href={exercise.attachedFile}>{exercise.attachedFile}</a>
                                                        </div>)}
                                        </div>
                                        {/* {exercise.attachedFile && (
                                            <div className="rounded-xl py-3 mt-3">
                                                <p className="font-semibold ml-3">File listening</p>
                                                <ReactAudioPlayer
                                                    src={exercise.attachedFile}
                                                    controls
                                                    className=""
                                                />
                                            </div>
                                        )}
                                        {exercise.solution &&
                                            <a className="bg-lime-500 p-2 mt-10 rounded-lg duration-300 hover:bg-lime-400 text-white font-semibold"
                                                href={exercise.solution}>
                                                View solution                                            
                                            </a>
                                        } */}
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
