import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, 
  accessToken: localStorage.getItem("authToken") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },    
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    logout: (state) => {
      state.user = null;      
      state.accessToken = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");     
    },
  },
});

export const { setUser,setAccessToken, logout } = userSlice.actions;

export const selectUser = (state) => state.user;  
export const selectAccessToken = (state) => state.accessToken;  
export default userSlice.reducer;
