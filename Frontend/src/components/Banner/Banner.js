import React, { useRef, useState } from 'react';
import './Banner.css'
import Slider from '../Slider/Slider';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { getCategory } from '../../Store/Category/CategorySlice';

const Banner = ()=>{
    const dispatch = useDispatch();
    const handleSelectCategory = (e)=>{
        const categoryItems = document.querySelectorAll(".category-item");
        categoryItems.forEach(item =>
            {
                if( item.classList.contains("active-category")){
                    item.classList.remove("active-category")
                }
            }
        )
        e.target.classList.add("active-category");
        dispatch(getCategory(e.target.getAttribute("data")));
    }



    return(
        <div className="banner">
           <div className="container-lg">
               <div className="row">
                <div className="categories">
                    <h3>
                        <span className="category-icon">
                            <FontAwesomeIcon icon={faList} />
                        </span>
                        Top Categories 
                    </h3>
                    <ul  className="categori-items">
                        <li  onClick={handleSelectCategory} className="category-item active-category" data="">All Categories</li>
                        <li  onClick={handleSelectCategory} className="category-item" data="electronics">Electronics</li>
                        <li onClick={handleSelectCategory} className="category-item" data="men">Men's Fashion</li>
                        <li  onClick={handleSelectCategory} className="category-item" data="women">Women's Fashion</li>
                        <li onClick={handleSelectCategory} className="category-item" data="winter">Winter Cloths</li>
                        <li onClick={handleSelectCategory} className="category-item" data="shoes">Shoes Collections</li>
                        <li onClick={handleSelectCategory} className="category-item" data="shirt">Shirt</li>
                        <li onClick={handleSelectCategory} className="category-item" data="t-shirt">T-Shirt </li>
                        <li onClick={handleSelectCategory} className="category-item" data="bag">Bags</li>
                        <li onClick={handleSelectCategory} className="category-item" data="watch">Watches</li>
                        <li onClick={handleSelectCategory} className="category-item" data="others">Others</li>
                    </ul>
                </div>
                <div className="banner-slider">
                     <Slider/>
                </div>
               </div>
           </div>
        </div>
    )
}

export default Banner;