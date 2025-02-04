import  { combineReducers, configureStore  } from '@reduxjs/toolkit';
import SearchSlice from './SearchSlice/SearchSlice';
import PaginationSlice from './PaginationSlice/PaginationSlice';
import CategorySlice from './Category/CategorySlice';
import CartSlice from './CartSlice/CartSlice';
import OrderSlice from './OrderSlice/OrderSlice';
import UserSlice from './UserSlice/UserSlice';

const reducers =  combineReducers({
          searchVal:SearchSlice,
          PaginationSlice,
          category:CategorySlice,
          cart:CartSlice,
          newOrder: OrderSlice,
          user:UserSlice
})

export const store = configureStore({
          reducer:reducers,
         
})