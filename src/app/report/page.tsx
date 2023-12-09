import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
export default function RP() {
    return (
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
                            <div>
                                <p>Title of report</p>
                                <input type="text" />
                            </div>

                            <div>
                                <p>Type of report</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}