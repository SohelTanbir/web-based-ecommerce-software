import React, { Fragment, useState } from 'react';
import './ForgotPassword.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import Header from '../Header/Header'
import { isValidEmail } from '../../utilities';
import { BaseUrl } from '../../config';



const ForgotPassword = () => {
    const [email, setEmaqil ] = useState("");
    const [loader, setLoader] =  useState(false);
    const [showError, setShowError] = useState({});
    const handleChange = (e)=>{
        setEmaqil(e.target.value);
    
            if (!isValidEmail(email)) {
              setShowError({ email: "Invalid email address!" });
              return "";
            }
            setShowError({ email: "" });
    }
    // submit email and get the reset password url
    const handleSubmit = async e =>{
        e.preventDefault();
    // email validation
    if (!email) {
        setShowError({ email: "Please enter email address!" });
        return;
      }
      setShowError({ email: "" });
      if (!isValidEmail(email)) {
        setShowError({ email: "Invalid email address!" });
        return "";
      }
      setShowError({ email: "" });
      setLoader(true);
       if(email.length > 0){
        const response = await  fetch(`${BaseUrl}/api/v1/users/password/forgot`,{
            method:'post',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({email})
    })
    const { success, message} = await response.json();
    if(success){
        setLoader(false);
        toast.success(message,{position: "top-center",autoClose: 1000});
    }else{
        setLoader(false);
        toast.error(message,{position: "top-center",autoClose: 1000});
    }
       }else{
        toast.error("All field required!",{position: "top-center",autoClose: 1000});
        setTimeout(()=>   setLoader(false), 500)
       }
    }

    return (
        <Fragment>
                <Header/>
                <div className='reset-password'>
                <div className="container">
                    <ToastContainer />
                    {loader&& <Loader/>}
                    <div className="reset-password-form">
                        <h4>Forgot Password?</h4>
                        <p>Please Enter your email, we will send a link to reset your password</p>
                        <form onSubmit={handleSubmit}>
                            <input type="text" onChange={handleChange} placeholder='Enter your email '    /> <br />
                            {showError.email && (
                            <p className="text-danger fw-bold p-2 fs-5 text-start">
                            {showError.email}
                            </p>
                        )}
                            <button className='reset-password-btn mt-4'>Send link</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ForgotPassword;