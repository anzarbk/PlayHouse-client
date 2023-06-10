import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    removeUser: (state) => {
      state.data = null;
    },
  },
});

export const userDataActions = userSlice.actions;

export default userSlice.reducer;
