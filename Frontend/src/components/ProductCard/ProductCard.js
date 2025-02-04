import { React } from 'react';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Store/CartSlice/CartSlice';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const dispatch =  useDispatch();

    const goDetailsPage  = (id) =>{
        navigate(`/details/${id}`);
    }
    // product name modify
    const productName = ()=>{
        if(JSON.stringify(product.name).length >30){
                return JSON.stringify(product.name).slice(0,30) + "...";
        }else{
            return product.name
        }
    }

const handleAddToCart = async(id) =>{
    if(product._id===id){
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
            <div  className="single-product">
                        <img onClick={()=> goDetailsPage(product._id)} src={product.images[0]?.url} alt="product" />
                        <h3 onClick={()=> goDetailsPage(product._id)} className='product-name'>{productName()}</h3>
                        <div className="rating">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        </div>
                        <h3 className='product-price'>Price: <span className='taka-sign'>৳ </span> {product.price}</h3>
                        <ToastContainer />
                        <button className="plus-btn " onClick={()=> handleAddToCart(product._id)}>
                                <FontAwesomeIcon icon={faPlus} />
                                {/* <FontAwesomeIcon icon={faMinus} /> */}
                        </button>
             </div>
    );
};

export default ProductCard;