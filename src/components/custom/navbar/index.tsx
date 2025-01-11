'use client'

import Image from 'next/image';
import profileImage from '@/../public/assets/images/user-profile-black.png'

export default function Navbar() {
      return (
          <>
            <nav className=" h-[60px]">
              <div className="h-full flex items-center justify-between">

                <div className=" md:hidden text-white text-lg">
                  <i className="fa-solid fa-bars"></i>
                </div>

                {/* Search Bar */}
                <div className="form-control w-[75%] relative">
                  <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 translate-y-[-50%] text-[21px] text-main"></i>
                  <input type="text" placeholder="Search Quiz" className=" py-4 px-12 text-sm text-gray-500 rounded-2xl shadow-lg  md:w-auto focus:border-none focus:outline-none " />
                </div>

                <button className="bg-blue-600 py-3 px-16 rounded-2xl text-md  text-white">Start Quiz</button>
                
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="w-[61px] h-[61px] btn btn-ghost btn-circle avatar">
                    <div className=" rounded-full">
                      <Image alt="Profile Avatar" src={profileImage} className='w-full' />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                  </ul>
                </div>
              </div> 
            </nav>
          </>
      )
}
