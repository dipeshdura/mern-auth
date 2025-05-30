import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpStart:(state)=>{
      state.loading =true;
    },
    signUpSuccess:(state,action)=>{
      state.currentUser =action.payload;
      state.loading =false;
      state.error =false;
    },
    signUpFailure:(state,action)=>{
      state.loading =false;
      state.error =action.payload;
    },
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state)=>{
      state.loading =true;
    },
    updateUserSuccess: (state, action)=>{
      state.currentUser =action.payload;
      state.loading =false;
      state.error =false;
    },
    updateUserFailure:(state,action)=>{
      state.loading =false;
      state.error =action.payload;
    },
    deleteUserStart:(state)=>{
      state.loading =true;
    },
    deleteUserSuccess:(state)=>{
      state.currentUser=null;
      state.loading =false;
      state.error =false;
    },
    deleteUserFailure:(state,action)=>{
      state.loading =false;
      state.error =action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutFailure: (state,action) => {
     
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  signUpStart,
  signUpSuccess,
  signUpFailure,
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
  signOutFailure
} =
  userSlice.actions;
export default userSlice.reducer;
