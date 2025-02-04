import React, { useEffect, useState } from 'react';
import './Dashboard.css'
import DashboardHeader from './DashboardHeader/DashboardHeader';
import SideBar from './SideBar/SideBar';
import { Link } from 'react-router-dom';
import { BaseUrl } from '../../config';


const Dashboard = () => {
const [orders, setOrders ] = useState([]);
const [category, setCategory ] = useState([]);
const [users, setUsers ] = useState([]);
const [revenue, setRevenue] =  useState(0);

useEffect(()=>{
    // orders
    fetch( `${BaseUrl}/api/v1/orders/all`,{
        method:'get',
        headers:{
            'content-type':'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    })
    .then(res => res.json())
    .then(ordersData => setOrders(ordersData.orders))
    // all categories
    fetch(`${BaseUrl}/api/v1/category/all`,{
        method:'get',
        headers:{
            'content-type':'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    })
    .then(res => res.json())
    .then(data =>setCategory(data.categories))

    // all users
    fetch(`${BaseUrl}/api/v1/users/all`,{
        method:'get',
        headers:{
            'content-type':'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    })
    .then(res => res.json())
    .then(data =>setUsers(data.users))
}, [])






    
    return (
        <div className="dashboard">
            <DashboardHeader/>
            <div className="dashboard-main">
                <SideBar/>
                <div className="main-part">
                    <div className="statistics pt-4">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                   <Link to="/dashboard/orders/all">
                                    <div className="statistics-item total-orders">
                                            <h4>Total Orders</h4>
                                            <h5>{orders?.length > 0 ? orders?.length : orders?.length }</h5>
                                        </div>
                                   </Link>
                                </div>
                                <div className="col-md-3">
                                    <Link to="/dashboard/category/all"> 
                                        <div className="statistics-item total-blog">
                                            <h4>Categories</h4>
                                            <h5>{category?.length > 0 ? category?.length : 0}</h5>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-3">
                                    <Link to="/dashboard/admin/users"> 
                                    <div className="statistics-item total-admin">
                                        <h4>Total Users</h4>
                                        <h5>{users?.length > 0 ?users?.length:0}</h5>
                                    </div>
                                    </Link>
                                </div>
                                <div className="col-md-3">
                                    <div className="statistics-item total-review">
                                        <h4>Total Revenue</h4>
                                        <h5>${revenue}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-grap">
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;