import React, { Fragment, useEffect, useState } from 'react';
import './UpdateProduct.css'
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import SideBar from '../SideBar/SideBar';
import { useParams } from 'react-router-dom';
import Loader from '../../Loader/Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BaseUrl } from '../../../config';


const UpdateProduct = () => {
    const [product, setProduct] = useState({});
    const [oldProduct, setOldProduct ]=  useState([]);
    const [category, setCategory ] = useState("");
    const [selectedSize, setSelectedSize ] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const { id }= useParams();


// find a product
const findProdcutById = async ()=>{
  const response = await  fetch(`${BaseUrl}/api/v1/product/one/${id}`,{
    method:'get',
    headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },
  });
  const { products } =  await response.json();
  setCategory(products.category);
  setSelectedSize(products.size);   
  setOldProduct(products);
}


// handle side effect
    useEffect(()=>{
        findProdcutById()
    }, [])


    // handle change
    const handleChange = (e)=>{
        const newProduct  ={...product}
        newProduct[e.target.name] = e.target.value;
        setProduct(newProduct);
     
    }

    // handle add product
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);
        if(product.name){
            formData.set("name",product.name);
        }
        if(product.price){
            formData.set("price",product.price);
        }
        if(product.brand){
            formData.set("brand",product.brand);
            }
         if(product.color){
            formData.set("color",product.color);
            }
            if(product.category){
            formData.set("category",product.category);
            }
         if(product.size){
            formData.set("size",product.size);
            }
        if(product.description){
            formData.set("description",product.description);
        }
    // if upload prodcut image then store product in db
    if(product){
        setLoading(true)
        const res = await fetch(`${BaseUrl}/api/v1/product/update/${id}`,{
           method:'PUT',    
           headers:{
               Authorization: `Bearer ${localStorage.getItem("token")}`
           },
            body:formData
        });
        const {success, message } =  await res.json();
        if(success){
            setLoading(false);
            toast.success(message,{position: "top-center",autoClose: 500});
            setProduct({
                name:"",
                price:"",
                brand:"",
                color:"",
                category:"",
                size:"",
                description:""
            })
        }else{
            setLoading(false)
            toast.error(message,{position: "top-center",autoClose: 1000});
        }
    }else{
        setLoading(false)
        toast.error("All field are required!",{position: "top-center",autoClose: 1000});
    }
}


    return (
      <Fragment>
        <ToastContainer/>
            {oldProduct._id ?
            <div className="update-product">
            <DashboardHeader/>
            <div className="dashboard-main">
            <SideBar></SideBar>
                <div className="main-part product-update-form">
                   <h2>Update Product</h2>
                   {!loading ?
                   <form onSubmit={handleSubmit}>
                       <div className="flex-container">
                        <div className="input-group mr-2p">
                                <label>Product name</label> <br />
                                <input type="text"  onChange={handleChange} name='name' defaultValue={oldProduct.name} />
                        </div>

                        <div className="input-group">
                            <label>Price</label> <br />
                            <input type="text" onChange={handleChange} name='price' defaultValue={oldProduct.price}/>
                        </div>

                        <div className="input-group mr-2p">
                            <label>Brand</label> <br />
                            <input type="text"  onChange={handleChange} name='brand'  defaultValue={oldProduct.brand}/>
                        </div>

                        <div className="input-group">
                            <label>Color</label> <br />
                              <input type="text" onChange={handleChange} name='color' defaultValue={oldProduct.color}/>
                        </div>

                        <div className="input-group mr-2p">
                            <label>Category</label> <br />
                            <select name="category" className="mr-2p"  id="category" onChange={handleChange} defaultValue={category}>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="winter">Winter</option>
                                <option value="electronics">Electronics</option>
                                <option value="shoes">Shoes</option>
                                <option value="watch">Watch</option>
                                <option value="bag">Bags</option>
                                <option value="t-shirt">T-shirt</option>
                                <option value="shirt">Shirt</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Size</label> <br />
                            <select name="size" id="size" onChange={handleChange} defaultValue={selectedSize}>
                            <option value="none">None</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="M, L">M, L</option>
                            <option value="M, XL">M, XL</option>
                            <option value="L, XL">L, XL</option>
                            <option value="M, L, XL ">M, L, XL</option>
                        </select>
                        </div>
                        <div className="w-100 mr-2p">
                            <label>Photo</label> <br />
                            <input name='photo'  onChange={(e)=>  setImage(e.target.files[0])} type="file"/><br />
                                <div className="preview-product-img">
                                    <img src={oldProduct.images[0].url} alt="product" />
                                </div>
                        </div>

                        <div className="input-group w-100">
                            <label>Description</label> <br />
                            <textarea name="description"  onChange={handleChange}  defaultValue={oldProduct.description}></textarea>
                        </div>
                
                       <button className='submit-btn' type="submit">Update Product</button>
                       </div>
                   </form>
                   :<Loader/> 
                   }
                </div>
            </div>
        </div>:<Loader/>    }
      </Fragment>
    );
};

export default UpdateProduct;