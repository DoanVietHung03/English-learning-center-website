import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"

export default function Ass_Reading() {
    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black">
                        Assignments
                    </div>
                    <div className="mt-4 bg-white rounded-lg">
                        <div className="p-2 ml-2 font-poppins text-xs">[INTER_CLASSName] aoe - Q.5 ClassNameRoom IELTS 5.5 6.5 | 25/09/2023 Writing, Speaking, Writing Task 1, Writing Task 2</div>
                    </div>

                    <div className="bg-white mt-2 pb-8 rounded">
                        <div className="flex items-center justify-end py-2 border-b border-stone-300 mx-4">
                            <Link href={''}>
                                <button className="flex items-center bg-lime-300 rounded-lg px-3 py-1 font-poppins text-sm">
                                    Submit
                                </button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 mt-4 py-4 mx-4 gap-6">
                        <div className="rounded-lg border border-stone-300 pl-6 py-8 pr-4 overflow-y-scroll h-96">
                            <span className="text-black text-lg font-bold font-['Poppins']">Deforestation in the 21st century<br/></span>
                            <span className="text-black text-lg font-normal font-['Poppins']">When it comes to cutting down trees, satellite data reveals a shift from the patterns of the past<br/><br/>A Globally, roughly 13 million hectares of forest are destroyed each year. Such deforestation has long been driven by farmers desperate to earn a living or by loggers building new roads into pristine forest. But now new data appears to show that big, block clearings that reflect industrial deforestation have come to dominate, rather than these smaller-scale efforts that leave behind long, narrow swaths of cleared land. Geographer Ruth DeFries of Columbia University and her colleagues used satellite images to analyse tree-clearing in countries ringing the tropics, representing 98 per cent of all remaining tropical forest. Instead of the usual `fish bone` signature of deforestation from small-scale operations, large, chunky blocks of cleared land reveal a new motive for cutting down woods.<br/><br/>B In fact, a statistical analysis of 41 countries showed that forest loss rates were most closely linked with urban population growth and agricultural exports in the early part of the 21st century - even overall population growth was </span>
                        </div>

                        <div className="bg-orange-100 bg-opacity-40 rounded-lg shadow-lg border flex-col justify-start items-center inline-flex p-4">
                            <textarea className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none h-96" id="myText" placeholder="Type..."></textarea>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}