import Header from "@/components/layout/header";
import SideBar from "@/components/layout/sideBar";
import CourseInfo from "@/components/layout/courseInfo";

export default function CourseList() {
    return (
        <>
            <Header />
            <div className='flex gap-6'>
                <SideBar />
                <div className="w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black">
                        Courses List
                    </div>
                    <div className="flex flex-col gap-4">
                        <CourseInfo />
                        <CourseInfo />
                        <CourseInfo />
                    </div>
                </div>
            </div>
        </>
    )
}