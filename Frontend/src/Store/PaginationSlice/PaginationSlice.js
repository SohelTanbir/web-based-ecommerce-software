import { createSlice } from "@reduxjs/toolkit";



// create slice
const paginationSlice = createSlice({
          name:'pagination',
          initialState:{
                    page:1,
          },
          reducers:{
                    getPageNumber:(state, action)=>{
                              state.page= action.payload.page;
                    }
          }
});


// export slice actions
export const {getPageNumber } = paginationSlice.actions;

// export slice reducers
export default paginationSlice.reducer;

