"use client"
import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import { SyntheticEvent, useState } from "react"
import Select from "react-select";

const options = [
    { value: "Student", label: "Student" },
    { value: "Teacher", label: "Teacher" },
];

export default function Register() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');

    const handleChange = (ev) => {
        setType(ev.value);
        console.log(type);
    };
    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ phone, password, type }),
            headers: { 'Content-Type': 'application/json' },
        })
    }

    return (
        <>
            <Header />
            <div className="flex gap-6">
                <SideBar />
                <div className="w-2/3">
                    <div className="mb-4 pb-4 font-poppins font-bold text-5xl border-b-2 border-black">
                        Register
                    </div>
                    <div className="bg-white h-full">
                        <form className="m-9 pt-4 block max-w-xl mx-auto">
                            <input className="block w-full bg-gray-200 px-4 py-2 rounded-lg mb-2" type="phone" placeholder="phone" value={phone}
                                onChange={ev => setPhone(ev.target.value)} />
                            <input className="block w-full bg-gray-200 px-4 py-2 rounded-lg mb-4" type="password" placeholder="password" value={password}
                                onChange={ev => setPassword(ev.target.value)} />
                            <div>User Type</div>
                            <Select options={options} onChange={handleChange} autoFocus={true} className="mb-3" />
                            <button className="w-full" type="submit" onClick={handleFormSubmit}>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}