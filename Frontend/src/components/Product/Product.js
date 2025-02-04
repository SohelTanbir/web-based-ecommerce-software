import React, { Fragment, useEffect, useState } from 'react';
import './Product.css'
import ProductCard from '../ProductCard/ProductCard';
import Loader from '../Loader/Loader';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import PagePagination from '../Pagination/PagePagination';
import NotFoundMessage from '../NotFoundMessage/NotFoundMessage';
import { BaseUrl } from '../../config';



const Product = () => {
    const [loading, setLoading ] = useState(true);
    const [products, setProducts] = useState([]);
    const currentPath = window.location.pathname;
    const searchInputVal =  useSelector(state => state.searchVal.searchVal);
    const pageNumber =  useSelector(state => state.PaginationSlice.page);
    const {category} =  useSelector(state =>state.category);
    const [totalProduct, setTotalProduct ] =  useState(0);


const loadProduct = async()=>{
    const res = await fetch(`${BaseUrl}/api/v1/product/all?name=${searchInputVal}&category=${category}&page=${pageNumber}`);
    const {success, products, total} = await res.json();
        // off laoader 
        if(success || !success){
            setLoading(false);
        }
    setProducts(products);
    setTotalProduct(total)
}
    useEffect(()=>{
        loadProduct();
    }, [searchInputVal, pageNumber, category]);

    return (
       <Fragment>
            {currentPath === "/product" && <Header/>}
            <div className="container" id="product">
                <div className="product-heading">
                    <h2>Brand Product</h2>
                    <p>Choose your favorite product from here</p>
                </div>
                    {!loading?
                    <div className="row g-4">
                        {
                           products.length?
                           products.map(product => <ProductCard key={product._id}  product={product}/>)
                           :
                           <NotFoundMessage message='There is no prducts found!'/>
                        }
                    </div>
                    :<Loader />}

                    <div className="pagination-container">
                        <PagePagination totalProduct={totalProduct}/>
                    </div>
        </div>
       </Fragment>
    );
};

export default Product;