import React from 'react';
import './DashboardHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPowerOff} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import {useSelector } from 'react-redux'



const DashboardHeader = () => {
    const {isAuthenticated, user  } = useSelector(state => state.user)



    return (
        <div className="dashboradHeader">
            <div className="dashboard-header">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-3">
                            <div className="logo">
                                <Link to="/">My<span>Store</span></Link>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="activeUser align-items-center">
                                <p>{user?.name?user.name:'User'}</p>
                                <div className="user-photo">
                                    <img src={user?.image?user.image: '/user/user.png'} alt="user" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;