import { createSlice } from "@reduxjs/toolkit";






const SearchSlice =  createSlice({
          name:'search',
          initialState:{
                    searchVal:""
          },
          reducers:{
                    getSearchInputVal: (state, action)=>{
                              state.searchVal = action.payload;
                    }
          }
          
});


// export actions
export const { getSearchInputVal } = SearchSlice.actions;

// export default  reducer
export default SearchSlice.reducer;