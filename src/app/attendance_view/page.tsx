'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import { useState, useEffect } from "react"
//import { useRouter } from 'next/navigation'

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
                setAttend(data)
                console.log(data)
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
                    <div className="flex mt-4 bg-white text-sky-300 py-2 px-3 justify-center items-center rounded-lg font-bold">
                        {localStorage.getItem('session_name')}
                    </div>
                    <div className="bg-white h-1/2 mt-4">
                        {
                            attends.map((attend, i) => (
                                <div className="inline-block mt-4 ml-4">
                                    {attend &&
                                        <div className="inline-block mr-4 bg-gray-200 p-3 rounded-lg">
                                            <div className="flex gap-3">
                                                {i}: {attend.id} - {attend.name} - {String(attend.isAttended)}
                                            </div>
                                        </div>}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
