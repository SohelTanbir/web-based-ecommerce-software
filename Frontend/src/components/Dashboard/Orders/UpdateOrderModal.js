import React, { useState } from 'react'
import { Modal} from 'react-bootstrap';
import Alert from 'sweetalert2'
import Loader from '../../Loader/Loader';
import {  BeatLoader } from 'react-spinners';
import { BaseUrl } from '../../../config';



const UpdateOrderModal = ({showModal, setShowModal, order_id})=> {
  const [orderStatus, setOrderStatus ] = useState("Processing");
  const [loading, setLoading ] =  useState(false);
  const handleClose = () => setShowModal(false);

  const handleChange  = (e) =>{
    setOrderStatus( e.target.value);
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
     if(orderStatus.length > 0){
       const formData = new FormData();
       formData.set("orderStatus", orderStatus);
      const response = await fetch(`${BaseUrl}/api/v1/orders/update/${order_id}`, {
          method:"PUT",
          headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
          },
           body:formData,
      });
    const {success, message} = await response.json();
    if(success){
      setLoading(false);
       Alert.fire(
        message,
           'Order status has been updated!.',
           'success'
     ) 
     // close modal 
    setShowModal(false);
    // reset order status
    setOrderStatus("");
    }else{
          Alert.fire({
            icon: 'error',
            title: message,
            text:'There was an server error!'
            })
            setLoading(false);
      }
}else{
      Alert.fire({
      icon: 'error',
        title: 'Order status is  required!',
            text:'You must select order status to update the order!'
         })
         setLoading(false);
       }
  }



          return (
                    <div className='order-update-modal py-5'>
                              <Modal show={showModal} onHide={handleClose} centered>
                              <Modal.Header closeButton>
                                        <Modal.Title className='fs-2'>Update Order</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                        <div className="row">
                                                  <div className="col-lg-12">
                                                 {!loading?
                                                    <form onSubmit={handleSubmit} className='py-4'>
                                                            <div className="input-group w-100">
                                                                <select onChange={handleChange} name="orderStatus">
                                                                  <option value="Processing">Processing</option>
                                                                  <option value="Shipped">Shipped</option>
                                                                  <option value="Delivered">Delivered</option>
                                                                </select>
                                                                  <input type="submit" className='btn btn-sm btn-success ms-auto fs-3 my-4 py-2 rounded' value="Update now " />
                                                            </div>
                                                      </form>
                                                      :
                                                      <div className="text-center">
                                                          <BeatLoader  color="#FF6000"  />
                                                      </div>
                                                    }
                                                  </div>
                                        </div>
                              </Modal.Body>
                              </Modal>
                    </div>
          )
}

export default UpdateOrderModal
