import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import Header from '../Header/Header';

const stripePromise = loadStripe('pk_test_51Ie1iVKIYQNcp99l0wPMPP4lZROJUfL9i6WH0C4Z4na57RCswRzev41CUAqAsQ5dFEkL8DvAVgLHSmCCECbSeVQr00mZjmkyro');



const StripePayment = () => {
    return (

      <>
      <Header/>
      <Elements stripe={stripePromise}>
      <CheckoutForm/>
    </Elements>
      
      </>
 
    );
};

export default StripePayment;