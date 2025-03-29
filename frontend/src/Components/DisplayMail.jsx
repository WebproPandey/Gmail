import React from 'react'
import { Outlet } from 'react-router'

const DisplayMail = () => {
  return (
    <div className='w-full h-full bg-red-200'>
      <Outlet/>
    </div>
  )
}

export default DisplayMail