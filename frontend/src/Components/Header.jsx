import React from 'react'

import { AppBar  , Toolbar , styled ,InputBase} from "@mui/material";
import logo from  "../assets/gmaillogo.png"



const Header = () => {

  return (
        <div className='bg-[#f5f5f5] static flex w-full justify-between py-[1.5vw] px-[1vw]'>
          <div className='flex justify-center items-center'>
           <i className="ri-menu-line text-black/50 text-[2.1vw] cursor-pointer"></i>
           <img src={logo} className="h-[2.6vw] w-[2.6vw] mx-[1vw]" alt="" />
           <h1 className="text-black/50  font-normal text-[2.1vw]">Gmail</h1>
          </div>
          <div className="bg-[#EAF1FB] py-[.1vw] px-[1vw] rounded-full w-[50%] flex items-center">
            <div className="flex items-center w-full">
              <i className="ri-search-line text-black/50 text-[1.5vw]"></i>
              <input type='email' className="ml-[1.7vw] w-full bg-transparent outline-none" 
               placeholder='Search Mail'
              />
            </div>
            <i class="ri-equalizer-line text-black/50 text-[1.5vw] ml-auto"></i>
          </div>
          <div className='flex gap-3'>
           <i className="ri-question-line text-black/50 text-[2.1vw] cursor-pointer"></i>
           <i className="ri-settings-3-line text-black/50 text-[2.1vw] cursor-pointer"></i>
           <i className="ri-apps-2-line text-black/50 text-[2.1vw] cursor-pointer"></i>
           <i className="ri-account-circle-line text-black/50 text-[2.1vw] cursor-pointer"></i>
          </div>
        </div>
  );
}

export default Header