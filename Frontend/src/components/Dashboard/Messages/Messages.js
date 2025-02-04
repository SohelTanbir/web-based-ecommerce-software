import React, { useEffect, useState } from 'react';
import './Messages.css'
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import SideBar from '../SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../../Loader/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import NotFoundMessage from '../../NotFoundMessage/NotFoundMessage';
import Alert from 'sweetalert2'

import {  convetUTCToLocalTime } from '../../../utilities';
import { BaseUrl } from '../../../config';

const Messages = () => {
    const [message, setMessages ] = useState([]);
   const [loading, setLoading ] = useState(true);


    const loadUsers = async()=>{
        const res =  await fetch(`${BaseUrl}/api/v1/message/all`);
        const {success, messages} = await res.json();
        // off laoader 
        if(success || !success){
            setLoading(false);
        }
        setMessages(messages);
    }

    //  handle side effect actions
    useEffect(()=>{
        loadUsers();
    },[message])

    const deleteMessage = async(id)=>{
        const {isConfirmed} = await   Alert.fire({
            title: 'Are you sure want to delete?',
            text: "You won't be able to revert the message!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          });
          if(isConfirmed){
            const response = await fetch(`${BaseUrl}/api/v1/message/delete/${id}`,{
                method:"DELETE"
            })
            const {success, message } = await response.json();
            if(success){
                setLoading(false);
                Alert.fire(
                    message,
                    'Message has been deleted!.',
                    'success'
                  ) 
            }else{
                Alert.fire({
                    icon: 'error',
                    title: message,
                  })
            }
        }


}




    return (
        <div className="all-orders">
        
            <ToastContainer/>
            <DashboardHeader/>
            <div className="dashboard-main">
            <SideBar/>
            <div className="message-main">
                    <div className="message-header">
                    <h2>All Messages({message.length?message.length:0})</h2>
                    </div>
                    <div className="row">
                        <div className="message-container">
                        {!loading ?      
                        <div className="message-table">
                              {message.length ?
                                <table>
                                <tr>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>CreatedAt</th>
                                    <th>Action</th>
                                </tr>
                                {message.map(message =>(
                                    <tr>
                                              <td>{message.name}</td>
                                              <td>{message.email}</td>
                                              <td>{message.subject}</td>
                                              <td>{message.message}</td>
                                              <td>{convetUTCToLocalTime(message.createdAt)}</td>
                                              <td>
                                              <button className='action-btn delete-btn' onClick={()=> deleteMessage(message._id)}><FontAwesomeIcon title='Delete ' icon={faTrash }/></button>
                                              </td>
                                </tr>
                                ))}
                            </table>
                            :    
                            <NotFoundMessage message='There is no messages exist!'/>
                            }
                            </div>
                             :<Loader/>
                            }
                        </div>
                      
                    </div>
            </div>
            </div>
        </div>
    );
};

export default Messages;