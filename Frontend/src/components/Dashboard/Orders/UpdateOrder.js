import React, { useState } from 'react';
import './UpdateOrder.css'
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import SideBar from '../SideBar/SideBar';



const UpdateOrder = () => {
    const [orderStatus, setOrderStatus ] = useState("");
    const handleChange = e =>{
        setOrderStatus(e.target.value)
    }

    // store order status into db
    const handleSubmit = e =>{
        e.preventDefault();
    }

    return (
        <div className="update-order">
            <DashboardHeader/>
            <div className="dashboard-main">
            <SideBar/>
            <div className="update-order-main">
            <div className="update-orders-container">
                    <div className="row">
                        <div className="order-info">
                            <div className="shipping">
                                <h2>Shipping Address</h2>
                                    <h4><span>User ID</span> : #dasdf56s5e52dsa</h4>
                                    <h4><span>Name</span> : Sohel Rana</h4>
                                    <h4><span>Phone</span> : +88010545644</h4>
                                    <h4><span>Address</span> : Rothbazar, birgonj, dinajpur</h4>
                            </div>

                            <div className="order">
                                <h2>Order information</h2>
                                    <h4><span>Order ID</span> : #d1d1d1d1d1</h4>
                                    <h4><span>Amount</span> : 65656</h4>
                                    <h4><span>Payment</span> : paid by Bkash</h4>
                                    <h4><span>Status</span> : Processing</h4>
                            </div>
                        </div>
                        <div className="update-status">
                            <form onSubmit={handleSubmit}>
                                <label>Update Status</label> <br />
                                <select name="status" onChange={handleChange}>
                                    <option >Select Status</option>
                                    <option value="precesing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                                <button className="btn ">Save Change</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default UpdateOrder;