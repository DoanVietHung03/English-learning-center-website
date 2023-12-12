import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"

export default function Ass_Reading() {
    return (
        <>
            <Header />
            <div className="flex">
                <SideBar />
                <div className="ml-14 w-2/3">
                    <div className="mb-4 mt-4 font-poppins font-bold text-5xl border-b border-black">
                        Exercises Bank
                    </div>
                    <div className="mt-4 bg-white rounded-lg">
                        <div className="p-2 ml-2 text-black text-base font-semibold font-['Poppins']">IELTS Academic Grammar 0 - 2.5 | Tân ngữ</div>
                    </div>

                    <div className="bg-white mt-2 pb-8 rounded">
                        <div className="grid grid-cols-2 pt-[22px] pb-[6px] mb-2 border-b border-stone-300 ml-[25px] mr-[25px] gap-3">
                            <div className="text-black text-base font-semibold font-poppins">
                                Answers Keys:
                            </div>

                            <div className="text-black text-base font-semibold font-poppins">
                                Your Answers
                            </div>
                        </div>

                        <div className="grid grid-cols-2 mt-[34px] ml-[25px] mr-[25px] pb-6 gap-3">
                            <div className="rounded-lg border border-stone-300">
                                <div className="text-black text-base font-poppins h-[450px] pl-5 pt-8">
                                    Tân ngữ trực tiếp và Tân ngữ gián tiếp<br />1. a present/them <br />2. us/ - <br />3. Playing soccer /-<br />
                                    4. Listening to music /- <br />5. a homework assignment/us<br />6. a colorful backpack/ me <br />
                                    7. when the school bus would arrive/me <br />8. what the weather will be like tomorrow /-
                                </div>
                            </div>

                            <div className="rounded-lg border border-stone-300 pl-5 pt-8">
                                <div className="text-black text-base font-poppins">Alo 1234<br />Alo 4321<br />put your head on my shoulde<br />
                                    hold me in your arms, baby<br />Squeeze me oh-so-tight<br />Show me that you love me too<br />
                                    put your lips next to mine, dear<br />won’t you kiss me once, baby?</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}