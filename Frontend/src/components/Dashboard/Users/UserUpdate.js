import React, { useEffect, useState } from 'react';
import './UserUpdate.css'
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import SideBar from '../SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../../Loader/Loader'
import { useParams } from 'react-router-dom';
import {  faUpload } from '@fortawesome/free-solid-svg-icons';
import Alert from 'sweetalert2'
import { BaseUrl } from '../../../config';




const UserUpdate = () => {
    const { id }= useParams();
    const [file, setFile ] = useState("");
    const [previewImageUrl, setPreviewImageUrl ] = useState("");
    const [selectedUser, setSelectedUser ] = useState([])
    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      role: "",
    });

    // find user by id
    const findUser = async()=>{
        const response  = await fetch(`${BaseUrl}/api/v1/users/one/${id}`, {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        });
        const {success, user} =await response.json();
        setSelectedUser(user)
    }

    useEffect(()=>{
        findUser();
      
    }, [])


    const handleChange = (e) => {
            const newUser = {...user}
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
            const files = e.target.files &&  e.target.files[0]
            let reader = new FileReader();
            reader.onloadend = ()=>{
                setFile(files)
                setPreviewImageUrl(reader.result);
            }
            // read image file
            files && reader.readAsDataURL(files);
    };
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (user.name || user.email || user.password || user.role) {
        const formData = new FormData();
       if(file.name){
        formData.set("image", file);
       }
        if(user.name){
          formData.set("name", user.name);
        }
        if(user.email){
          formData.set("email", user.email);
        }
        if(user.password){
          formData.set("password", user.password);
        }
        if(user.role){
          formData.set("role", user.role);
        }
      
      const response = await fetch(
          `${BaseUrl}/api/v1/users/update/one/${id}`,
          {
            method: "POST",
            body: formData,
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          }
        );
        const { success, message } = await response.json();
        console.log(message);
        if (success) {
          Alert.fire(message, `Congrations!`, "success");
          // reset user information
          setUser({
            name: "",
            email: "",
            password: "",
            role: "",
          });
        } else {
          Alert.fire({
            icon: "error",
            title: message,
            text: `Ops! we find an error!`,
          });
        }
      } else {
        Alert.fire({
          icon: "error",
          title: "User update failed!",
          text: "You must enter  user information!",
        });
      }
    };
  




    return (
        <div className="user-update">
            <DashboardHeader/>
            <div className="dashboard-main">
            <SideBar/>
            <div className="users-main">
              <div className="container">
              <div className="users-header">
                    <h2>Update user</h2>
                    </div>
                {selectedUser?.email ?
                    <div className="row">
                    <div className="col-lg-12">
                    <form onSubmit={handleSubmit} className="py-4">
                        <div className="input-group w-100 mb-5">
                        <input
                            type="text"
                            onChange={handleChange}
                            className="form-control w-100 fs-3 py-3"
                            name="name"
                            placeholder="Name"
                            defaultValue={selectedUser.name}
                        />
                        </div>
                        <div className="input-group w-100 mb-5">
                        <input
                            type="email"
                            onChange={handleChange}
                            className="form-control w-100 fs-3 py-3"
                            name="email"
                            placeholder="Email"
                            defaultValue={selectedUser.email}
                        />
                        </div>
                        <div className="input-group w-100 mb-5">
                        <input
                            type="password"
                            onChange={handleChange}
                            className="form-control w-100 fs-3 py-3"
                            name="password"
                            placeholder="Password"
                            defaultValue={user?.password}
                        />
                        </div>
                        <div className="input-group w-100 mb-4">
                        <select name="role"  onChange={handleChange}>
                            <option selected value="user">
                            User
                            </option>
                            <option value="admin">Admin</option>
                        </select>
                        </div>
                        <div className="d-flex mb-3 align-items-center justify-content-between">
                                            <div className="col-sm-1">
                                                <div className="preview-photo">
                                                    <img src={previewImageUrl?previewImageUrl:selectedUser.image[0]?.url || '/user/user.png'} alt="user" />
                                                </div>
                                            </div>
                                            <div className="col-sm-11 col-11">
                                            <input className="user-update-file-input" type="file" name="avatar" onChange={handleChange} placeholder="photo"/> <br />
                                            <labe className="user_update_file_input_label">
                                            <FontAwesomeIcon icon={faUpload} />
                                                <span className='ms-2'>Upload photo</span>
                                            </labe>
                                            </div>
                                        </div>
                            <div className="input-group w-100 ">
                            <input
                            style={{background:'#FF6000', color:'#fff'}}
                        type="submit"
                        className="btn save-user-btn  ms-auto fs-3 my-4 py-2 rounded"
                        value="Save Changes"
                        />
                            </div>
                    </form>
                    </div>
                    </div>
                :
                <Loader/>
                }
              </div>
            </div>
            </div>
        </div>
    );
};

export default UserUpdate;