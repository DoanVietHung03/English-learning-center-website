import Iuser from '../icons/icon_user'
import Link from 'next/link'
export default function Header() {
    return (
        <header>
            <div className='bg-white flex justify-between px-3 py-3 items-center'>
                <Link href={'/courseList'}>
                    <div className='ml-3 flex items-center gap-4'>
                        <div>
                            <img className='w-24 h-24' src="/icon.png" alt="" />
                        </div>
                        <h1 className='font-bold text-5xl text-primary'>Academy Of English</h1>     
                    </div>
                </Link>
                <div className='mr-2'>
                    <Link href={'/setting_profile'}>
                        <Iuser />
                    </Link>
                </div>
            </div>
        </header>)
}