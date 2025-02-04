import React from 'react';
import './Review.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faStar, faStarHalf, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Review = ({name, rating, comment}) => {
    return (
        <div className='review container'>
            <div className="rating">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
            </div>
        <Link to="/users/profile"><h3>{name?name:'User'} <FontAwesomeIcon style={{fontSize:'1.2rem'}} icon={faCheckCircle} /></h3></Link>
            <p>{comment}.</p>
        </div>
    );
};

export default Review;