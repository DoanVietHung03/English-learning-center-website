'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Iuser from "@/components/icons/icon_user"
import React, { SyntheticEvent, useEffect, useState, ReactElement, useRef } from "react"
import Image from "next/image"
import Select from "react-select";
import Ixmark from "@/components/icons/icon_xmark"
import moment from 'moment';
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index'
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";

export default function Chat() {
    const [message, setMessage] = useState('')
    const [receiver, setReceiver] = useState('')
    const [content, setContent] = useState('')
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState(Date.now());
    const [file, setFile] = useState('');
    const [receivers, setReceivers] = useState([])

    const [message_sent, SetMessageSent] = useState([]);
    const [message_received, SetMessageReceived] = useState([]);
    const [image, setImage] = useState("")


    const handleChangeReceiver = (ev) => {
        setReceiver(ev.value);
    };

    useEffect(() => {
        localStorage.setItem('sidebar', 3)
        fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("userName"), method: 'getList' }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                SetMessageSent(data.combinedSentMessages)
                SetMessageReceived(data.combinedReceivedMessages)
            })
            .catch(error => console.error('Error:', error));

        fetch('/api/user')
            .then(res => res.json())
            .then(data => {
                setTeachers(data.teachers)
                setStudents(data.students)
            })
    }, []);

    const allUsers = [...teachers, ...students];
    const filteredUsers = allUsers.filter(user => user.phone !== localStorage.getItem("userName"));

    const optionReceivers = filteredUsers.map(
        function (user) {
            return {
                value: user.phone,
                label: user.phone + " - " + user.name
            }
        }
    );


    function handleChangeFile(ev) {
        const selectedFile = ev.target.files[0];
        setImage(selectedFile)
        setFile(selectedFile)
    }

    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()

        let fileSave = ''
        const data = new FormData()
        data.append("file", image)
        data.append("folder", "chat")
        data.append("upload_preset", "introSE")
        data.append("cloud_name", "dzdmbflvk")

        await fetch("https://api.cloudinary.com/v1_1/dzdmbflvk/image/upload", {
            method:"post",
            body: data
        })
        .then((res) => res.json())
        .then((data) => {
            fileSave = data.url
        }).catch((err) => {
            console.log(err);
        })

        const response = await fetch('/api/message', {
            method: 'POST',
            body: JSON.stringify({ sender: localStorage.getItem('userName'), receiver, content, file: fileSave, method: 'add' }),
            headers: { 'Content-Type': 'application/json' },
        })
        window.location.reload(true);
    }

    const [contentChat, setContentChat] = useState<ReactElement | null>(null);
    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    const popupRef = useRef();
    const handleButtonClick = (buttonNumber: number) => {
        setSelectedButton(buttonNumber);
        if (buttonNumber === 1) {
            setContentChat(
                <>
                    {message_received.map((mes_receive, i) => (
                        <div key={i}>
                            <div className="bg-zinc-300 rounded-lg mr-8 mt-3 grid grid-cols-2 pb-1">
                                <div>
                                    <div className="flex items-center pl-7 pt-4">
                                        <Iuser className="w-10 fill-zinc-400 mr-4" />
                                        <p className="text-black text-sm font-semibold font-['Poppins']">{mes_receive.sender_name}</p>
                                    </div>

                                    <div className="ml-6 mt-2 font-semibold text-sm text-gray-400">
                                        Send date: {moment.utc(mes_receive.sentDate).format('DD/MM/YYYY')}
                                    </div>
                                </div>
                                <div>
                                    <Popup
                                        ref={popupRef}
                                        trigger={<div className="mt-2 flex items-center justify-end w-full">
                                            <button className="mr-4">
                                                <Ixmark />
                                            </button>
                                        </div>}>

                                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-44 bg-gray-200 p-4 border-2 border-gray-500 rounded-lg">
                                            <div className="mt-4">
                                                <p className="text-center text-lg font-semibold">Do you want to delete permanently ?</p>
                                                <div className="flex items-center justify-between mt-10 gap-2 text-lg font-medium">
                                                    <button className="w-1/2 border-2 border-black bg-lime-400 hover:bg-lime-500 rounded-md py-2" onClick={ev => { delete_course = course.course_id, handleDelete(ev) }}>
                                                        Yes
                                                    </button>

                                                    <button className="w-1/2 border-2 border-black bg-red-400 hover:bg-red-500 rounded-md py-2"
                                                        onClick={() => { popupRef.current.close() }}>
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Popup>

                                    <Popup trigger={<div className="text-zinc-500 w-fit h-fit text-sm font-semibold pl-7 mt-2 hover:underline cursor-pointer">
                                        {(mes_receive.content.length <= 20 ?
                                            <div>
                                                <Grid item>
                                                    <Tooltip disableFocusListener disableTouchListener title="Click to read full">
                                                        <div>{mes_receive.content}</div>
                                                    </Tooltip>
                                                </Grid>

                                            </div> :
                                            <div>
                                                <Grid item>
                                                    <Tooltip disableFocusListener disableTouchListener title="Click to read full">
                                                        <div>{mes_receive.content.substring(0, 20)}...</div>
                                                    </Tooltip>
                                                </Grid>
                                            </div>)}
                                    </div>}
                                        position="right top"
                                        contentStyle={{ right: '20px', margin: '0 0 0 10px' }}>
                                        <div className="bg-zinc-200 w-60 h-60 rounded-lg px-2 py-2">
                                            <div className="bg-white rounded-lg pl-2 py-2 h-full overflow-y-auto">
                                                {mes_receive.content}
                                            </div>
                                        </div>
                                    </Popup>
                                </div>

                                {/* <button className="flex items-center pl-7 mt-3 pb-6">
                                    <Iimage className="w-6 mr-2 fill-zinc-500" />
                                    <p className="text-center text-zinc-400 text-base font-normal leading-tight tracking-tight hover:underline">Click to see image</p>
                                </button> */}
                            </div>
                        </div>
                    ))}
                </>
            )
        } else if (buttonNumber === 2) {
            setContentChat(
                <>
                    {message_sent.map((mes_send, i) => (
                        <div key={i}>
                            <div className="bg-zinc-300 rounded-lg mr-8 mt-3 grid grid-cols-2 pb-1">
                                <div>
                                    <div className="flex items-center pl-7 pt-4">
                                        <Iuser className="w-10 fill-zinc-400 mr-4" />
                                        <p className="text-black text-sm font-semibold font-['Poppins']">{mes_send.receiver_name}</p>
                                    </div>

                                    <div className="ml-6 mt-2 font-semibold text-sm text-gray-400">
                                        Send date: {moment.utc(mes_send.sentDate).format('DD/MM/YYYY')}
                                    </div>
                                </div>
                                <div>
                                    <Popup
                                        ref={popupRef}
                                        trigger={<div className="mt-2 flex items-center justify-end w-full">
                                            <button className="mr-4">
                                                <Ixmark />
                                            </button>
                                        </div>}>

                                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-44 bg-gray-200 p-4 border-2 border-gray-500 rounded-lg">
                                            <div className="mt-4">
                                                <p className="text-center text-lg font-semibold">Do you want to delete permanently ?</p>
                                                <div className="flex items-center justify-between mt-10 gap-2 text-lg font-medium">
                                                    <button className="w-1/2 border-2 border-black bg-lime-400 hover:bg-lime-500 rounded-md py-2" onClick={ev => { delete_course = course.course_id, handleDelete(ev) }}>
                                                        Yes
                                                    </button>

                                                    <button className="w-1/2 border-2 border-black bg-red-400 hover:bg-red-500 rounded-md py-2"
                                                        onClick={() => { popupRef.current.close() }}>
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Popup>

                                    <Popup trigger={<div className="text-zinc-500 w-fit h-fit text-sm font-semibold pl-7 mt-2 hover:underline cursor-pointer">
                                        {(mes_send.content.length <= 20 ?
                                            <div>
                                                <Grid item>
                                                    <Tooltip disableFocusListener disableTouchListener title="Click to read full">
                                                        <div>{mes_send.content}</div>
                                                    </Tooltip>
                                                </Grid>

                                            </div> :
                                            <div>
                                                <Grid item>
                                                    <Tooltip disableFocusListener disableTouchListener title="Click to read full">
                                                        <div>{mes_send.content.substring(0, 20)}...</div>
                                                    </Tooltip>
                                                </Grid>
                                            </div>)}
                                    </div>}
                                        position="right top"
                                        contentStyle={{ right: '20px', margin: '0 0 0 10px' }}>
                                        <div className="bg-zinc-200 w-60 h-60 rounded-lg px-2 py-2">
                                            <div className="bg-white rounded-lg pl-2 py-2 h-full overflow-y-auto">
                                                {mes_send.content}
                                            </div>
                                        </div>
                                    </Popup>
                                </div>

                                {/* <button className="flex items-center pl-7 mt-3 pb-6">
                                    <Iimage className="w-6 mr-2 fill-zinc-500" />
                                    <p className="text-center text-zinc-400 text-base font-normal leading-tight tracking-tight hover:underline">Click to see image</p>
                                </button> */}
                            </div>
                        </div>
                    ))}
                </>
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
                                    className={`hover:bg-sky-200 text-black hover:text-white text-base font-medium px-4 py-2 rounded-lg border border-zinc-300 ${selectedButton === 1 ? 'bg-sky-400' : ''}`}>
                                    Chat received
                                </button>

                                <button
                                    onClick={() => handleButtonClick(2)}
                                    className={`ml-6 hover:bg-sky-200 text-black hover:text-white text-base font-medium px-4 py-2 rounded-lg border border-zinc-300 ${selectedButton === 2 ? 'bg-sky-400' : ''}`}>
                                    Chat sent
                                </button>

                                <div className="mt-6 h-[450px] overflow-y-auto">
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
                                    <Select options={optionReceivers} onChange={handleChangeReceiver}
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
                                        onChange={(ev) => handleChangeFile(ev)} />
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