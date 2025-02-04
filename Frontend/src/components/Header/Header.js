import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faBars, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import SearchBox from '../SearchBox/SearchBox';
import RightNav from '../RightNav/RightNav';
import { useSelector } from 'react-redux';

const Header = () => {
    const [showNav, setShowNav ] = useState(false);

// show or hide right sidebar menu
const handleRightNav = ()=>{
    setShowNav(!false);
}
const cartProducts = useSelector(state => state.cart.cartProducts);
const {isAuthenticated, user} = useSelector(state => state.user);

// removed user info from localstorage if login token expired
setTimeout(()=>{
    localStorage.setItem("user", "");
}, 3600000)



    return (
       <div className="header">
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center">
                        <div className="logo">
                        <Link to="/"> My<span>Store</span> </Link>
                        </div>
                    <div className="search-bar">
                        <SearchBox/>
                    </div>
                   <div className="header-action d-flex align-items-center">
                        <div className="login-btn">
                         {!isAuthenticated&&
                         <Link to="/login">
                            <button>Login</button>
                         </Link>
                        }
                        </div>
                        <div className="add-to-cart">
                            <div className="cart-icon">
                                <Link to="/cart">
                                    <FontAwesomeIcon icon={faCartPlus}/>
                                </Link>
                                <span className='cart-total'>{cartProducts?cartProducts.length:0}</span>
                            </div>
                        </div>
                        <div className="bars-icon" onClick={handleRightNav}>
                            <FontAwesomeIcon icon={faBars}/>
                        </div>
                      {isAuthenticated &&
                        <div className="loggedin-user">
                          <Link to="/users/profile">
                                <img src={user.image?user.image: '/user/user.png'} alt="User" />
                          </Link>
                        </div>
                        }
                   </div>
                </div>
            </div>
            <div className="header-bottom-search">
                <SearchBox/>
            </div>
            {/* mobile menu  */}
            <RightNav showNav={showNav} setShowNav={setShowNav}/>
       </div>
    );
};

export default Header;