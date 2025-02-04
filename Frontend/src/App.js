import React, { createContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from './components/Product/Product';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import AddProduct from './components/Dashboard/AddProduct/AddProduct';
import Cart from './components/Cart/Cart';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Reviews from './components/Reviews/Review';
import Contact from './components/Contact/Contact';
import TraceOrder from './components/TraceOrder/TraceOrder';
import ForgotPassword from './components/ResetPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import UserProfile from './components/UserProfile/UserProfile';
import ManageProducts from './components/Dashboard/ManageProducts/ManageProducts';
import UpdateProduct from './components/Dashboard/UpdateProduct/UpdateProduct';
import Users from './components/Dashboard/Users/Users.js';
import Orders from './components/Dashboard/Orders/Orders';
import UpdateOrder from './components/Dashboard/Orders/UpdateOrder';
import NotFound from './components/NotFount/NotFound';
import Category from './components/Dashboard/Category/Category';
import Messages from './components/Dashboard/Messages/Messages';
import OrderSuccess from './components/OrderSuccess/OrderSuccess'
import Shipment from './components/Shipment/Shipment';
import StripePayment from './components/StripePayment/StripePayment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { loadLoggedInUserData } from './Store/UserSlice/UserSlice';
import { useDispatch } from 'react-redux';
import GuestRoute from './components/GuestRoute/GuestRoute';
import OrderDetails from './components/Dashboard/Orders/OrderDetails';
import UserUpdate from './components/Dashboard/Users/UserUpdate';

export const userContext = createContext();




function App() {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [payment, setPayment] = useState(0)
  const [quantity, setQuantity] = useState(0);
  const [order, setOrder] = useState([]);


useEffect(()=>{
  dispatch(loadLoggedInUserData());
}, [])



  return (
    <div className="App">
      <userContext.Provider value={{cartItems:[cart, setCart], prices:[price, setPrice],
      quantities:[quantity, setQuantity],
      paymentInfo:[payment, setPayment],
      ordersInfo: [order, setOrder]
       }}>

      <BrowserRouter>
                                                                                                                      
            <Routes>
              <Route exact path="/" element={<Home/>}>
                  
              </Route>
              <Route exact path="/home" element={  <Home/>} />
                
              <Route exact path="/product" element={   <Product/>} />
               
              <Route exact path="/reviews" element={ <PrivateRoute> <Reviews/></PrivateRoute>} />
                 

              <Route exact path="/login" element={<GuestRoute><Login/></GuestRoute>} />
       
              <Route exact path="/signup" element={<GuestRoute><SignUp/></GuestRoute> } />
               

              <Route exact path="/dashboard" element={<PrivateRoute><Dashboard/> </PrivateRoute>} />


              <Route exact path="/cart" element={ <Cart/>} />

              <Route exact path="/contact" element={ <PrivateRoute> <Contact/> </PrivateRoute>} />
              
              <Route exact path="/orders/track" element={   <PrivateRoute><TraceOrder/></PrivateRoute>} />

              <Route exact path="/password/forgot" element={<ForgotPassword/>} />
          
              <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
                
              <Route exact path="/details/:id" element={<ProductDetails/>} />

              <Route exact  path="/dashboard/products/addproduct" element={<PrivateRoute><AddProduct/></PrivateRoute>} /> 

              <Route exact path="/dashboard/products/manage" element={<PrivateRoute><ManageProducts/></PrivateRoute>} />

              <Route exact path="/dashboard/products/update/:id" element={<PrivateRoute><UpdateProduct/></PrivateRoute>} />

              <Route  exact path="/dashboard/admin/users" element={<PrivateRoute><Users/></PrivateRoute>} />

              <Route  exact path="/dashboard/admin/update/:id" element={<PrivateRoute><UserUpdate/></PrivateRoute>} />

              <Route exact  path="/dashboard/orders/all" element={<PrivateRoute><Orders/></PrivateRoute>} />

              <Route exact  path="/dashboard/orders/status/update" element={<PrivateRoute><UpdateOrder/></PrivateRoute>} />

              <Route exact  path="/dashboard/orders/details/:id" element={<PrivateRoute><OrderDetails/></PrivateRoute>} />

              <Route exact  path="/orders/create/confirm/message" element={<OrderSuccess/>} />

              <Route exact  path="/checkout" element={<PrivateRoute> <Shipment/> </PrivateRoute>} />

              <Route exact  path="/stripe/payment" element={<PrivateRoute><StripePayment/></PrivateRoute>} />

              <Route exact  path="/dashboard/category/all" element={ <PrivateRoute><Category/>  </PrivateRoute> } />
              
              <Route exact  path="/dashboard/users/message" element={ <PrivateRoute> <Messages/></PrivateRoute>} />

              <Route exact path="/users/profile" element={ <PrivateRoute> <UserProfile/></PrivateRoute>  } />

              <Route exact path="*" element={<NotFound/>} />

            </Routes>
      </BrowserRouter>
     </userContext.Provider>
    </div>
  );
}

export default App;
