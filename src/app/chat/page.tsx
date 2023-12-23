'use client'

//Thiếu người gửi
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Iuser from "@/components/icons/icon_user"
import Iimage from "@/components/icons/icon_image"
//import Example from "./chat_dropdown"
import { SyntheticEvent, useEffect, useState, ReactElement } from "react"
import Image from "next/image"
import Select from "react-select";
import { useRouter } from 'next/navigation'
import moment from "moment"

export default function Chat() {
    const [sender, setSender] = useState('')
    const [message, setMessage] = useState('')
    const [receiver, setReceiver] = useState('')
    const [content, setContent] = useState('')
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState(Date.now());
    const [file, setFile] = useState('');
    const router = useRouter();
    const [receivers, setReceivers] = useState([])

    const [message_sent, SetMessageSent] = useState([]);
    const [message_received, SetMessageReceived] = useState([]);

    const type = localStorage.getItem('phone')
    
    const handleChangeReceiver = (ev) => {
        setReceiver(ev.value);
    };

    const optionReceiver = receivers.map(receiver => {
        return {
            
            value: receiver.phone,
            label: receiver.type + " - " + receiver.name
        }
    })

    // const optionReceiver = teachers.map(teacher => {
    //     return {
    //         value: teacher.phone,
    //         label: teacher.type + " - " + teacher.name
    //     }
    // }).concat(students.map(student => {
    //     return {
    //         value: student.phone,
    //         label: student.type + " - " + student.name
    //     }
    // }))

    useEffect(() => {
        localStorage.setItem('sidebar', 3)
        console.log("hello")
    //     fetch('/api/message', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({sender: localStorage.getItem("phone")}),
    //    })
    //         .then(res => res.json())
    //         .then(data => {
    //             // setTeachers(data.teachers)
    //             // setStudents(data.students)
    //             setReceiver(data.receiver)
            
    //         })
    //         .catch(error => console.error('Error:', error));
    }, []);


    function handleChangeFile(ev) {
        setFile(URL.createObjectURL(ev.target.files[0]));
    }

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        const response = await fetch('/api/message', {
            method: 'POST',
            body: JSON.stringify({ sender, receiver, content, date, file }),
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const [contentChat, setContentChat] = useState<ReactElement | null>(null);
    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    const handleButtonClick = (buttonNumber: number) => {
        setSelectedButton(buttonNumber);
        if (buttonNumber === 1) {
            setContentChat(
                <div className="bg-zinc-200 rounded-lg mr-8 mt-3">
                    <div className="flex items-center pl-7 pt-4">
                        <Iuser className="w-10 fill-zinc-400 mr-4" />
                        <p className="text-black text-sm font-semibold font-['Poppins']">Do Hoang Khanh Duy</p>
                    </div>

                    <div className="text-stone-400 text-sm font-semibold pl-7 mt-3">
                        {message.sender}
                    </div>

                    <button className="flex items-center pl-7 mt-3 pb-6">
                        <Iimage className="w-6 mr-2 fill-zinc-500" />
                        <p className="text-center text-zinc-400 text-base font-normal leading-tight tracking-tight hover:underline">Click to see image</p>
                    </button>
                </div>
            )
        } else if (buttonNumber === 2) {
            setContentChat(
                <div className="bg-zinc-200 rounded-lg mr-8 mt-3">
                    <div className="flex items-center pl-7 pt-4">
                        <Iuser className="w-10 fill-zinc-400 mr-4" />
                        <p className="text-black text-sm font-semibold font-['Poppins']">Do Hoang Khanh Duy</p>
                    </div>

                    <div className="text-stone-400 text-sm font-semibold pl-7 mt-3">
                        You need to do it yourself, remember there’s nothing that you cannot do my son. There’s no room for self-doubt.
                    </div>

                    <button className="flex items-center pl-7 mt-3 pb-6">
                        <Iimage className="w-6 mr-2 fill-zinc-500" />
                        <p className="text-center text-zinc-400 text-base font-normal leading-tight tracking-tight hover:underline">Click to see image</p>
                    </button>
                </div>
            )
        }
    };

    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black pb-2">
                        Chat
                    </div>
                    <div className="bg-white rounded pb-10">
                        <div className="mt-6 grid grid-cols-2">
                            {/* left side */}
                            <div className="border-r-2 border-black mt-6 ml-9">
                                <button
                                    onClick={() => handleButtonClick(1)}
                                    className={`bg-white hover:bg-sky-200 text-black hover:text-white text-base font-medium px-4 py-2 rounded-lg border border-zinc-300 ${selectedButton === 1 ? 'bg-sky-600' : ''}`}>
                                    Chat received
                                </button>

                                <button
                                    onClick={() => handleButtonClick(2)}
                                    className={`ml-6 bg-white hover:bg-sky-200 text-black hover:text-white text-base font-medium px-4 py-2 rounded-lg border border-zinc-300 ${selectedButton === 2 ? 'bg-sky-600' : ''}`}>
                                    Chat sent
                                </button>

                                <div className="mt-6">
                                    {contentChat}
                                </div>
                            </div>

                            {/* Right side */}
                            <div className="bg-zinc-100 rounded-lg border border-neutral-400 mt-6 mr-7 ml-8">
                                <div className="flex items-center justify-center">
                                    <p className="mt-8 text-black text-2xl font-bold leading-tight tracking-tight">Send message</p>
                                </div>
                                <div className="mt-6 ml-7">
                                    <p className="text-black text-base font-medium leading-tight tracking-tight">Choose receiver</p>
                                    {/* Dropdown list */}
                                    <Select options={optionReceiver} onChange={handleChangeReceiver}
                                        className="w-[380px] mt-2 mr-3" placeholder="Select receiver" />
                                </div>

                                <div className="mt-12 ml-6 mr-4">
                                    <p className="text-black text-base font-medium">Content</p>
                                    <textarea className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none mt-2"
                                        placeholder="Type content..." onChange={ev => setContent(ev.target.value)}></textarea>
                                </div>
                                <div className="font-semibold mt-3 ml-7">Image</div>
                                <div className="bg-white w-[380px] rounded-md border border-zinc-400 ml-7 mt-2 pl-2 py-1">
                                    <input
                                        className="mb-3"
                                        type="file"
                                        onChange={handleChangeFile} />
                                    <Image
                                        src={file}
                                        width={200}
                                        height={150} alt={""} />
                                </div>

                                <div className="flex mt-[86px] mr-4 justify-end pb-8">
                                    <button
                                        onClick={handleFormSubmit}
                                        className="text-center text-black text-base bg-lime-300 rounded-lg px-4 py-1 hover:bg-lime-400">
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