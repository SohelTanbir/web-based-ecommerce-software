import React, { Fragment, useState } from 'react';
import './TraceOrder.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderStatus from './OrderStatus';
import Loader from '../Loader/Loader';
import Header from '../Header/Header';
import HeaderTop from '../Header/HeaderTop';
import { BaseUrl } from '../../config';


const TraceOrder = () => {
    const [trackOrder, setTrackOrder] = useState({
        email:"",
        orderId:""
    });
    const [status, setStatus] = useState("");
    let [loader, setLoader] = useState(false);

    const handleChange = e =>{
        const newOrderId = {...trackOrder};
        newOrderId[e.target.name] = e.target.value;
        setTrackOrder(newOrderId);
    }

    // submit order info
    const handleSubmit  =async e =>{
        e.preventDefault();
        setLoader(true);
        if(trackOrder.email && trackOrder.orderId){
            const  response = fetch(`${BaseUrl}/api/v1/orders/me/track`,{
                method:'post',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(trackOrder)
            })
            const {success, message} = await (await response).json();
            if(success){
                setLoader(false);
                setStatus(message);
                toast.success("Success!", {position: "top-center",autoClose: 1000});
            }else{
                setLoader(false);
                toast.error(message, {position: "top-center",autoClose: 1000});
            }
            setTrackOrder({email:"", orderId:""});
        }else{
            setLoader(false);
            toast.error("All field required!", {position: "top-center",autoClose: 1000});
            setTrackOrder({email:"", orderId:""});
        }
    }

    return (
       <Fragment>
        <HeaderTop/>
            <Header/>
                <div className='trace-order'>
                    <ToastContainer/>
                    {loader&& <Loader/>}
                    <div className="container">
                    {status?
                    <OrderStatus status={status} orderId={trackOrder.orderId}/>:
                    <div className="trace-order-form">
                        <h4>Track your Order</h4>
                            <form onSubmit={handleSubmit}>
                            <input type="text" name='email' onChange={handleChange} placeholder='Email Address' value={trackOrder.email} autoComplete="nope"/> <br />
                            <input type="text" name='orderId' onChange={handleChange} placeholder='Order Id' value={trackOrder.orderId} autoComplete="none"/> <br />
                            <button className='trace-now-btn'>Track Now</button>
                        </form>
                    </div>
                    }
                
                    </div>
            </div>
       </Fragment>
    );
};

export default TraceOrder;