import React from 'react'
import { Outlet } from 'react-router'

const DisplayMail = () => {
  return (
    <div className='w-full h-full rounded-2xl  overflow-hidden'>
      <Outlet/>
    </div>
  )
}

export default DisplayMail