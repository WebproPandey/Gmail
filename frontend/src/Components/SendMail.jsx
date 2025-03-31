import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmails , moveToBin , archiveEmail} from '../Redux/emailSlice';
import { useNavigate } from 'react-router';
const formatDate = (createdAt) => {
  const emailDate = new Date(createdAt);
  const now = new Date();

  const isToday =
    emailDate.getDate() === now.getDate() &&
    emailDate.getMonth() === now.getMonth() &&
    emailDate.getFullYear() === now.getFullYear();

  if (isToday) {
    return emailDate.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hourCycle: 'h12', 
   });
  } else {
    const diffInTime = now - emailDate;
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

    if (diffInDays === 1) {
      return '1 day ago';
    } else {
      return `${diffInDays} days ago`;
    }
  }
};

const SendMail = () => {
  const dispatch = useDispatch();
  const { emails, status, error } = useSelector((state) => state.emails);
  const navigate =  useNavigate()
  const [isread , SetIsread] =   useState({}); 
  const sentEmails = emails.filter((email) => !email.draft);

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);

  
  const handleDelete = (id) => {
    dispatch(moveToBin(id));
  };
  const handleArchive = (id) => {
    dispatch(archiveEmail(id));
  };

  const handleRead = (id) => {
    SetIsread((prev) => ({
      ...prev,
      [id]: !prev[id], 
    }));
  }
  const handleMail = (email) => {
    navigate('/mailbox/mail', { state: { email } }); 
   

  }


  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-full w-full bg-black/20 ">
      <div className="w-full h-[10vh] text-center bg-black/20 py-[1vh]">Send Messages</div>
      <div className="mailinbox w-full min-h-full overflow-y-auto    ">
        {sentEmails.map((email) => (
          <div  key={email._id} 
          className={`mail w-full h-[8vh] ${isread[email._id]  ? 'bg-[#F2F6FC]' : 'bg-black/30' }  border-[0.4px] border-black/30 flex justify-center  items-center px-[1vw] relative group transition-all duration-300  z-[1] hover:shadow-lg hover:z-[2] hover:border-[1.5px] `}>

             <div className="w-[20%] flex justify-evenly  items-center bg-white h-full absolute right-0 top-0 opacity-0 group-hover:opacity-[1] transition-all  duration-300  ease-out">

              <div onClick={() => handleDelete(email._id)} className='delete h-[6vh] w-[6vh] rounded-full   flex justify-center items-center hover:bg-black/20'>
               <i className='ri-delete-bin-4-line text-[1.2vw] text-black/50'></i>
              </div>
               
              <div onClick={() => handleArchive(email._id)} className='archive h-[6vh] w-[6vh] rounded-full   flex justify-center items-center hover:bg-black/20'>
               <i className='ri-inbox-archive-line  text-[1.2vw] text-black/50'></i>
              </div>

              <div  onClick={() =>handleRead(email._id)} className='mail h-[6vh] w-[6vh] rounded-full   flex justify-center items-center hover:bg-black/20'>
              {isread[email._id] ? (
                  <i className="ri-mail-open-line text-[1.2vw] text-black/50"></i>
                ) : (
                  <i className="ri-mail-line text-[1.2vw] text-black/50"></i>
                )}              </div>
              <div className='time h-[6vh] w-[6vh] rounded-full   flex justify-center items-center hover:bg-black/20'>
               <i className='ri-time-line text-[1.2vw] text-black/50'></i>
              </div>
              
             </div>
            <div className="left h-full w-[20%] flex justify-start items-center gap-3">
            <div  className='Checkbox h-[6vh] w-[6vh] rounded-full   flex justify-center items-center hover:bg-black/20'>
              <div className='h-[2.4vh] w-[2.4vh] border border-black/20 rounded-sm'></div>
            </div>

              <div className='star h-[6vh] w-[6vh] rounded-full   flex justify-center items-center hover:bg-black/20'>
               <i className='ri-star-line text-[1.2vw] text-black/50'></i>
              </div>  
              <div>UserName</div>
            </div>

            <div onClick={() => handleMail(email)} className="mid h-full w-[60%] cursor-pointer ">
              <div className="flex justify-start items-center gap-3 h-full w-full">
                <div className="subject capitalize font-medium text-black">{email.subject}</div>
                <div className="message text-[1.2vw] text-black/80 line-clamp-1">
                  {email.message}
                </div>
              </div>
            </div>

            <div className="right h-full w-[20%] flex justify-end items-center">
              <div className="time text-[1.2vw] text-black/80">
              {formatDate(email.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SendMail;