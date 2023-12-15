import SideBar from "@/components/layout/sideBar"
import Header from "@/components/layout/header"
import Link from "next/link"

export default function ExBank() {
    const [title, setTitle] = useState('')
    
    const [content, setContent] = useState()
    const [skill, setError] = useState(false)
    var [student_added, setStudentAdded] = useState([])
    const router = useRouter();
    const handleDelete = (index) => {
        // Tạo một bản sao mới của mảng và loại bỏ phần tử tại chỉ mục index
        const updatedArray = [...student_added.slice(0, index), ...student_added.slice(index + 1)];

        // Cập nhật state với mảng mới
        setStudentAdded(updatedArray);
    };
    const handleChangeModule = (ev) => {
        setModule(ev.value);
    };
    const handleChangeTeacher = (ev) => {
        setTeacher(ev.value);
    };

    const handleChangeStudentID = (ev) => {
        setStudent(ev.value)
        var temp = ev.value
        if (!student_added.includes(temp)) {
            student_added.push(temp)
        }
        console.log(student_added)
    }
    console.log(student_added)
    async function handleFormSubmit(ev: SyntheticEvent) {
        ev.preventDefault()
        const response = await fetch('/api/course', {
            method: 'POST',
            body: JSON.stringify({ title, module, teacher, sDate, cDate, student_added }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (!response.ok)
            setError(true)
        else {

            router.push('/assignments')
        }
    }
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => {
                setTeachers(data.teachers)
                setStudents(data.students)
            })
    }, []);
    const optionTeachers = teachers.map(
        function (teacher) {
            return {
                value: teacher.phone + " - " + teacher.name,
                label: teacher.phone + " - " + teacher.name
            }
        }
    );
    const optionStudents = students.map(
        function (student) {
            return {
                value: student.phone + " - " + student.name,
                label: student.phone + " - " + student.name
            }
        }
    );
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
                        <div className="flex items-center justify-end py-2 border-b border-stone-300 mx-4">
                            <Link href={''}>
                                <button className="flex items-center bg-lime-300 rounded-lg px-3 py-1 font-poppins text-sm">
                                    Submit
                                </button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 mt-4 py-4 mx-4 gap-6">
                            <div className="rounded-lg border border-stone-300 pl-6 py-8 pr-4 overflow-y-scroll h-[450px]">
                                <span className="text-black text-base font-normal font-['Poppins']">Tân ngữ là các danh từ hoặc đại từ đứng sau và bổ nghĩa cho động từ hoặc giới từ. Tân ngữ thường trả lời cho các câu hỏi như “what” (cái gì), “where” (ở đâu) và “when” (khi nào). Ngoài danh từ, bất cứ cụm từ nào có chức năng như một danh từ, chẳng hạn cụm danh từ, mệnh đề danh từ, danh động từ và Infinitives (động từ nguyên mẫu có to), đều có thể làm tân ngữ.<br/>Các loại tân ngữ:<br/>Tân ngữ trực tiếp (Direct object): Tân ngữ trực tiếp là tân ngữ nhận tác động trực tiếp của động từ trong câu. Đối với các động từ chỉ có một tân ngữ theo sau thì tân ngữ đó chính là tân ngữ trực tiếp.<br/>Tân ngữ gián tiếp (Indirect object): Tân ngữ gián tiếp là tân ngữ nhận tác động của động từ một cách gián tiếp, nghĩa là phải thông qua một đối tượng trực tiếp nhận hành động trước đó. Tân ngữ gián tiếp thường là đối tượng được hành động hướng tới thông qua tân ngữ trực tiếp<br/></span>
                                <span className="text-black text-base font-normal font-['Poppins']">Xác định tân ngữ trực tiếp và gián tiếp (nếu có) trong các câu dưới đây<br/></span>
                                <span className="text-black text-base font-normal font-['Poppins']">She gave them a present for their birthday.<br/>They invited us to their party<br/>I like playing soccer with my friends.<br/>She enjoys listening to music in her free time.<br/>The teacher gave us a homework assignment to complete.<br/>My parents bought me a colorful backpack for school.<br/>She asked me when the school bus would arrive.</span>
                            </div>

                            <div className="bg-orange-100 bg-opacity-40 rounded-lg shadow-lg border flex-col items-center inline-flex p-4">
                                <textarea className="w-full rounded-lg border border-zinc-400 p-3 focus:outline-none h-96" id="myText" placeholder="Type..."></textarea>

                                <div className="w-full flex items-center mr-12 mt-10 justify-end">
                                    <Link href={"/exbank_result"}>
                                        <button className="rounded-md bg-lime-200 hover:bg-lime-300 px-3 py-1 font-medium leading-tight tracking-tight">
                                            View result
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}