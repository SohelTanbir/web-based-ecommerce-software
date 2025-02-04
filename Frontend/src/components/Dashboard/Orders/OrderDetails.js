import React, { useEffect, useState } from 'react';
import './OrderDetails.css'
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import SideBar from '../SideBar/SideBar';
import Loader from '../../Loader/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundMessage from '../../NotFoundMessage/NotFoundMessage';
import { useParams } from 'react-router-dom';
import { BaseUrl } from '../../../config';





const OrderDetails = () => {
          const {id } = useParams();
          const [orderItems, setOrderItems ] = useState([]);
          const [loading, setLoading ] =  useState(true);
          const loadOrdersFromDB = async()=>{
          const res =  await fetch(`${BaseUrl}/api/v1/orders/${id}`,{
            method:'get',
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });
        const {success, orders} = await res.json();
        if(success || !success){
            setLoading(false);
        }
        setOrderItems(orders)
    }

    //  handle side effect actions
    useEffect(()=>{
        loadOrdersFromDB();
    }, [])



    // product name modify
    const productName = (name)=>{
          if(JSON.stringify(name).length >30){
                  return JSON.stringify(name).slice(0,30) + "...";
          }else{
              return name
          }
      }




    return (
        <div className="all-orders">
               <ToastContainer/>
            <DashboardHeader/>
            <div className="dashboard-main">
            <SideBar/>
        
          <div className="orders-main">
                <h2>Order details</h2>
                {!loading ? 
       <div className="row">
          <div className="orders-details">
                    {orderItems? 
                    <div className="my-orders-table">
                    <table className='text-center'>
                    <tr>
                              <th>ID</th>
                              <th>Photo</th>
                              <th>Name</th>
                              <th>Quantity</th>
                              <th>Price</th>
                    </tr>
                    
                    {   orderItems?.productInfo?.map((product, index)  =>
                              <tr key={index}>
                              <td>{product._id}</td>
                              <td><img src={product.image} alt="product" /></td>
                              <td>{productName(product.name)}</td>
                              <td>{product.quantity}</td>
                              <td><span>৳</span> {product.price}</td>
                    
                    </tr>
                    )    
                              
                    }
                    </table>
                    
                    </div>
                    :
                    <NotFoundMessage message="You don't have any orders!"/>
                    }
          </div>
          </div>
                    :<Loader/>
                    }
                    </div>
                    
                    </div>
          </div>
    );
};

export default OrderDetails;