import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleStarredEmail } from '../Redux/emailSlice';

const StarredMail = () => {
  const dispatch = useDispatch();
  const { starred } = useSelector((state) => state.emails);

  const handleUnstarredMail = (id) => {
    dispatch(toggleStarredEmail(id)); 
  };
  const formatTime = (timestamp) => {
    const emailDate = new Date(timestamp);
    const now = new Date();

    const diffTime = now - emailDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 1) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
    } else {
      return emailDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
    }
  };

  return (
    <div className="h-full w-full bg-black/20 ">
      <div className="w-full h-[10vh] text-center bg-black/30 pt-[1vh]">Starred Messages</div>
      <div className="mailinbox w-full min-h-full overflow-y-auto">
        {starred.map((email) => (
          <div
            key={email._id}
            className="mail w-full h-[8vh] bg-[#F2F6FC] flex justify-center items-center px-[1vw] relative group transition-all duration-300 group-hover:shadow-lg"
          >
            <div className="left h-full w-[20%] flex justify-start items-center gap-3">
              <div
                onClick={() => handleUnstarredMail(email._id)} // Toggle starred state
                className="star h-[6vh] w-[6vh] rounded-full flex justify-center items-center hover:bg-black/20"
              >
                <i className="ri-star-fill text-yellow-500 text-[1.2vw]"></i>
              </div>
              <div>{email.sender || 'UserName'}</div>
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
              {formatTime(email.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarredMail;