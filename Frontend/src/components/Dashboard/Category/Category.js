import React, { useEffect, useState } from 'react';
import './Category.css'
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import SideBar from '../SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Loader from '../../Loader/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryModal from './CategoryModal/CategoryModal';
import NotFoundMessage from '../../NotFoundMessage/NotFoundMessage';
import Alert from 'sweetalert2'
import { BaseUrl } from '../../../config';






const Category = () => {
    const [category, setCategory ] = useState([]);
    const [showModal, setShowModal ] = useState(false);
    const [loading, setLoading ] =  useState(true);


    const loadCategory = async()=>{
        const res =  await fetch(`${BaseUrl}/api/v1/category/all`);
        const {success, categories} = await res.json();
        if(success || !success){
            setLoading(false)
        }
        setCategory(categories);
    }

    //  handle side effect actions
    useEffect(()=>{
        loadCategory();
    },[category])

    // handle modal close or Show
    const handleModal = ()=>{
        setShowModal(true);
    }

    const deleteProduct = async(id)=>{
        const {isConfirmed} = await   Alert.fire({
            title: 'Are you sure want to delete?',
            text: "You can add new category again!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          });
    if(isConfirmed){
        const response = await fetch(`${BaseUrl}/api/v1/category/delete/${id}`,{
            method:"DELETE"
        })
        const {success, message } = await response.json();
        if(success){
            setLoading(false);
            Alert.fire(
                message,
                'Category has been deleted!.',
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


    return (
        <div className="all-orders">
            <CategoryModal showModal={showModal} setShowModal={setShowModal}/>
            <ToastContainer/>
            <DashboardHeader/>
            <div className="dashboard-main">
            <SideBar/>
            <div className="category-main">
                    <div className="category-header">
                    <h2>All Category({category.length? category.length : 0})</h2>
                    <button onClick={handleModal}>Add category</button>
                    </div>
                    <div className="row">
                        {!loading ?
                        <>
                            {
                              category?  category.map(categoriItem =>(
                                    <div className="single-category col-xl-1  col-md-3 col-sm-4">
                                        <span>{categoriItem.name}</span>
                                        <FontAwesomeIcon onClick={()=> deleteProduct(categoriItem._id)} icon={faTimes} />
                                    </div>
                                ))
                                :
                                <NotFoundMessage message='There is no category exist!'/>
                            }
                        </>
                        :<Loader/>
                        }
                    </div>
            </div>
            </div>
        </div>
    );
};

export default Category;