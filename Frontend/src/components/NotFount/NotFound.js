import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className='not-found'>
            <div className="container">
            <h2>4<span>0</span>4</h2>
            <h4>Page Not Found!</h4>
                <Link to="/">
                <button>Back  to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;