import React, {  useState } from 'react';
import './Checkout.css'

import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import { getPaymentInfo, resetOrdersInfo } from '../../Store/OrderSlice/OrderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllProductsFromCart } from '../../Store/CartSlice/CartSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { BaseUrl } from '../../config';


const CheckoutForm = () => {
  const [loading, setLoading ] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const order=  useSelector(state =>state.newOrder.orders);



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      toast.error(error.message, {position: "top-center",autoClose: 1000})
    } else {
     const paymentInfo = ({id:paymentMethod.id,type: paymentMethod.type, status:'success'});
      dispatch(getPaymentInfo(paymentInfo));
      const newOrder = {...order, paymentInfo};
       if(paymentInfo.id){
         // create new order
        const orderResponse = await fetch(`${BaseUrl}/api/v1/orders/create`, {
          method: 'post',
          headers:{
             'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
          body:JSON.stringify(newOrder)
        });
        const {error, success} =await orderResponse.json();
        if(success || !success){
          setLoading(false);
        }
        if(!error){ 
          toast.success("Order placed successfully", {position: "top-center",autoClose: 1000});
          // reset order info state
          dispatch(resetOrdersInfo());
          dispatch(removeAllProductsFromCart([]));
          // redirect to order place confirmation page
        setTimeout(() => {
            navigate("/orders/create/confirm/message");
        }, 1000);
        }else{
          setLoading(false);
          toast.error(error, {position: "top-center",autoClose: 1000});
        }
       }
    }
  };



  return (
   <div className='stripe-payment'>
       <ToastContainer />
          {loading?
          <form onSubmit={handleSubmit} style={{padding:'2rem 0', width:'50%', margin:' 5% auto'}}>
          <CardElement />
          <div className="order-btn">
            <button className='pay-btn' type="submit" disabled={!stripe}>
              Confirm Order
            </button>
          </div>
        </form>
      :
      <Loader/>  
      }
   </div>
  );
};


export default CheckoutForm;