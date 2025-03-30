import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { sendEmail } from '../Redux/composeMailSlice';

const ComposeMail = ({ mailtoogelButton }) => {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.composeMail);

  const handleSendMail = async () => {
    const emailData = { recipients, subject, message };
    const resultAction = await dispatch(sendEmail(emailData));

    if (sendEmail.fulfilled.match(resultAction)) {
      toast.success('Email sent successfully!');
      mailtoogelButton();
      navigate('/mailbox/inbox'); 
    } else {
      toast.error(resultAction.payload || 'Failed to send email.');
    }
  };

  const closemailbox = () => {
    mailtoogelButton();
    navigate('/');
  };

  return (
    <div className="h-full w-full fixed top-0 left-0 bg-black/50 flex justify-center items-center">
      <div className="mailwraper w-[70%] h-[90%] bg-white relative rounded-lg px-[1vw]">
        <div className="flex justify-between items-center">
          <div className="text-[1.1vw] font-medium text-black/50">New Message</div>
          <div onClick={closemailbox} className="close cursor-pointer">
            <i className="ri-close-fill text-[2vw] text-black/50"></i>
          </div>
        </div>
        <div className="mailBox w-full h-full relative">
          <div className="flex flex-col w-full">
            <input
              type="text"
              className="py-[.4vw] pl-[.2vw] outline-none w-full border-b-[1px]"
              placeholder="Recipients"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
            />
            <input
              type="text"
              className="py-[.4vw] pl-[.2vw] outline-none w-full border-b-[1px]"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="w-full flex-grow h-[60%] bg-black/30">
            <textarea
              className="w-full h-full border-none resize-none px-[1vw] py-[0.5vw]"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-between items-center gap-3 mt-2 w-full h-[15%]">
            <button
              onClick={handleSendMail}
              className="focus:outline-none bg-blue-600 px-6 py-2 rounded-full text-white font-medium"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send'}
            </button>
            <div onClick={closemailbox} className="cursor-pointer">
              <i className="ri-delete-bin-3-line text-[1.5vw]"></i>
            </div>
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default ComposeMail;