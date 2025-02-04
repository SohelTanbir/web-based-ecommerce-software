import React, { useEffect, useState } from 'react';
import './ManageProducts.css'
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import SideBar from '../SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader'
import NotFoundMessage from '../../NotFoundMessage/NotFoundMessage';
import Alert from 'sweetalert2'
import PagePagination from '../../Pagination/PagePagination';
import { useSelector } from 'react-redux';
import { BaseUrl } from '../../../config';





const ManageProducts = () => {
    const [products, setProducts ] = useState([]);
    const [loading, setLoading ] =  useState(true);
    const [totalProduct, setTotalProduct ] =  useState(0)
    const navigate = useNavigate();
    const pageNumber =  useSelector(state => state.PaginationSlice.page);

const loadProduct = async ()=>{
    const response = await fetch(`${BaseUrl}/api/v1/product/all?page=${pageNumber}`);
    const {success, products, total} = await response.json();
    if(success || !success){
        setLoading(false);
    }
    setProducts(products);
    setTotalProduct(total)
}
const deleteProduct = async (productId)=>{
    const {isConfirmed} = await   Alert.fire({
        title: 'Are you sure want to delete ?',
        text: "You won't be able to revert the product!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      });
    if (isConfirmed) {
        setLoading(true);
        const response = await fetch(`${BaseUrl}/api/v1/product/delete/${productId}`,{
            method:"DELETE",
            headers:{'content-type':'application/json'}
        });
        const {success, message} = await response.json();
        if(success){
            setLoading(false);
            Alert.fire(
                message,
                'Product has been deleted.',
                'success'
              ) 
        }else{
            Alert.fire({
                icon: 'error',
                title: message,
              })
        } 
        }
 
}

// page navigate to update product
const pageNavigate = (id)=>{
    navigate(`/dashboard/products/update/${id}`)
}

useEffect( ( )=>{
    loadProduct();
}, [products])

   const nameModify = (productName)=>{
    if(JSON.stringify(productName)?.length >10){
            return JSON.stringify(productName).slice(0,10) + "...";
    }else{
        return productName
    }
}



    return (
        <div className="manage-products">
            <ToastContainer/>
            <DashboardHeader/>
            <div className="dashboard-main">
            <SideBar/>
                {
                    !loading ? 
                     <div className="product-main">
                    <h2>All Products({products.length?products.length : 0})</h2>
                 { products&& products.length > 0?  
                    <div className="products-container">
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>photo</th>
                                <th>Price</th>
                                <th>Brand</th>
                                <th>Size</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
    
                            {
                                products.map((product, index) =>( 
                                    <tr>
                                        <td># {nameModify(product._id)}</td>
                                        <td className='product-name'>{nameModify(product.name)}</td>
                                        <td><img src={product.images[0].url} alt="product" /> </td>
                                        <td><span>৳ </span> {product.price}</td>
                                        <td> {product.brand}</td>
                                        <td>{product.size}</td>
                                        <td>{product.category}</td>
                                        <td>
                                        <button className='action-btn edit-btn' onClick={ ()=> pageNavigate(product._id)}><FontAwesomeIcon title='Edit' icon={faEdit }  /> ||</button>
                                            <button className='action-btn delete-btn' onClick={()=> deleteProduct(product._id)}><FontAwesomeIcon title='Delete ' icon={faTrash }/> ||</button>
                                            <Link to="/products/view"><button className='action-btn view-btn'><FontAwesomeIcon title='View' icon={faEye }  /></button></Link>
                                        </td>
                                </tr>
                            ))
                            
                            }
                        </table>
                      <div className="pagination-container  d-flex justify-content-center py-2">
                        <PagePagination totalProduct={totalProduct}/>
                      </div>
                    </div>
                    :
                  <NotFoundMessage message='There is no products found !'/>
                    }
                  
                </div>
                : <Loader/>

                }
            </div>
        </div>
    );
};

export default ManageProducts;