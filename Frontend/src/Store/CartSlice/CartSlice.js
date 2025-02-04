import { createSlice , current } from "@reduxjs/toolkit";



const CartSlice =  createSlice({
          name:'cart',
          initialState:{
                    cartProducts:JSON.parse(localStorage.getItem("cartProducts"))?JSON.parse(localStorage.getItem("cartProducts")): [],
          },
          reducers:{
                    // add product to cart
                    addToCart:(state, action)=>{
                              const productExist =  current(state.cartProducts).filter(pd => pd.productId === action.payload.productId);
                             if(!productExist.length > 0){
                                        const newProduct =  action.payload;
                                        state.cartProducts = [...state.cartProducts, newProduct];
                                        // save cart products to localStorage
                                        localStorage.setItem("cartProducts", [JSON.stringify(state.cartProducts)]);
                              }else{
                                        let newCartProducts = current(state.cartProducts).map((product) => {
                                                  if (product.productId === action.payload.productId) {
                                                      return { ...product, quantity: product.quantity + 1 };
                                                  }
                                                  return product;
                                              });
                                        state.cartProducts = newCartProducts;
                                        localStorage.setItem("cartProducts", [JSON.stringify(state.cartProducts)]);
                              }
                    },
                    // increment quantity
                    incrementQuantity:(state, action)=>{
                              let newProducts  = current(state.cartProducts).map((product) => {
                                        if (product.productId === action.payload.productId) {
                                            return { ...product, quantity: product.quantity + 1 };
                                        }
                                     return product
                                    });
                              state.cartProducts =newProducts
                              localStorage.setItem("cartProducts", [JSON.stringify(state.cartProducts)]);
                    },

                    // decrement quantity
                    decrementQuantity:(state, action)=>{
                              let newCartProducts = current(state.cartProducts).map((product) => {
                                        if (product.productId === action.payload.productId) {
                                            return { ...product, quantity: product.quantity -1 };
                                        }
                                        return product;
                                    });
                              state.cartProducts = newCartProducts;
                              localStorage.setItem("cartProducts", [JSON.stringify(state.cartProducts)]);
                    },
                    // remove product from cart
                    removeProductFromCart:(state, action)=>{
                              const id =  action.payload.productId;
                              state.cartProducts =  current(state.cartProducts).filter(pd => pd.productId !== id);
                              // update cart products to localStorage
                              localStorage.setItem("cartProducts", [JSON.stringify(state.cartProducts)]);
                    },
                    removeAllProductsFromCart:(state, action)=>{
                        state.cartProducts = action.payload?action.payload: []
                    }
          }
});


// export actions
export const {addToCart , removeProductFromCart, removeAllProductsFromCart, incrementQuantity, decrementQuantity} = CartSlice.actions;

// default expot 
export default CartSlice.reducer;