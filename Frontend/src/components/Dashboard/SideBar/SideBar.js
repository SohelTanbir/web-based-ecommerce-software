import React from 'react';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEdit, faEnvelope, faLayerGroup, faPlusSquare,faPowerOff,faQrcode,faTh, faUsers} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { resetLogggedinUser } from '../../../Store/UserSlice/UserSlice';
import Alert from 'sweetalert2'
import { BaseUrl } from '../../../config';


const SideBar = () => {
const dispatch = useDispatch();
const navigate =  useNavigate();




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
                method:'get',
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
                        navigate("/login")
                    }, 1500)
                }
            })
        }
      })


}

    return (
        <div className="sideBar">
                    <ul className='sidebar-with-text'>
                        <li>
                            <Link to="/dashboard"><FontAwesomeIcon icon={faTh} /> Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/products/addproduct"><FontAwesomeIcon icon={faPlusSquare} /> Add Product</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/products/manage"><FontAwesomeIcon icon={faEdit} /> Products</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/orders/all"><FontAwesomeIcon icon={faLayerGroup} /> Orders</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/category/all"><FontAwesomeIcon icon={faQrcode} /> Category</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/admin/users"><FontAwesomeIcon icon={faUsers} /> Users</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/users/message"><FontAwesomeIcon icon={faEnvelope} /> Mesages <span className="badge bg-danger">4</span></Link>
                        </li>
                        <li title='Log out' onClick={handleLogOut}>
                            <Link><FontAwesomeIcon icon={faPowerOff} /> Log out</Link>
                        </li>
                    </ul>
                    <ul className='sidebar-without-text'>
                        <li title='Dashboard'>
                            <Link to="/dashboard"><FontAwesomeIcon icon={faTh} /></Link>
                        </li>
                        <li title='Add Product'>
                            <Link to="/dashboard/products/addproduct"><FontAwesomeIcon icon={faPlusSquare} /></Link>
                        </li>
                        <li title='Manage Product'>
                            <Link to="/dashboard/products/manage"><FontAwesomeIcon icon={faEdit} /></Link>
                        </li>
                        <li title='Orders'>
                            <Link to="/dashboard/orders/all"><FontAwesomeIcon icon={faLayerGroup} /></Link>
                        </li>
                        <li title='Category'>
                            <Link to="/dashboard/category/all"><FontAwesomeIcon icon={faQrcode} /></Link>
                        </li>
                        <li title='users'>
                            <Link to="/dashboard/admin/users"><FontAwesomeIcon icon={faUsers} /></Link>
                        </li>
                        <li title='message'>
                            <Link to="/dashboard/users/message"><FontAwesomeIcon icon={faEnvelope} /></Link>
                        </li>
                        <li title='Log out' onClick={handleLogOut}>
                            <Link><FontAwesomeIcon icon={faPowerOff} /></Link>
                        </li>
                    </ul>
        </div>
    );
};

export default SideBar;