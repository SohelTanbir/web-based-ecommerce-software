import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './HeaderTop.css';



const HeaderTop = () => {
          const {user} = useSelector(state => state.user);


          return (
                    <div className='header-top'>
                              <div className="container">
                                        <div className="d-flex align-items-center justify-content-between">
                                                  <p className='free-shipping'>Free Shipping on first order! <span>Order Now</span></p>
                                                  <ul className='top-menu d-flex'>
                                                       {user?.role ==='admin'&&
                                                            <li>
                                                                      <Link to="/dashboard">Dashboard</Link>
                                                            </li>}
                                                            <li>
                                                                      <Link to="/orders/track">Track order</Link>
                                                            </li>
                                                            <li>
                                                                      <Link to="/contact">Contact</Link>
                                                            </li>
                                                       
                                                         <li>
                                                                      <Link to="/users/profile">Profile</Link>
                                                            </li>
                                                                  
                                                            <li>
                                                                      <Link to="/return/policy">Easy Return</Link>
                                                            </li>
                                                  </ul>
                                        </div>
                              </div>
                    </div>
          );
};

export default HeaderTop; 