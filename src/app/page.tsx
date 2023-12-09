import './globals.css'

import Link from 'next/link'
import Istudent from '@/components/icons/icon_student'
import Iteacher from '@/components/icons/icon_teacher'
import Iadmin from '@/components/icons/icon_admin'
import Icheck from '@/components/icons/icon_check'
export default function Home() {
  return (
    <body className="bg-white">
      <div className="relative justify-center items-center m-20">
        <div className="text-center text-black text-4xl font-normal leading-tight tracking-tight">Please
          select your</div>
        <div className="text-center text-black text-7xl font-bold leading-tight tracking-tight">USER TYPE
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="flex items-center justify-center ml-56">
          <button
            className="flex-col justify-center items-center w-48 transition transform hover:bg-primary focus:bg-primary rounded-2xl border-2 shadow-2xl border-primary">
            <Istudent className='fill-[#7F7F7F] w-44 h-44 transition-colors hover:fill-white' />
            <div
              className="text-center rounded-2xl text-zinc-500 text-2xl font-normal leading-tight tracking-tight">
              Student
            </div>
          </button>
        </div>

        <div className="flex items-center justify-center">
          <button
            className="flex-col justify-center items-center w-48 transition transform hover:bg-primary focus:bg-primary rounded-2xl border-2 shadow-2xl border-primary">
            <Iteacher className='fill-[#7F7F7F] w-44 h-44 transition-colors hover:fill-white' />
            <div
              className="text-center rounded-2xl text-zinc-500 text-2xl font-normal leading-tight tracking-tight">
              Teacher
            </div>
          </button>
        </div>

        <div className="flex items-center justify-center mr-56">
          <button
            className="flex-col justify-center items-center w-48 transition transform hover:bg-primary focus:bg-primary rounded-2xl border-2 shadow-2xl border-primary">
            <Iadmin className='fill-[#7F7F7F] w-44 h-44 transition-colors hover:fill-white' />
            <div
              className="text-center text-zinc-500 text-2xl font-normal leading-tight tracking-tight">
              Admin
            </div>
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center mt-12">
        <Link href="/login">
          <button
            className="flex justify-center items-center text-center text-zinc-500 text-3xl leading-tight tracking-tight mr-4 font-semibold transition transform hover:scale-110 active:scale-100">
            <Icheck className='w-24 h-24 rounded-full hover:bg-slate-400' />
          </button>
        </Link>
      </div>
    </body>
  )
}

