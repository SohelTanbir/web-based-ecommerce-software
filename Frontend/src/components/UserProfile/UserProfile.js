import React, { Fragment, useEffect, useState } from 'react';
import './UserProfile.css'
import Loader from '../Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import HeaderTop from '../Header/HeaderTop';
import {resetLogggedinUser } from '../../Store/UserSlice/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import NotFoundMessage from '../NotFoundMessage/NotFoundMessage';
import Alert from 'sweetalert2'
import { BaseUrl } from '../../config';



const UserProfile = () => {
    const [loading, setLoading ] = useState(true);
    const dispatch = useDispatch();
    const [myOrders, setMyOrders] = useState([]);
    const navigate = useNavigate();
    const {user} = useSelector(state => state.user);
    // fatch my orders from db
    const loadMyOrders = async ()=>{
        const response =  await  fetch(`${BaseUrl}/api/v1/orders/me`,{
            method: 'get',
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        })
        const {success, orders} = await response.json();
        // off laoader 
        if(success || !success){
            setLoading(false);
        }
        setMyOrders(orders)
    }
    useEffect(()=>{
        loadMyOrders();
    }, []);

    // calculation total order price
    let totalPrice = 0;
    myOrders?.map(order => totalPrice += order.totalPrice);


    // product name modify
    const productName = (name)=>{
        if(JSON.stringify(name).length >30){
                return JSON.stringify(name).slice(0,30) + "...";
        }else{
            return name
        }
    }



// handle Log out user
const handleLogOut = async () =>{
    Alert.fire({
        title: 'Are you sure you want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF6000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
            fetch(`${BaseUrl}/api/v1/users/logout`,{
                headers:{
                  Authorization: `Bearer ${localStorage.getItem("token")}`
              },
            })
            .then(res => res.json())
            .then(result =>{
                if(result.success){
                    toast.success("Log out successfully!", { position: "top-center", autoClose: 1000 });
                    setTimeout(()=>{
                        dispatch(resetLogggedinUser());
                        navigate("/login");
                    }, 1500)
                }
            })
        }
      })


}


    return (
        <Fragment>
            <HeaderTop/>
            <Header/>
            
        <div className='user-profile'>
            {!loading ?
            <div className="container">
            <ToastContainer />
            <div className="row">
                <div className="user-info">
                    <div className="profile-photo">
                        <img src={user?.image?user?.image: '/user/user.png'} alt="profile" />
                    </div>
                    <h3 className='user-name'>{user?.name}</h3>
                    <p> <span>Email: </span>{user?.email}</p>
                    <p className='text-capitalize'><span>Role: </span> {user?.role}</p>
                    <button onClick={handleLogOut} className="logout-btn">Log out</button>
                </div>
                <div className="orders-info">
                    <h4>My Orders ({myOrders?.length?myOrders.length:0})</h4>
                    {myOrders?.length? 
                    <div className="my-orders-table">
                        <table className='text-center'>
                            <tr>
                                <th>ID</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            
                          {   myOrders?.map((order, index)  =>
                                    order?.productInfo.map(product => (
                                 
                                    <tr key={index}>
                                        <td>{order?._id}</td>
                                        <td><img src={product?.image} alt="product" /></td>
                                        <td>{productName(product?.name)}</td>
                                        <td>{product?.quantity}</td>
                                        <td><span>৳</span> {product?.price}</td>
                                     
                                    </tr>
                                
                                    ))
                                    
                                )    
                             
                            }
                              <tr className='bg-dark text-white  px-5'>
                                     <td colSpan={4}>Total price <small>(shipping fee included)</small></td>  
                                     <td> <span>৳</span> {totalPrice}</td>  
                                </tr>
                        </table>
                        
                    </div>
                      :
                      <NotFoundMessage message="You don't have any orders!"/>
                      }
                </div>
                </div>
            </div>:<Loader/>}
        </div>
        </Fragment>
    );
};

export default UserProfile;