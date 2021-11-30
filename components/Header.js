import React from 'react'
import Image from "next/image"
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
    } from "@heroicons/react/outline"
import { HomeIcon } from "@heroicons/react/solid"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

function Header() {

    const {data: session, status} = useSession();
    const [open, setOpen] = useRecoilState(modalState)
    const router = useRouter()

    return (
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
            <div className='flex justify-between items-center max-w-6xl mx-5 xl:mx-auto'>
                {/* Left */}
                <div onClick={() => router.push('/')} className='relative hidden lg:inline-grid w-24 h-10 cursor-pointer'>
                    <Image 
                        src='https://links.papareact.com/ocw'
                        layout='fill'
                        objectFit='contain'
                    />
                </div>
                <div onClick={() => router.push('/')} className='relative lg:hidden w-10 h-10 flex-shrink-0 cursor-pointer'>
                    <Image 
                        src='https://links.papareact.com/jjm'
                        layout='fill'
                        objectFit='contain'
                    />
                </div>

                {/* Middle */}
                <div className='max-w-xs'>
                    <div className='relative mt-1 p-3 rounded-md'>
                        <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                            <SearchIcon className='h-5 w-5 text-gray-500' />
                        </div>
                        <input className='bg-gray-50 pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded'  type="text" placeholder='Search' />
                    </div>
                </div>

                {/* Right */}
                <div className='flex items-center justify-end space-x-4'>
                    <HomeIcon onClick={() => router.push('/')} className='navBtn' />
                    <MenuIcon className='h-6 md:hidden cursor-pointer' />
                    {session ? (
                        <>
                        <div className='navBtn relative'>
                            <PaperAirplaneIcon className='navBtn rotate-45' />
                            <div className="absolute -top-1 -right-2 text-xs w-5 h-5 text-white bg-red-500 flex items-center rounded-full justify-center animate-pulse">3</div>
                        </div>
                        <PlusCircleIcon onClick={() => setOpen(true)} className='navBtn' />
                        <UserGroupIcon className='navBtn' />
                        <HeartIcon className='navBtn' />
    
                        <img src={session?.user?.image} alt="profile pic"
                            className='h-10 rounded-full w-10 cursor-pointer'
                            onClick={signOut}
                         />
                         </>
                    ) : (
                            <button onClick={signIn}>Sign In</button>
                        )}
                </div>
            </div>

        </div>
    )
}

export default Header
