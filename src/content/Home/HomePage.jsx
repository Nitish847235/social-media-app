"use client";
import { useSidebarStore } from '@/lib/store';
import { Avatar, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { IoIosMore ,IoIosShareAlt} from "react-icons/io";
import { MdFavoriteBorder,MdFavorite } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";




const HomePage = () => {
  const openSidebar = useSidebarStore((state)=> state.openSidebar);
  const [like, setLike] = useState(false);
  const [message, setMessage] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (e) => {
    if(message === '' && e.target.value === '\n'){
      return;
    }
      setMessage(e.target.value);
  };


  useEffect(() => {
    if (message?.trim() === '') {
      document.getElementById('inputTextArea').style.height = 'auto';
    }
  },[message])

  const handleResize = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto'; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + 'px'; // Set height to scroll height
    if (textarea.value.trim() === '') {
      textarea.style.height = 'auto';
    }
  };

  return (
    <div className={`${openSidebar?'lg:ml-[282px]':'lg:ml-[112px]'} transition-all duration-500 h-full`}>
        <div>
          <div>
            <div className='w-[470px] mx-auto border border-[#404658] py-4 rounded-md '>
                <div className='flex gap-4 px-4'>
                  <Avatar className='-z-10'/>
                  <div className='w-[390px]'>
                    <p className='text-[14px] flex items-center gap-1'>Nitish <span className='w-1 block h-1 rounded bg-[#8F8F8F] ml-1'></span><span className='text-[#8F8F8F]'>2d</span></p>
                    <p className='text-[12px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, veritatis.</p>
                  </div>
                  <div onClick={handleClick} className='h-10 flex items-center justify-center cursor-pointer'>
                    <IoIosMore fontSize={24} />
                  </div>
                  <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            backgroundColor: '#3c4455',
            color:'#ffffff',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: '#3c4455',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} className='text-[14px]'>
          Go to post
        </MenuItem>
        <MenuItem onClick={handleClose} className='text-[14px]'>
          Share
        </MenuItem>
        <MenuItem onClick={handleClose} className='text-[14px]'>
          Copy link
        </MenuItem>
        <MenuItem onClick={handleClose} className='text-[14px]'>
          About Account
        </MenuItem>
      </Menu>
                </div>
                <div className='px-4 my-2'>
                  <p className='text-[13px] font'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, itaque maxime. Aut quae alias nihil laborum, modi nobis aspernatur laboriosam incidunt facilis facere. Officiis cupiditate nihil in eveniet, facere vero sed odit incidunt beatae? Recusandae assumenda obcaecati quos beatae vitae, laboriosam neque magnam, fuga explicabo repudiandae placeat sint nostrum modi?</p>
                </div>
                <div className='w-full cursor-pointer' onDoubleClick={()=> setLike(true)} >
                  <Image src={'/nitish_photo.jpg'} width={470} height={600} />
                </div>
                <div className='p-4 flex items-center gap-4'>
                    <div>
                      {like ? <MdFavorite className='cursor-pointer' onClick={()=> setLike(false)} color='#FF3040' fontSize={30} />
                      : <MdFavoriteBorder className='cursor-pointer' onClick={()=> setLike(true)} color='#ccc' fontSize={30} />}
                    </div>
                    <div>
                        <FaRegComment className='cursor-pointer' fontSize={25} color='#ccc' />
                    </div>
                    <div>
                        <IoIosShareAlt className='cursor-pointer' fontSize={25} color='#ccc' />
                    </div>
                </div>
                <div className='px-4 py-2'>
                  <div className='border rounded-3xl px-2 min-h-8 flex justify-center relative -z-10'>
                    <textarea id="inputTextArea" className='w-full m-1 text-[14px] bg-transparent focus:outline-none resize-none' value={message}
          onChange={handleInputChange}
          placeholder="Add comment..."
          onInput={handleResize} // Handle resizing when input changes
      rows={1}/>
                  {message.trim().length>0 && <button disabled={message.length===0?true:false} className={`font-mono font-semibold ${message.length===0?'text-[#848484]':'text-[#99ccff]'} absolute bottom-0 right-4 h-8`}>Post</button>}
                  </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default HomePage