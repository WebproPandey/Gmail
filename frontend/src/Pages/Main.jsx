import React, { useState } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import DisplayMail from '../Components/DisplayMail';
import ComposeMail from '../Components/ComposeMail';

const Main = () => {
  const  [isOpen , setIsOpen]  = useState(true);
  const  [isMainOpen , setIsMailOpen]  = useState(false);

  const toggleSidebar = () => {
      setIsOpen(!isOpen);
  };

  const toggleComposeMail = () => {
      setIsMailOpen(!isMainOpen);
  };

  return (
      <div className='h-screen w-full flex flex-col relative'>
          <Header toogelButton={toggleSidebar} />
          <div className='flex h-full'>
              {isOpen && <Sidebar className="flex-grow" mailtoogelButton={toggleComposeMail} />} 
              <DisplayMail />
              {isMainOpen && <ComposeMail mailtoogelButton={toggleComposeMail} />} 
          </div>
      </div>
  );
};

export default Main;
