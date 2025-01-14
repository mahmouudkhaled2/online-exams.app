"use client"
import Image from 'next/image'
import Logo from '@/../public/assets/images/Final Logo.png'
import Link from 'next/link'
import LogoutButton from '@/components/ui/logout-btn'


export default function Sidebar() {
  return (
    <aside className="w-[17%] px-6 py-10">
        <Image src={Logo} alt="Elevate Final Logo" width={150} height={29} />

        <ul className='mt-10'>

          <li className="bg-main flex gap-10 items-center py-1.5 px-3 my-2 rounded-lg text-white text-xl font-semibold">
            <i className="fa-solid fa-house"></i>

            <Link href="/" >Dashbord</Link>
          </li>

          <li className="flex gap-10 items-center py-1 px-3 mt-4 text-xl font-semibold text-sub-color">
            <i className="fa-solid fa-clock-rotate-left text-main"></i>
            <Link href="/" >Quiz History</Link>
          </li>

        </ul>

        <LogoutButton />
    </aside>
  )
}
