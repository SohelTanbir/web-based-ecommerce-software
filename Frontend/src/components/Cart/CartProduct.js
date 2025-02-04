import  { React} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeProductFromCart } from '../../Store/CartSlice/CartSlice';
import Alert from 'sweetalert2'


const CartProduct = ({product}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // handle product quantity
    const quantityIncrease = async(id)=>  {
        dispatch(incrementQuantity({productId:id}));
    }
    const quantityDecrease = async(id)=>{
        dispatch(decrementQuantity({productId:id}));
    }

    // show product details page
    const showProductDetails = (id)=>{
        navigate(`/details/${id}`);
    }
// remove product from cart
    const removeProduct = async id =>{
        Alert.fire({
            title: 'Are you sure want to delete ?',
            text: "You will be able to add again!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
            dispatch(removeProductFromCart({productId:id}))
                Alert.fire(
                'Deleted!',
                'Product has been removed from cart.',
                'success'
              )
            }
          })
       
 }
  


    return (
        <div>
              <div className="single-cart-product">
                    <div className="product-photo" onClick={()=> showProductDetails(product.productId)}>
                    <img src={product?.images?.url} alt="product" />
                    </div>
                    <div className="product-title" onClick={()=> showProductDetails(product.productId)}>
                            <h4>{product.name.substring(0, 30)+"..."}</h4>
                                <p className='product-price'><span className='taka-sign'>৳ </span> {product.price*product.quantity}</p>
                    </div>  
                            <div className="product-quantity">
                                                 {product.quantity <=1? 
                                                 <button className='increase-btn' style={{color:'#dfdfdf',cursor:'default'}}>
                                                         <FontAwesomeIcon icon={faMinus} />
                                                 </button>:
                                                     <button className='increase-btn' onClick={()=> quantityDecrease(product.productId)}>
                                                         <FontAwesomeIcon icon={faMinus} />
                                                     </button>}
                                                     <span className='total-products-count'>{product.quantity}</span>
                                                     {product.quantity === 10? <button className='decrease-btn' style={{color:'#dfdfdf',cursor:'default'}}>
                                                     <FontAwesomeIcon icon={faPlus} />
                                                     </button>:
                                                     <button className='decrease-btn' onClick={()=> quantityIncrease(product.productId)}>
                                                     <FontAwesomeIcon icon={faPlus} />
                                                     </button>
                                                     }             
                                      </div>
                                     <div className="cart-action">
                                        <button className='delete-btn' title='Delete' onClick={()=> removeProduct(product.productId)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                    </button>  
                        </div>
                </div>   
        </div>
    );
};

export default CartProduct;