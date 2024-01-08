'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import { useState, useEffect } from "react"
import Icheck from "@/components/icons/icon_check"
import IcircleXmark from "@/components/icons/icon_circle_xmark"

export default function ViewAttend() {
    const [attends, setAttend] = useState([]);
    

    useEffect(() => {
        console.log(localStorage.getItem('session_id'))
        console.log(localStorage.getItem('course_id'))

        fetch('/api/course', {
            method: 'POST',
            body: JSON.stringify({ id: localStorage.getItem('session_id'), course_id: localStorage.getItem('course_id'), method: 'getAttendList' }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                const attend = data.filter(at => at.isAttended === true)
                const absent = data.filter(at => at.isAttended === false)
                const attendance = [...attend, ...absent]
                setAttend(attendance)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <Header />
            <div className='flex gap -6'>
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="font-poppins font-bold text-5xl">
                        View Attendance List
                    </div>
                    <div className="bg-white mt-4 py-4">
                        <div className="justify-center text-gray-700 items-center rounded-lg font-bold flex mb-2 text-lg ml-2">
                            {localStorage.getItem('session_name')}
                        </div>
                        <div className="h-[331px] border border-zinc-200 mx-2 rounded-lg">
                            <div className="grid grid-cols-2 overflow-y-auto items-center justify-center px-4 py-4 gap-2">
                                {attends.map((student, i) => (
                                    <div key={i} className="inline-block rounded-lg text-center items-center justify-center">
                                        {(student.isAttended) ?
                                            <div className="flex gap-6 items-center justify-center ml-4 p-2 bg-green-200">
                                                <div className="w-2/3">
                                                    {student.name} - {student.id}
                                                </div>
                                                <div>
                                                    <Icheck className="w-[2em]"/>
                                                </div>
                                            </div> : 
                                            <div className="flex gap-6 items-center justify-center ml-4 p-2 bg-rose-200">
                                                <div className="w-2/3">
                                                    {student.name} - {student.id}
                                                </div>
                                                <div>
                                                    <IcircleXmark />
                                                </div>
                                            </div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </>
            )
}
