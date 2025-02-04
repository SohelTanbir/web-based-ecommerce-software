import React, { useEffect, useState } from 'react';
import './Users.css'
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import SideBar from '../SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../../Loader/Loader'
import { Link, useNavigate } from 'react-router-dom';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import NotFoundMessage  from '../../NotFoundMessage/NotFoundMessage';
import Alert from 'sweetalert2'
import AddUserModal from './AddUserModal';

import { convetUTCToLocalTime } from '../../../utilities';
import { BaseUrl } from '../../../config';



const Users = () => {
    const navigate = useNavigate();
    const [allUsers, setAllUsers ] = useState([]);
    const [loading , setLoading ] = useState(false);
    const [showModal, setShowModal ] = useState(false);
    const [showUpdateModal, setShowUpdateModal ] = useState(false);
    const [selectedUser, setSelelectUser]  = useState([])

    const loadUsers = async()=>{
        const res =  await fetch(`${BaseUrl}/api/v1/users/all`,{
            method:'get',
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });
        const {success, users} = await res.json();
        // off loader
        if(success || !success){
            setLoading(false);
        }
        setAllUsers(users);

    }


    //  handle side effect actions
    useEffect(()=>{
        loadUsers();
    }, [allUsers])

    // handle modal close or Show
    const handleModal = ()=>{
        setShowModal(!showModal)
    }

   // update user information
const updateUser = async(id)=>{
    const response =  await fetch(`${BaseUrl}/api/v1/users/one/${id}`,{
        method:'get',
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    });
    const {success, user} =  await response.json();
    // off loader
    if(success || !success){
        setLoading(false);
    }
  if(success){ 
    setSelelectUser(user);
    setShowUpdateModal(true);
    navigate(`/dashboard/admin/update/${id}`)
}
    
}
// delete a user
    const deleteUser = async(id)=>{
        const {isConfirmed} = await   Alert.fire({
            title: 'Are you sure want to delete?',
            text: "You will be able to create new user again!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          });
          if(isConfirmed){
            const response = await fetch(`${BaseUrl}/api/v1/users/delete/${id}`,{
                method:'delete',
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
            const {success, message } = await response.json();
            // off loader
        if(success || !success){
            setLoading(false);
        }
            if(success){
                setLoading(false);
                Alert.fire(
                    message,
                    'User has been deleted!.',
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
            <DashboardHeader/>
            <AddUserModal showModal={showModal} setShowModal={setShowModal}/>
            <div className="dashboard-main">
            <SideBar/>
            <div className="users-main">
                    <div className="users-header">
                    <h2>All users({allUsers?allUsers?.length:0})</h2>
                    <button onClick={handleModal}>Add user</button>
                    </div>
                    <div className="row">
                        <div className="users-container">
                           {!loading? <div className="users-table">
                                {allUsers?.length?
                                <table>
                                    <tr>
                                        <th>Name</th>
                                        <th>Photo</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>CreatedAt</th>
                                        <th>Action</th>
                                    </tr>
                                    {allUsers.map(user =>(
                                        <tr>
                                        <td>{user.name}</td>
                                        <td><img src={user.image[0]?user.image[0].url : '/user/user.png' } alt="No Photos" /></td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{convetUTCToLocalTime(user.createdAt)}</td>
                                        <td>
                                            <button className='action-btn edit-btn' onClick={()=> updateUser(user._id)}><FontAwesomeIcon title='Edit' icon={faEdit }  /> ||</button>
                                            <button className='action-btn delete-btn' onClick={()=> deleteUser(user._id)}><FontAwesomeIcon title='Delete ' icon={faTrash }/></button>
                                        </td>
                                    </tr>
                                    ))}
                                </table>
                                :
                                <NotFoundMessage message='There is no active users!'/>
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

export default Users;