import React from 'react';
import './Footer.css'
import paymentMethod from '../../images/payment-getway.png'

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="single-footer">
                        <h3>Recent products</h3>
                        <ul>
                            <li> <a href="#">Female collection</a> </li>
                            <li><a href="#">Male collection</a></li>
                            <li><a href="#">Brand product</a></li>
                            <li><a href="#">Latest Brand</a></li>
                        </ul>
                    </div>
                    <div className="single-footer">
                        <h3>Best Selling </h3>
                        <ul>
                            <li> <a href="#">Female collection</a> </li>
                            <li><a href="#">Male collection</a></li>
                            <li><a href="#">Brand product</a></li>
                            <li><a href="#">Latest Brand</a></li>
                        </ul>
                    </div>
                    <div className="single-footer">
                        <h3>Payment with</h3>
                        <div className="row">
                            <img src={paymentMethod} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;