'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function SignNavList() {

  const pathName =  usePathname();

  return (
    <>
      <nav className="sign-nav-list w-[300px] h-[42px] relative mt-10 ml-auto mr-10">
        <ul className=" flex justify-between items-center">

        <li>
            <span>English <i className="fa-solid fa-caret-down text-[10px]"></i></span>
          </li>


          <li>
            <Link className={`${pathName === '/login' ? 'active' : ''} text-[#4461F2] font-semibold cursor-pointer`} href={"/auth/login"}>Signin</Link>
          </li>

          <li>
            <Link className={`${pathName === '/register' ? 'active' : ''} cursor-pointer`} href={"/auth/register"}>Register</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
