import React from 'react';
import './BlogCard.css'


const BlogCard = ({blog}) => {
    return (
        <div className="single-blog">
            <img src={blog.img} alt="image" />
            <div className="blog-overlay">
                <h3>Lorem ipsum dolor sit amet.</h3>
                <p>Posted by Admin</p>
            </div>
        </div>
    );
};

export default BlogCard;