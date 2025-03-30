
import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './emailSlice';
import composeMailReducer from './composeMailSlice';


export const store = configureStore({
  reducer: {
    composeMail: composeMailReducer,
    emails: emailReducer,

  },
});