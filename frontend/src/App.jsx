import React from 'react'
import Main from './Pages/Main'
import { Route, Routes } from 'react-router-dom'
import ComposeMail from './Components/ComposeMail'
import InboxMail from './Components/InboxMail'
import AllMail from './Components/AllMail'
import DisplayMail from './Components/DisplayMail'
import { Toaster} from 'sonner';
import Bin from './Components/Bin'


const App = () => {
  return (
   <div>
     <Toaster position="top-center" richColors/>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="mailbox" element={<DisplayMail />}>
            <Route index element={<AllMail />} /> 
            <Route path="inbox" element={<InboxMail />} />
            <Route path="bin" element={<Bin />} />
            <Route path="allmail" element={<AllMail />} />
          </Route>
          <Route path="/compose" element={< ComposeMail />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App