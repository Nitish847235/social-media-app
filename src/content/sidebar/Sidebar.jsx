"use client";
import { ProtectedRoute } from '@/app/components/ProtectedRoute';
import { useSidebarStore } from '@/lib/store';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { IoMdHome,IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdOutlineMessage,MdDensityMedium } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";

const Sidebar = () => {
    const openSidebar = useSidebarStore((state)=> state.openSidebar)
    const updateSidebar = useSidebarStore((state)=> state.updateSidebar)
    const pathname = usePathname();

  return (
    // <div className='h-screen relative'>
    <ProtectedRoute>
        <div className='fixed left-0 lg:top-0 bottom-0 max-lg:right-0 max-lg:bg-[#283048] lg:h-screen max-lg:w-screen flex'>
            
        <div className={`flex lg:flex-col gap-5 lg:justify-center justify-between lg:p-4 px-4 py-2 lg:h-full relative ${openSidebar?'lg:w-[250px]':'lg:w-[80px]'} max-lg:w-full transition-all duration-500 lg:border-r border-t border-[#404658]`}>
            <div className={`lg:flex hidden items-center justify-center ${openSidebar?'p-2':''} text-white rounded-lg cursor-pointer font-mono text-[30px] absolute top-2 left-2 w-[calc(100%-32px)] h-20`}>
                <Image className={`${openSidebar?'hidden':'block'}`} src={'/logo/favicon-32x32.png'} alt='Logo' width={32} height={32} />
                <p className={`${openSidebar?'block':'hidden'} transition-all duration-500 max-md:hidden `}>Interactive</p>
            </div>
            <div className={`flex items-center gap-3 p-2 hover:bg-[#404658] ${pathname==='/'?'bg-[#4c5368]':''} text-white rounded-lg cursor-pointer font-mono`}>
                <IoMdHome fontSize={25} />
                <p className={`${openSidebar?'block':'hidden'} transition-all duration-500 max-md:hidden `}>Home</p>
            </div>
            <div className='flex items-center gap-3 p-2 hover:bg-[#404658] text-white rounded-lg cursor-pointer font-mono'>
                <IoSearch fontSize={25} />
                <p className={`${openSidebar?'block':'hidden'} transition-all duration-500 max-md:hidden `}>Search</p>
            </div>
            <div className='flex items-center gap-3 p-2 hover:bg-[#404658] text-white rounded-lg cursor-pointer font-mono'>
                <IoMdAdd fontSize={25} />
                <p className={`${openSidebar?'block':'hidden'} transition-all duration-500 max-md:hidden `}>Create</p>
            </div>
            <div className='flex items-center gap-3 p-2 hover:bg-[#404658] text-white rounded-lg cursor-pointer font-mono'>
                <MdOutlineMessage fontSize={25} />
                <p className={`${openSidebar?'block':'hidden'} transition-all duration-500 max-md:hidden `}>Message</p>
            </div>
            <div className='flex items-center gap-3 p-2 hover:bg-[#404658] text-white rounded-lg cursor-pointer font-mono'>
                <Avatar alt="Nitish" src="" className='!w-[25px] !h-[25px]' />
                <p className={`${openSidebar?'block':'hidden'} transition-all duration-500 max-md:hidden `}>Profile</p>
            </div>
            <div className='lg:flex hidden items-center gap-3 p-2 hover:bg-[#404658] text-white rounded-lg cursor-pointer font-mono absolute bottom-2 left-4 w-[calc(100%-32px)]'>
                <RiLogoutCircleLine fontSize={25}/>
                <p className={`${openSidebar?'block':'hidden'} transition-all duration-500 max-md:hidden `}>Logout</p>
            </div>

        </div>
        <div
            onClick={updateSidebar}
            className={`text-white z-50 ${openSidebar? "rotate-0" : "rotate-180"} transition-all duration-500 h-full w-8  group lg:flex hidden justify-center items-center`}
          >
            <div className="cursor-pointer flex group-hover:md:flex h-6 w-6 flex-col items-center">
            <div
              style={{
                transform: "translateY(0.15rem) rotate(15deg) translateZ(0px)",
              }}
              className="h-3 w-1 rounded-full bg-[#adadad]"
            ></div>
            <div
              style={{
                transform:
                  "translateY(-0.15rem) rotate(-15deg) translateZ(0px)",
              }}
              className="h-3 w-1 rounded-full bg-[#adadad]"
            ></div>
          </div>
          </div>
        </div>
    </ProtectedRoute>
  )
}

export default Sidebar