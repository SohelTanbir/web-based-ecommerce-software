import React, {  Fragment, useState } from 'react';
import './ResetPassword.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import { BaseUrl } from '../../config';




const ResetPassword = () => {
    const navigate = useNavigate();
    const [resetPassword, setResetPassword] = useState({
        password:"",
        confirmPassword:""
    });
    const [loader, setLoader] =  useState(false);
    const { token } = useParams();
    const [showError, setShowError] = useState({});

    const handleChange = (e)=>{
        const newPassword = {...resetPassword};
        newPassword[e.target.name] = e.target.value;
        setResetPassword(newPassword);
    }
    // submit email and get the reset password url
    const handleSubmit = async e =>{

        e.preventDefault();
        // validate password
        if (!resetPassword.password) {
            setShowError({ password: "Please enter new pasword!" });
            return;
          }
          setShowError({ password: "" });
          if (resetPassword.password.length < 6) {
            setShowError({ password: "Password must be 6 digit" });
            return;
          }
          setShowError({ password: "" });

        // validate confirm password
        if (!resetPassword.confirmPassword) {
            setShowError({ confirmPassword: "Please enter confirm pasword!" });
            return;
          }
          setShowError({ password: "" });
          if (resetPassword.confirmPassword.length < 6) {
            setShowError({ confirmPassword: "Confirm password must be 6 digit" });
            return;
          }
          setShowError({ confirmPassword: "" });
          setLoader(true);

       if(resetPassword.password.length > 0 && resetPassword.confirmPassword.length > 0){
        if(resetPassword.password === resetPassword.confirmPassword){
            const response = await  fetch(`${BaseUrl}/api/v1/users/password/reset/${token}`,{
                method:'post',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(resetPassword)
        })
        const { success, message} = await response.json();
        if(success){
            // close loader
            setLoader(false);
            //reset input blank
            setResetPassword({password:"", confirmPassword:""});
            toast.success(message,{position: "top-center",autoClose: 1000});
            // redirect to login page
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }else{
            setLoader(false);
            toast.error(message,{position: "top-center",autoClose:1000});
        }
        }else{
            setLoader(false);
            toast.error(" Confirm password is not match!",{position: "top-center",autoClose: 2000});
        }
       }else{
        toast.error("All field required!",{position: "top-center",autoClose: 1000});
        setTimeout(()=>   setLoader(false), 500)
       }
    }

    return (
      <Fragment>
            <Header/>
            <div className='set-new-password'>
            <div className="container">
            <ToastContainer />
                {loader&& <Loader/>}
                <div className="set-news-passowrd-form">
                    <h4> New Password!</h4>
                    <p>You are ready to set new password.</p>
                    <form onSubmit={handleSubmit}>
                        <input type="password" onChange={handleChange} name='password' placeholder='New password' value={resetPassword.password}/> <br />
                        {showError.password && (
                    <p className="text-danger fw-bold p-2 fs-5 text-start">
                      {showError.password}
                    </p>
                  )}
                    <input type="password" onChange={handleChange} name='confirmPassword' placeholder='Confirm password' value={resetPassword.confirmPassword}/> <br />
                    {showError.confirmPassword && (
                    <p className="text-danger fw-bold p-2 fs-5 text-start">
                      {showError.confirmPassword}
                    </p>
                  )}
                        <button className='set-password-btn mt-5'>Save Change</button>
                    </form>
                </div>
            </div>
        </div>
      </Fragment>
    );
};

export default ResetPassword;