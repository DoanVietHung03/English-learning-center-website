/* eslint-disable react/jsx-key */
'use client'
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import { useState, useEffect } from "react"
import Select from "react-select";
import Idelete from "@/components/icons/delete";
import Link from "next/link";
import { useRouter } from 'next/navigation'
export default function CreateAttend() {
    const [listStudent, setListStudent] = useState([])
    useEffect(() => {
        fetch('/api/getStuCourse', {
            method: 'POST',
            body: JSON.stringify({ listStuCourseID: localStorage.getItem('course_id') }),
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
    console.log("1123142", listStudent)
    const handleDelete = (index) => {
        // Tạo một bản sao mới của mảng và loại bỏ phần tử tại chỉ mục index
        const updatedArray = [...listStudent.slice(0, index), ...listStudent.slice(index + 1)];

        // Cập nhật state với mảng mới
        setListStudent(updatedArray);
        console.log(listStudent)
    };
    const router = useRouter();
    async function handleSubmit(ev: SyntheticEvent) {
        const listStuCreate = listStudent.map(function (student) {
            return student.phone
        })
        console.log(listStuCreate)
        // console.lo
        ev.preventDefault()
        const response = await fetch('/api/createAttend', {
            method: 'POST',
            body: JSON.stringify({ course_id: localStorage.getItem('course_id'), session_id: localStorage.getItem('sessionName'), studentList: listStuCreate }),
            headers: { 'Content-Type': 'application/json' },
        })
        // router.push('/course_Time')
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
                    <div className="flex bg-white py-2 px-3 justify-center items-center rounded-lg font-bold">
                        {localStorage.getItem('sessionName')}
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
                                submit
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}