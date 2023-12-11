import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import RPtype from "./reportType_dropdown"

export default function create_RP() {
    return (
        <>
            <body>
                <Header />
                <div className="flex">
                    <SideBar />
                    <div className="ml-14 w-2/3">
                        <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black pb-2">
                            Feedback and Bug report
                        </div>

                        <div className="bg-white rounded">
                            <div className="flex items-center">
                                <div className="mt-12 ml-14 w-1/3">
                                    <p className="text-black text-base font-medium leading-tight tracking-tight">Title of report (*)</p>
                                    <textarea className="w-full h-12 rounded-md border border-zinc-400 focus:outline-none mt-3 pt-2 pl-2" name="" id="myTitle" placeholder="Title of the content you wish to report"></textarea>
                                </div>

                                <div>
                                    <p>Type of report</p>
                                    <RPtype />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </body>
        </>
    )
}