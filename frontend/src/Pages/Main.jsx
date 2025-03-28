import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'

const Main = () => {
  return (
    <div className='h-screen w-full flex flex-col'>
      <Header />
      <Sidebar className="flex-grow" />
    </div>
  )
}

export default Main