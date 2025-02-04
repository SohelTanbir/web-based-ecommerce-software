import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../config";



export const loadLoggedInUserData = createAsyncThunk('user/loggedinuser', async()=>{
          const response = await fetch(`${BaseUrl}/api/v1/users/me`,{
              method:'get',
              headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
          });
          const    {success, user}=  await response.json();
        
          return {success, user}
       
})



export const UserSlice =  createSlice({
          name:"user",
          initialState:{
                    isAuthenticated:false,
                    user:[],
          },
          reducers:{
                    getLoginUser:(state, action)=>{
                              state.isAuthenticated =  action.payload.isLogin;
                              state.user = action.payload.user;
                              localStorage.setItem("user", JSON.stringify( action.payload.user))
                    },
                    resetLogggedinUser:(state, action) =>{
                              state.isAuthenticated  = false;
                              state.user = [];
                              localStorage.setItem("user", "");
                              localStorage.setItem("token", "");
                    }
          },
          extraReducers:(builder)=>{
                    builder.addCase(loadLoggedInUserData.fulfilled, (state, action)=>{
                           state.isAuthenticated = action.payload.success?action.payload.success:false;
                           state.user = action.payload.user? action.payload.user:[]
                    })
          }
});

// export actions
export const  {getLoginUser, resetLogggedinUser } = UserSlice.actions;

// export default user slice
export default UserSlice.reducer;