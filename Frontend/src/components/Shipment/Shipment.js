import React, { useState } from 'react';
import './Shipment.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getShippingInfo } from '../../Store/OrderSlice/OrderSlice';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const Shipment = () => {
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    const [shippingInfo, setShippingInfo] = useState({})
    const {isAuthenticated, user}=  useSelector(state =>state.user);

    const handleChange  = (e)=>{
       const newShippingInfo ={...shippingInfo, email:user.email};
       newShippingInfo[e.target.name] = e.target.value;
       setShippingInfo(newShippingInfo);
       
    }

// handle submit shiping data
const handleShipping = (e)=>{
    e.preventDefault();
   if(shippingInfo.name && shippingInfo.phone && shippingInfo.city && shippingInfo.address && shippingInfo.email  ){
    dispatch(getShippingInfo(shippingInfo));
    navigate("/stripe/payment");
   }else{
    toast.error("All field required!",{position: "top-center",autoClose: 1000});
   }
}
    return (
       <div>
        <Header/>
        <ToastContainer/>
            <div className="shiping-form">
                    <h3>Shipping addresse</h3>
                    <div className="shipingForm">
                        <form onSubmit={handleShipping}>
                          <input type="text" name="name"  onBlur={handleChange} placeholder="Name"autoComplete="none"  /> <br />
                          <input type="tell" name="phone" onBlur={handleChange}  placeholder="Phone" autoComplete="none" /><br />
                           <input type="text" name="city"  onBlur={handleChange}  placeholder="City" autoComplete="none" /><br />
                           <input type="text" name="address" onBlur={handleChange}  placeholder="Address details" autoComplete="none" /><br />
                           <button>Next </button>
                    </form>
                </div>
        </div>
       </div>
    );
};

export default Shipment;