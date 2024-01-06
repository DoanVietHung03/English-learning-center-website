/* eslint-disable react/jsx-key */
'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import { useState, useEffect } from "react"
import Idelete from "@/components/icons/delete";
import { useRouter } from 'next/navigation'
export default function CreateAttend() {
    const [listStudent, setListStudent] = useState([])
    useEffect(() => {
        fetch('/api/course', {
            method: 'POST',
            body: JSON.stringify({ listStuCourseID: localStorage.getItem('course_id'), method: 'getStudentList' }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                setListStudent(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDelete = (index) => {
        // Tạo một bản sao mới của mảng và loại bỏ phần tử tại chỉ mục index
        const updatedArray = [...listStudent.slice(0, index), ...listStudent.slice(index + 1)];

        // Cập nhật state với mảng mới
        setListStudent(updatedArray);
    };
    const router = useRouter();

    async function handleSubmit(ev: SyntheticEvent) {
        const listStuCreate = listStudent.map(function (student) {
            return student.phone
        })

        ev.preventDefault()
        const response = await fetch('/api/attendance', {
            method: 'POST',
            body: JSON.stringify({ course_id: localStorage.getItem('course_id'), session_id: localStorage.getItem('session_id'), studentList: listStuCreate, method: 'add' }),
            headers: { 'Content-Type': 'application/json' },
        })
        router.push('/course_Time')
    }
    
    return (
        <>
            <Header />
            <div className='flex gap-6'>
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="font-poppins font-bold text-5xl">
                        Create Attendance List
                    </div>
                    <div className="flex bg-white mt-4 py-2 px-3 text-sky-300 justify-center items-center rounded-lg font-bold">
                        {localStorage.getItem('session_id')}
                    </div>
                    <div className="bg-white h-1/2 mt-4">
                        {
                            listStudent.map((student, i) => (
                                <div className="inline-block mt-4 ml-4">
                                    {student &&
                                        <div className="inline-block mr-4 bg-gray-200 p-3 rounded-lg">
                                            <div className="flex gap-3">
                                                <div>
                                                    {i}: {student.phone} - {student.name}
                                                </div>
                                                <button onClick={() => handleDelete(i)}>
                                                    <Idelete />
                                                </button>
                                            </div>
                                        </div>}
                                </div>
                            ))
                        }
                        <div className="flex justify-end">
                            <button onClick={handleSubmit}
                                className="bg-lime-300 p-3 rounded-md mr-4 my-4">
                                Submit
                            </button>

                        </div>
                    </div>                   
                </div>
            </div>
        </>
    )
}