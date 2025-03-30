import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmails } from '../Redux/emailSlice';

const InboxMail = () => {
  const dispatch = useDispatch();
  const { emails, status, error } = useSelector((state) => state.emails);

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-full w-full bg-black/20 py-[1vh]">
      <div className="w-full h-[10vh] text-center ">Inbox Messages</div>
      <div className="mailinbox w-full min-h-full overflow-y-auto">
        {emails.map((email) => (
          <div
            key={email._id}
            className="mail w-full h-[8vh] bg-[#F2F6FC] flex justify-center items-center px-[1vw] relative group transition-all duration-300 group-hover:shadow-lg"
          >
            <div className="left h-full w-[20%] flex justify-start items-center gap-3">
              <div>UserName</div>
            </div>
            <div className="mid h-full w-[60%]">
              <div className="flex justify-start items-center gap-3 h-full w-full">
                <div className="subject text-[1.2vw] text-black">{email.subject}</div>
                <div className="message text-[1.2vw] text-black/80 line-clamp-1">
                  {email.message}
                </div>
              </div>
            </div>
            <div className="right h-full w-[20%] flex justify-end items-center">
              <div className="time text-[1.2vw] text-black/80">
                {new Date(email.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxMail;