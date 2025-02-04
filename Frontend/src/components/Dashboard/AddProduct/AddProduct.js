import React, {  useEffect, useState } from 'react';
import './AddProduct.css'
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import SideBar from '../SideBar/SideBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
import Alert from 'sweetalert2'
import { BaseUrl } from '../../../config';


const AddProduct = () => {
    const [product, setProduct] = useState({
        name:"",
        price:"",
        brand:"",
        color:"",
        category:"",
        size:"",
        description:""
    });
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [file, setFile ] = useState("");
    const [previewImageUrl, setPreviewImageUrl  ] = useState("")

    
    const loadCategory = async()=>{
        const res =  await fetch(`${BaseUrl}/api/v1/category/all`);
        const {categories} = await res.json();
        setCategories(categories);
    }

    //  handle side effect actions
    useEffect(()=>{
        loadCategory();
    },[categories])




    // handle change
    const handleChange = (e)=>{
        const newProduct  ={...product}
        newProduct[e.target.name] = e.target.value;
        setProduct(newProduct);
    }
    
    // handle add product
    const handleSubmit = async (e)=>{
        setLoading(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.set("name",product.name);
        formData.set("price",product.price);
        formData.set("brand",product.brand);
        formData.set("color",product.color);
        formData.set("category",product.category);
        formData.set("size",product.size);
        formData.set("description",product.description);

    
    // if upload prodcut image then store product in db
    if(product.name && product.brand && product.price && product.color && product.description ){
        setLoading(true)
        const res = await fetch(`${BaseUrl}/api/v1/product/create`,{
           method:'POST',
            body:formData
        });
        const {success, message } =  await res.json();
        if(success){
            setLoading(false)
            Alert.fire({
                position: 'center',
                icon: 'success',
                title: 'Product has been created!',
                showConfirmButton: false,
                timer: 3000
              })
         
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
            Alert.fire({
                icon: 'error',
                title: message,
                text: 'Something went wrong!',
              })
            toast.error(message,{position: "top-center",autoClose: 1000});
        }
    }else{
        Alert.fire({
            icon: 'error',
            title: 'Sorry!',
            text: 'All field are required!',
          })
          setLoading(false)
    }

    }
// upload image 
const fileUploader = (e)=>{
    let reader = new FileReader();
    let files = e.target.files[0];


    reader.onloadend = ()=>{
        setPreviewImageUrl(reader.result)
    }
    reader.readAsDataURL(files);
    setImage(files);
    
}

    return (
        <div className="addProduct">
                <ToastContainer />
            <DashboardHeader/>
            <div className="dashboard-main">
            <SideBar></SideBar>

                <div className="main-part product-add-form">
                   <h2>Add New Product</h2>
                   {!loading ?
                   <form onSubmit={handleSubmit}  encType="multipart/form-data">
                       <input type="text" className="mr-2p" onChange={handleChange} name='name' placeholder="Product Name" value={product.name} />
                       <input type="text" onChange={handleChange} name='price' placeholder="৳ Price" value={product.price}/>
                       <input type="text" className="mr-2p"  onChange={handleChange} name='brand' placeholder="Brand" value={product.brand} /> 
                       <input type="text" onChange={handleChange} name='color' placeholder="Color" value={product.color}/>
                       <select name="category" className="mr-2p"  id="category" onChange={handleChange} value={product.category}>
                            <option value="all">Category</option>
                           {categories && 
                               categories?.map(category =>(
                                    <option value={category?.name}>{category?.name}</option>
                               )) 
                            }
                        </select>
                       <select name="size" id="size" onChange={handleChange} value={product.size}>
                            <option value="all">Size</option>
                            <option value="none">None</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="M, L">M, L</option>
                            <option value="M, XL">M, XL</option>
                            <option value="L, XL">L, XL</option>
                            <option value="M, L, XL ">M, L, XL</option>
                        </select>
                       <input name='photo' className="mr-2p"  onChange={fileUploader} type="file" defaultValue=""/><br />
                       {previewImageUrl &&
                        <div className="uploaded-image-preview  pb-3">
                                <img className='img-thumbnail' src={previewImageUrl} alt="" />
                        </div>
                       }
                       <textarea name="description"  onChange={handleChange} placeholder='Product description' value={product.description}></textarea>
                       <button className='submit-btn' type="submit">Add Product</button>
                   </form>
                   :<Loader/>
                    }
                </div>
            </div>
        </div>
    );
};

export default AddProduct;