import React from 'react'
import Main from './Pages/Main'
import { Route, Routes } from 'react-router-dom'
import ComposeMail from './Components/ComposeMail'
import InboxMail from './Components/InboxMail'
import AllMail from './Components/AllMail'
import DisplayMail from './Components/DisplayMail'

const App = () => {
  return (
   <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="mailbox" element={<DisplayMail />}>
            <Route index element={<AllMail />} /> 
            <Route path="inbox" element={<InboxMail />} />
            <Route path="allmail" element={<AllMail />} />
          </Route>
        </Route>
        <Route path="/compose" element={<ComposeMail />} />
      </Routes>
    </div>
  )
}

export default App