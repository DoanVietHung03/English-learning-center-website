'use client'

import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Select from "react-select";
import Iplus from "@/components/icons/icon_plus";
import Link from "next/link"
import { useState, useEffect } from "react"
import { GET } from '@/app/api/user/route';


//const type = 'teacher'

// async function GET() {
//     mongoose.connect("mongodb+srv://learning-management:Abuo65lscK5pOUms@cluster0.nwhbe5i.mongodb.net/learning-management")
//     const list_teacher = await User.find({type: 'teacher'})//,{phone: 1, type:0, name: 0, _id : 0})
//     console.log(list_teacher)
//     return Response.json(list_teacher)
// }
// mongoose.js (or wherever you set up your MongoDB connection)


export default function Course_Add() {
    const [title, setTitle] = useState('')
    const [module, setModule] = useState('')
    const [teacher, setTeacher] = useState('')
    const [sDate, setSDate] = useState('')
    const [cDate, setCDate] = useState('')
    const [student, setStudent] = useState('')
    const handleChangeModule = (ev) => {
        setModule(ev.value);
    };
    const handleChangeTeacher = (ev) => {
        setTeacher(ev.value);
    };
    const handleChangeStudentID = (ev) => {
        setStudent(ev.value);
    };

    const [teachers, setTeachers] = useState([])
    useEffect(() => {
        fetch('/api/user').then(res => {
          res.json().then(menuItems => {
            setTeachers(menuItems);
          });
        })
      }, []);

      console.log(teachers)
    // async function fetchData() {
    //     try {
    //       // Call the GET function
    //       const response = await GET({ json: () => {} });
    //       console.log(response);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   }
      
    //   // Call the fetchData function
    // fetchData();

    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="flex justify-between mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black pb-2">
                        <div>
                            Create Course
                        </div>
                        <button className="gap-2 flex items-center justify-end bg-lime-300 rounded-lg text-center text-black text-base font-poppins leading-tight tracking-tight hover:bg-lime-400 px-4">
                            <Iplus />
                            <p className="flex items-center">Create course</p> 
                        </button>
                    </div> 

                    <div className="bg-white mt-2 rounded">
                        <div className="px-12 py-8">
                            <div className="items-center">
                                <div className="text-base font-medium">Course Name</div>
                                <input className="px-2 py-2 rounded-md border border-zinc-300 focus:outline-none mt-2 w-full" type="text" id="myTitle" placeholder="Type name of the course" />                        
                            </div>

                            <div className="mt-8 grid grid-cols-2">
                                <div>
                                    <p className="text-black text-base font-medium leading-tight tracking-tight">Choose a module</p>
                                    <Select options={optionModule} onChange={handleChangeModule} className="w-3/4 mt-2" placeholder="Select module" />
                                </div>

                                <div>
                                    <p className="text-black text-base font-medium leading-tight tracking-tight">Choose a teacher</p>
                                    <Select options={optionModule} onChange={handleChangeTeacher} className="w-3/4 mt-2" placeholder="Select teacher" />
                                </div>
                            </div>
                            
                            <div className="mt-12 grid grid-cols-2">
                                <div>
                                    <p className="text-black text-base font-medium leading-tight tracking-tight">Start Date</p>
                                    <input className="rounded border border-zinc-300 focus:outline-none w-3/4 mt-2 px-3 py-[6.5px]" type="text" id="myStartDate" placeholder="Type start date" />
                                </div>

                                <div>
                                    <p className="text-black text-base font-medium leading-tight tracking-tight">Complete Date</p>
                                    <input className="rounded border border-zinc-300 focus:outline-none w-3/4 mt-2 px-3 py-[6.5px]" type="text" id="myCompleteDate" placeholder="Type complete date" />
                                </div>
                            </div>

                            <div className="mt-12">
                                <p className="text-black text-base font-medium leading-tight tracking-tight">Student</p>
                                <Select options={optionModule} onChange={handleChangeStudentID} className="w-[333px] mt-2" placeholder="Telephone numer of student" />
                            </div>

                            <div className=" mt-8 rounded-lg border border-stone-300 h-40 w-full">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const optionModule = [
    { value: "IELTS", label: "IELTS" },
    { value: "TOEIC", label: "TOEIC" },
    { value: "TOEFL", label: "TOEFL" },
];


