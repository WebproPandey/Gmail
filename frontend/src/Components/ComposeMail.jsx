import React from 'react'

const ComposeMail = ({mailtoogelButton}) => {
  const sendMail = () =>{
    mailtoogelButton()
  }
  return (
    <div className='h-full w-full fixed top-0 left-0 bg-black/50 flex justify-center  items-center' >
        <div className='mailwraper w-[70%] h-[90%] bg-white relative  rounded-lg px-[1vw]'>
          <div className='flex justify-between  items-center'>
            <div className='text-[1.1vw] font-medium text-black/50' >New Message</div>
            <div onClick={mailtoogelButton} className='close  cursor-pointer'>
             <i className="ri-close-fill text-[2vw] text-black/50"></i>
            </div>
           </div>
           <div className='mailBox w-full h-full relative   '>
            <div className='flex flex-col w-full'>
             <input type="text" className='py-[.4vw] pl-[.2vw] outline-none w-full border-b-[1px]' placeholder='Recipients ' />
             <input type="text" className='py-[.4vw] pl-[.2vw] outline-none w-full border-b-[1px]' placeholder='Subject ' />
            </div>
            <div className='w-full flex-grow h-[60%]  bg-black/30 '>
             <textarea  className='w-full h-full border-none resize-none px-[1vw] py-[0.5vw] '      placeholder="Write your message..." ></textarea>
            </div>
            <div className="flex justify-between items-center gap-3 mt-2 w-full h-[15%]  ">
                
            <button  onClick={() => sendMail()} className="focus:outline-none bg-blue-600 px-6 py-2 rounded-full text-white font-medium">
              Send
            </button>
            <div onClick={mailtoogelButton} className='cursor-pointer'>
              <i className="ri-delete-bin-3-line text-[1.5vw]"></i>
            </div>
            

            </div>
            </div>

        </div>

    </div>
  )
}

export default ComposeMail