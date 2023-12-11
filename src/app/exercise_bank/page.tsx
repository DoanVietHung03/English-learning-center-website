import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"

export default function Profile() {
    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />

                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black">
                        Exercises Bank
                    </div>
                    <div className="bg-white rounded pb-3">

                    </div>
                </div>
            </div>
        </>
    )
}    