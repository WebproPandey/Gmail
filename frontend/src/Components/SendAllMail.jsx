import React, { useState } from 'react'
import { useLocation } from 'react-router';

const SendAllMail = () => {
    const [isOpen , setIsOpen]  = useState(false)

    const location = useLocation();
    const email = location.state?.email; 
  
    if (!email) {
      return <div className="h-full w-full flex justify-center items-center">No email selected</div>;
    }
  

    const handelopen  = () =>{
        setIsOpen(!isOpen)
    }

  return (
    <div className='h-full w-full bg-black/20 '>
      <div className="w-full h-[10vh] text-center bg-black/20 py-[1vh]">Send All Messages</div>
      <div className="mailinbox w-full min-h-full overflow-y-auto    ">

      <div onClick={handelopen} className={`${isOpen ? 'h-[12vh]' : 'h-[10vh]' }   cursor-pointer bg-[#F2F6FC] w-full flex justify-between  items-center gap-3`}>
        <div className='h-full w-[10%] flex justify-center  items-center   '>
         <div className="user h-[8vh] w-[8vh] rounded-full  bg-black/40"></div>
        </div>

        <div className={`info w-[70%] leading-none h-full flex flex-col items-start justify-start pt-[0.5vw] `} >
            <div className='text-[1.3vw] font-medium  text-black'> <strong>To:</strong> {email.recipients}</div>

            {isOpen ? <i className='ri-arrow-down-s-fill'></i> : " "}
            <div className={`text-[1.2vw] font-medium  text-black ${isOpen ? 'line-clamp-2' : 'line-clamp-1'}`}>{email.message} </div>
        </div>

        <div className='dateinfo flex h-full justify-around items-start gap-2 w-[20%] pt-[0.5vw] '>
           {new Date(email.createdAt).toLocaleString()}
        </div>
        <div className='h-full w-[5%] '>
        <div className='star h-[6vh] w-[6vh] rounded-full   flex justify-center items-center hover:bg-black/20'>
               <i className='ri-star-line text-[1.2vw] text-black/50'></i>
        </div>
        </div> 
        
      </div>

      </div>

    </div>
  )
}

export default SendAllMail