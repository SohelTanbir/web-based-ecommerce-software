import { createSlice } from "@reduxjs/toolkit";


const initialState = {
          orders: {
                              productInfo:[],
                              shippingInfo:{},
                              paymentInfo:{},
                              shippingPrice:0,
                              totalPrice:0,
                              totalQuantity:0

                    }
          
}





// create slice for new order
const OrderSlice =  createSlice({
          name:"order",
          initialState,
          reducers:{
                    getProductInfo:(state, action)=>{
                              state.orders.productInfo.push(action.payload.product);
                              state.orders.shippingPrice= action.payload.shippingPrice;
                              state.orders.totalPrice = action.payload.totalPrice;  
                              state.orders.totalQuantity = action.payload.totalQuantity;  
                    },
                    getShippingInfo:(state, action)=>{
                              state.orders.shippingInfo = action.payload;
                    },
                    getPaymentInfo:(state, action)=>{
                              state.orders.paymentInfo = action.payload;
                    },
                    resetOrdersInfo:(state, action)=>{
                              state.orders.productInfo = [];
                              state.orders.shippingInfo ={};
                              state.orders.paymentInfo ={};
                              state.orders.shippingPrice =0;
                              state.orders.totalPrice =0;
                    }
          }
          
});

// expot action
export const {getProductInfo, getShippingInfo, getPaymentInfo, resetOrdersInfo } =  OrderSlice.actions;

// export default 
export default OrderSlice.reducer;