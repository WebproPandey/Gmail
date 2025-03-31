import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmail, toggleStarredEmail } from "../Redux/emailSlice";

const AllMail = () => {
  const dispatch = useDispatch();
  const { archive } = useSelector((state) => state.emails);
  const loading = useSelector((state) => state.emails.loading); // Assuming Redux handles loading

  const handleDelete = (id) => {
    dispatch(deleteEmail(id));
  };

  const handleStarredMail = (id) => {
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
    <div className="h-full w-full bg-black/20">
      <div className="w-full h-[10vh] text-center bg-black/20 py-[1vh]">
        All Mail
      </div>

      {loading ? (
        <div className="h-full flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="mailinbox w-full min-h-full overflow-y-auto">
          {archive.map((email) => (
            <div
              key={email._id}
              className="mail w-full h-[8vh] bg-[#F2F6FC] flex justify-center items-center px-[1vw] relative group transition-all duration-300 group-hover:shadow-lg"
            >
              <div className="w-[20%] flex justify-evenly items-center bg-white h-full absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                <div
                  onClick={() => handleDelete(email._id)}
                  className="delete h-[6vh] w-[6vh] rounded-full flex justify-center items-center hover:bg-black/20"
                >
                  <i className="ri-delete-bin-4-line text-[1.2vw] text-black/50"></i>
                </div>

                <div className="mail h-[6vh] w-[6vh] rounded-full flex justify-center items-center hover:bg-black/20">
                  <i className="ri-mail-line text-[1.2vw] text-black/50"></i>
                </div>
                <div className="time h-[6vh] w-[6vh] rounded-full flex justify-center items-center hover:bg-black/20">
                  <i className="ri-time-line text-[1.2vw] text-black/50"></i>
                </div>
              </div>

              <div className="left h-full w-[20%] flex justify-start items-center gap-3">
                <div className="checkbox h-[6vh] w-[6vh] rounded-full flex justify-center items-center hover:bg-black/20">
                  <div className="h-[2.4vh] w-[2.4vh] border border-black/20 rounded-sm"></div>
                </div>
                <div
                  onClick={() => handleStarredMail(email._id)} 
                  className="star h-[6vh] w-[6vh] rounded-full flex justify-center items-center hover:bg-black/20"
                >
               <i className={`${email.starred ? "ri-star-fill text-yellow-500 " : "ri-star-line text-black/50"} text-[1.2vw]`}></i>

                </div>
                <div>{email.sender || "UserName"}</div>
              </div>

              <div className="mid h-full w-[60%]">
                <div className="flex justify-start items-center gap-3 h-full w-full">
                  <div className="subject text-[1.2vw] text-black">
                    {email.subject}
                  </div>
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
      )}
    </div>
  );
};

export default AllMail;
