"use client";
import { ProtectedRoute } from '@/app/components/ProtectedRoute';
import { useAuth } from '@/app/context/AuthContext';
import { useSidebarStore } from '@/lib/store';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoMdHome,IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdOutlineMessage,MdExpandMore } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { chatApi } from '@/mocks/chat';
import NewMessagePopup from '@/components/searchUser/SearchUser';

const Sidebar = () => {
    const openSidebar = useSidebarStore((state)=> state.openSidebar)
    const updateSidebar = useSidebarStore((state)=> state.updateSidebar)
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    const {user,logout} = useAuth();
    const [chats,setChats] = useState([]);
    const [page,setPage] = useState(1);
    const [limit,setLimit] = useState(10);
    const [isOpen, setIsOpen] = useState(false);


    let arr = [1,2,3,4,5,6,7,8,9]

    const handleGetAllChats = async (page=1,limit=10)=>{
      try {
        const response = await chatApi.findAllChat(page,limit);

        if(response && response.data && Array.isArray(response.data)){
          if(page > 1)
            setChats([...chats,...response.data]);
          else
            setChats(response.data);
        }

      } catch (error) {
        console.log("find all chat api error ",error);
      }
    }
    useEffect(() => {
      handleGetAllChats(page,limit);
    }, [page,limit])


  return (
    // <div className='h-screen relative'>
    <ProtectedRoute>
        <div className='fixed left-0 lg:top-0 bottom-0 max-lg:right-0 max-lg:bg-[#283048] lg:h-screen max-lg:w-screen flex'>
            
        <div className={`flex lg:flex-col gap-5 lg:justify-center justify-between lg:p-4 px-4 py-2 lg:h-full relative ${openSidebar?'lg:w-[250px]':'lg:w-[80px]'} max-lg:w-full transition-all duration-500 lg:border-r border-t border-[#404658] overflow-y-auto`}>
            <div className={`lg:flex hidden items-center justify-center ${openSidebar?'p-2':''} text-white rounded-lg cursor-pointer font-mono text-[30px] absolute top-2 left-2 w-[calc(100%-32px)] h-20 bg-[#283048]`}>
                <Image className={`${openSidebar?'hidden':'block'}`} src={'/logo/favicon-32x32.png'} alt='Logo' width={32} height={32} />
                <p className={`${openSidebar?'block':'hidden'} transition-all duration-500 max-md:hidden `}>Interactive</p>
            </div>
            <div className={`flex items-center gap-3 p-2 hover:bg-[#404658] ${pathname==='/'?'bg-[#4c5368]':''} text-white rounded-lg cursor-pointer font-mono mt-10`}>
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
            <div onClick={logout} className='lg:flex hidden items-center gap-3 p-2 hover:bg-[#404658] text-white rounded-lg cursor-pointer font-mono absolute bottom-2 left-4 w-[calc(100%-32px)]'>
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
        <div className="fixed bottom-0 right-0 w-[350px]">
          <div>
            <div className='py-2 px-4 bg-slate-900 rounded-t-md'>
              <div className='flex items-center justify-between'>
                <p>Messages</p>
                <button
        className={`hover:bg-slate-400 w-10 h-10 rounded-full flex justify-center items-center`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <MdExpandMore fontSize={25} className={`${isCollapsed?'rotate-180':'rotate-0'} transition-all duration-500 ease-in-out`}/>
      </button>
              </div>
            </div>
      {/* Collapse Button */}
      

      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? 'h-0' : 'h-96'
        } w-full transition-all duration-500 ease-in-out overflow-hidden bg-slate-800 shadow-lg `}
      >
        <div className="text-sm">
          <div className='p-4'>
          <div className='w-full h-10 mb-4 relative'>
            <IoIosSearch fontSize={25} className='absolute left-3 top-2' />
            <input placeholder='Search' className='w-full h-full rounded-full pl-10 text-sm bg-slate-800 outline-none border border-slate-300' />
          </div>
          <h2 className=''>Chats</h2>
          </div>
          <div className='overflow-y-auto h-80 px-4'>
          <div className='flex flex-col gap-4'>
            {chats.map((data, index) =>(
              !data.isGroup ? (<div key={index} className='flex justify-between'>
                <div className='flex gap-3'>
                  <Avatar alt={"Nitish"} src="" className='!w-[30px]!h-[30px]' />
                  <div>
                  <div className='flex gap-1'><p>Nitish Kumar</p> <span> @nitish</span></div>
                  <p>You: hello</p>
                  </div>
                </div>
                <p className='text-xs'>3 hours</p>
              </div>)
              : (<div key={index} className='flex justify-between'>
                <div className='flex gap-3'>
                  <Avatar alt={data.groupName} src={data.picture} className='!w-[30px]!h-[30px]' />
                  <div>
                  <div className='flex gap-1'><p>{data.groupName}</p></div>
                  {data?.messages[0]?.userId===user.id ? <p>You: {data?.messages[0]?.attachments?.length>0 ? 'sent an attachment' : data?.messages[0]?.message}</p>
                  :<p>{data?.messages[0]?.attachments?.length>0 ? 'sent an attachment' : data?.messages[0]?.message}</p>
                }
                  </div>
                </div>
                <p className='text-xs'>3 hours</p>
              </div>)
            ))}
            {(!chats || chats.length===0 )&& <button onClick={() => setIsOpen(true)} className=' bg-indigo-600 text-white py-2 px-4 mt-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 '>
              New Message
            </button>}
            <NewMessagePopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </div>
          </div>
        </div>
      </div>
      </div>
        </div>
        <div className="fixed bottom-0 w-[350px]">
          <div>
            <div className='py-2 px-4 bg-slate-900 rounded-t-md'>
              <div className='flex items-center justify-between'>
                <p>Messages</p>
                <button
        className={`hover:bg-slate-400 w-10 h-10 rounded-full flex justify-center items-center`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <MdExpandMore fontSize={25} className={`${isCollapsed?'rotate-180':'rotate-0'} transition-all duration-500 ease-in-out`}/>
      </button>
              </div>
            </div>
      {/* Collapse Button */}
      

      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? 'h-0' : 'h-96'
        } w-full transition-all duration-500 ease-in-out overflow-hidden bg-slate-800 shadow-lg `}
      >
        <div className="text-sm">
          <div className='p-4'>
          <div className='w-full h-10 mb-4 relative'>
            <IoIosSearch fontSize={25} className='absolute left-3 top-2' />
            <input placeholder='Search' className='w-full h-full rounded-full pl-10 text-sm bg-slate-800 outline-none border border-slate-300' />
          </div>
          <h2 className=''>Chats</h2>
          </div>
          <div className='overflow-y-auto h-80 px-4'>
          <div className='flex flex-col gap-4'>
            {chats.map((data, index) =>(
              !data.isGroup ? (<div key={index} className='flex justify-between'>
                <div className='flex gap-3'>
                  <Avatar alt={"Nitish"} src="" className='!w-[30px]!h-[30px]' />
                  <div>
                  <div className='flex gap-1'><p>Nitish Kumar</p> <span> @nitish</span></div>
                  <p>You: hello</p>
                  </div>
                </div>
                <p className='text-xs'>3 hours</p>
              </div>)
              : (<div key={index} className='flex justify-between'>
                <div className='flex gap-3'>
                  <Avatar alt={data.groupName} src={data.picture} className='!w-[30px]!h-[30px]' />
                  <div>
                  <div className='flex gap-1'><p>{data.groupName}</p></div>
                  {data?.messages[0]?.userId===user.id ? <p>You: {data?.messages[0]?.attachments?.length>0 ? 'sent an attachment' : data?.messages[0]?.message}</p>
                  :<p>{data?.messages[0]?.attachments?.length>0 ? 'sent an attachment' : data?.messages[0]?.message}</p>
                }
                  </div>
                </div>
                <p className='text-xs'>3 hours</p>
              </div>)
            ))}
            {(!chats || chats.length===0 )&& <button onClick={() => setIsOpen(true)} className=' bg-indigo-600 text-white py-2 px-4 mt-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 '>
              New Message
            </button>}
            <NewMessagePopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </div>
          </div>
        </div>
      </div>
      </div>
        </div>
    </ProtectedRoute>
  )
}

export default Sidebar