import React from 'react';
import './RightNav.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCompass, faEnvelope, faPowerOff, faTh, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetLogggedinUser } from '../../Store/UserSlice/UserSlice';
import { BaseUrl } from '../../config';



const RightNav =  ({showNav, setShowNav}) =>{
  const dispatch = useDispatch();
const navigate =  useNavigate();
  const {isAuthenticated, user} = useSelector(state => state.user)

  // handle close navbar 
  const handleClose = () => setShowNav(false);


// handle Log out user
const handleLogOut = async () =>{
  const response = await fetch(`${BaseUrl}/api/v1/users/logout`,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`
  },
  });
  const {success, message } = await response.json();
  if(success){
      toast.success(message,{position: "top-center",autoClose: 1000});
      // redirect to home page
      setTimeout(()=>{
          dispatch(resetLogggedinUser());
          navigate("/login")
      }, 1500)
  }else{

      toast.error(message,{position: "top-center",autoClose: 1000});
  }
}



  return (
    <>
      <Offcanvas show={showNav} onHide={handleClose} placement="end" id="Right-menu">
        <Offcanvas.Header>
         {isAuthenticated ?
          <div className="login-user">
                <img src={user.image?user.image: '/user/user.png'} alt="user" />
                <h4 className='text-capitalize'>{user.name}</h4>
          </div>
          :
          <div className="login-user">
                <img src="/user/user.png" alt="user" />
                <h4>Guest</h4>
          </div>
          }
        </Offcanvas.Header>
        <Offcanvas.Body>

        <ul className='sidebar-right-menu'>
              {isAuthenticated &&
                <li>
                  <Link to="/users/profile">
                    <div className="left-icon">
                      <FontAwesomeIcon icon={faUser}/>
                    </div>
                      Profile
                    </Link>
                </li>
                }
                 {user?.role ==='admin'&&
                 <li>
                 <Link to="/dashboard">
                   <div className="left-icon">
                     <FontAwesomeIcon icon={faTh}/>
                   </div>
                   Dashboard
                   </Link>
               </li>
                  }
                <li>
                  <Link to="/orders/track">
                    <div className="left-icon">
                      <FontAwesomeIcon icon={faCompass}/>
                    </div>
                    Track order
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                  <div className="left-icon">
                      <FontAwesomeIcon icon={faEnvelope}/>
                    </div>
                    Contact
                  </Link>
                </li>                                           
                <li>
                  <Link to="/return/policy">
                    <div className="left-icon">
                      <FontAwesomeIcon icon={faEnvelope}/>
                    </div>
                    Easy Return
                  </Link>
                </li>
              {
              isAuthenticated &&
                <li onClick={handleLogOut}>
                  <Link to="#">
                  <div className="left-icon">
                      <FontAwesomeIcon icon={faPowerOff}/>
                    </div>
                    Log out
                  </Link>
                </li>
                }
      </ul>
      
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default RightNav;