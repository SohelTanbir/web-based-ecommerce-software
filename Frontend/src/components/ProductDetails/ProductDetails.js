import React, { Fragment, useEffect, useState } from 'react';
import './ProductDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom';
import Review from '../Reviews/Review';
import Loader from '../Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header';
import HeaderTop from '../Header/HeaderTop';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Store/CartSlice/CartSlice';
import Alert from 'sweetalert2'
import { BaseUrl } from '../../config';


const ProductDetails = () => {
    const dispatch =  useDispatch();
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    useEffect(()=>{
        fetch(`${BaseUrl}/api/v1/product/one/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data.products));
    }, []);
    
// handle buy product 
const handleBuyProduct  = (productId)=>{
    if(productId){
    Alert.fire({
        title: 'Ops!',
        text: "We are working on it!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      })
    }
}

// add product to cart
const handleAddToCart = async(productId) =>{
        if(product._id===productId){
            const cartProduct = {
                productId:product._id,
                name:product.name,
                description:product.description,
                price:product.price,
                category:product.category,
                quantity:1,
                images:{
                    public_id:product.images[0].public_id,
                    url:product.images[0].url
                }
            }
        const isAdded =     dispatch(addToCart(cartProduct))
            if(isAdded){
                toast.success("1 product added to cart!", {position: "top-center",autoClose: 1000,}) 
               }else{
    
                toast.error("Something wrong!", {position: "top-center",autoClose: 1000,}) 
               }
            }
}













    return (
      <Fragment>
        <HeaderTop/>
            <Header/>
            <div className='product-details'>
               <ToastContainer />
            {product._id ? <div className="container">
                <div className="row">
                    <div className="product-img">
                        <img src={product.images[0].url} alt="product" />
                    </div>
                    <div className="product-text">
                        <h2>{product.name}</h2>
                        <div className="rating">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalfAlt} />
                        <Link to="/reviews"><span className='total-ratings'>{product.ratings} ratings</span></Link>
                        </div>
                        <p className='brand'>Brand: {product.brand?product.brand:'No brand'}</p>
                        <p className='color'><span>Color</span>:  {product.color?product.color:'Mix'}</p>
                        <div className="price">
                            <h3><span className='taka-sign'>৳ </span>{product.price} </h3>
                        </div>
                      {product.size&& <div className="size d-none">
                            <div className="M active">
                                <h4>M</h4>
                            </div>
                            <div className="L">
                                <h4>L</h4>
                            </div>
                            <div className="XL">
                                <h4>XL</h4>
                            </div>
                        </div>}
                        <div className="button-group">
                            <button onClick={()=>{handleBuyProduct(product._id)}} className='buy-now-btn'>Buy Now</button>
                            <button onClick={()=>{ handleAddToCart(product._id)}} className='add-to-cart-btn'>Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="product-description">
                    <h4>Details of Product: {product.name}</h4>
                    <p> {product.description}</p>
                </div>
                {product.reviews.Length?<div className="product-reviews">
                    <h4>Ratings and Reviews of....</h4>
                    <h2>ratings <span>/ 5</span>5</h2>
                    <div className="rating">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalfAlt} /> <br />
                        <span className='total-ratings'>12 ratings</span>
                    </div>

                    {product[0].allReviews.length > 0&&product[0].allReviews.map(review =>(
                         <Review name={review.user} rating="5" comment={review.review} />
                    ))}
                </div>: <p className='no-reviews'>No reviews</p>}
            </div>
            :<Loader/>}
        </div>
      </Fragment>
    );
};

export default ProductDetails;