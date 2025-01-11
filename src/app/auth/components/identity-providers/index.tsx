'use client'

import Image from 'next/image'
import googleIcon from '@/../public/assets/images/google-icon.png'
import twitterIcon from '@/../public/assets/images/twitter-icon.png'
import facebookIcon from '@/../public/assets/images/facebook-icon.png'
import githubIcon from '@/../public/assets/images/github-icon.png'
import { signIn } from 'next-auth/react'


export default function IdentityProviders() {

  return (
    <>
        <div className='max-w-md mx-auto my-7'>
            <ul className='flex justify-center items-center gap-5'>
                <li>
                    <button 
                    type="button"
                    onClick={() => signIn('google', {callbackUrl: '/'})} 
                    className='p-3 flex justify-center items-center border border-[#e0e0e9] rounded-xl shadow-lg'>
                        <Image className='w-6' src={googleIcon} alt="Google Icon" />
                    </button>
                </li>


                <li>
                    <button 
                    type="button" 
                    onClick={() => signIn('twitter', {callbackUrl: "/"})}
                    className='p-3 flex justify-center items-center border border-[#e0e0e9] rounded-xl shadow-lg'>
                        <Image className='w-6' src={twitterIcon} alt="Twitter Icon" />
                    </button>
                </li>



                <li>
                    <button 
                    type="button"
                    onClick={() => signIn('facebook', {callbackUrl: '/'})} 
                    className='p-3 flex justify-center items-center border border-[#e0e0e9] rounded-xl shadow-lg'>
                        <Image className='w-6' src={facebookIcon} alt="Facebook Icon" />
                    </button>
                </li>



                <li>
                    <button 
                    type="button"
                    onClick={() => signIn('github', {callbackUrl: '/'})} 
                    className='p-3 flex justify-center items-center border border-[#e0e0e9] rounded-xl shadow-lg'>
                        <Image className='w-6' src={githubIcon} alt="Github Icon" />
                    </button>
                </li>
            </ul>
        </div>
    </>
  )
}
