import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrafts } from '../Redux/emailSlice';
import { useNavigate } from 'react-router';

const DraftMail = () => {
  const dispatch = useDispatch();
  const navigate  = useNavigate()
  const { emails } = useSelector((state) => state.emails);
  const drafts = emails.filter((email) => email.draft); // Filter only draft emails
  const handleDraftClick = (draft) => {
    navigate('/compose', { state: { draft } }); // Navigate to ComposeMail with draft data
  };

  useEffect(() => {
    dispatch(fetchDrafts());
  }, [dispatch]);

  return (
    <div className="h-full w-full bg-black/20">
      <div className="w-full h-[10vh] text-center bg-black/20 py-[1vh]">Draft Mail</div>
      <div className="mailinbox w-full min-h-full overflow-y-auto">
        {drafts.map((draft) => (
          <div
            key={draft._id}
            className="mail w-full h-[8vh] bg-[#F2F6FC] border-[0.4px] border-black/30 flex justify-center items-center px-[1vw] relative group transition-all duration-300 group-hover:shadow-lg"
          >
            <div className="left h-full w-[20%] flex justify-start items-center gap-3">
              <div>{draft.recipients || 'No Recipient'}</div>
            </div>
            <div onClick={() => handleDraftClick(draft)} 
             className="mid h-full w-[60%] cursor-pointer">
              <div className="flex justify-start items-center gap-3 h-full w-full">
                <div className="subject text-[1.2vw] text-black">{draft.subject}</div>
                <div className="message text-[1.2vw] text-black/80 line-clamp-1">
                  {draft.message}
                </div>
              </div>
            </div>
            <div className="right h-full w-[20%] flex justify-end items-center">
              <div className="time text-[1.2vw] text-black/80">
                {new Date(draft.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraftMail;