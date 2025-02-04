import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import './CartFixed.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { userContext } from '../../App';


const CartFixed = () => {
    const [quantity, setQuantity] = useState(0);
    const {prices}= useContext(userContext);
    const [price, setPrice ] = prices;
    const shippingPrice = Math.floor((price*3)/100);
    const cartProducts = useSelector(state => state.cart.cartProducts);

   

          const productPrice = ()=>{
              let price = 0;
              cartProducts&& cartProducts.map(product =>setPrice(price += product.quantity * product.price));
      
          }
          
          const productQnt = ()=>{
              let qnt = 0;
              cartProducts&& cartProducts.map(product =>(qnt += product.quantity));
              setQuantity(qnt);
          }

          useEffect(()=>{
                productPrice();
                productQnt()
          })



          return (
                    <div id='cart-fixed'>
                              <Link to="/cart">
                              <div className="cart-items-fixed">
                                        <div className="cart-icon-fixed">
                                                  <FontAwesomeIcon icon={faCartPlus}/>
                                        </div>
                                        <span className='me-2'>{quantity}</span> 
                                        <span>items</span>
                              </div>
                              <div className="cart-price-fixed">
                                        <p><span>৳ </span> {price +shippingPrice}</p>
                              </div>
                              </Link>
                    </div>
          );
};

export default CartFixed;