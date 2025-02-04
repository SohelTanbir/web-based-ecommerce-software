import React from 'react';
import './Loader.css';
import  {BeatLoader, PropagateLoader } from "react-spinners";


const Loader = () => {
    return (
        <div className='loader container'>
               <PropagateLoader color="#FF6000" />
        </div>
    );
};

export default Loader;