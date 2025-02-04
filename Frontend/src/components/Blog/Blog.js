import React from 'react';
import './Blog.css'
import blog1 from '../../images/blog-1.jpg'
import blog2 from '../../images/blog-2.jpg'
import blog3 from '../../images/blog-3.jpg'
import BlogCard from './BlogCard/BlogCard';


const blogData = [
    {
        id:1,
        title:'Lorem ipsum dolor sit amet consec.',
        img:blog1
    },
    {
        id:2,
        title:'Lorem ipsum dolor sit amet consec.',
        img:blog2
    },
    {
        id:3,
        title:'Lorem ipsum dolor sit amet consec.',
        img:blog3
    },
    {
        id:3,
        title:'Lorem ipsum dolor sit amet consec.',
        img:blog3
    },
    {
        id:3,
        title:'Lorem ipsum dolor sit amet consec.',
        img:blog3
    },
    {
        id:3,
        title:'Lorem ipsum dolor sit amet consec.',
        img:blog3
    },
]

const Blog = () => {
    return (
        <div className="blog" id="blog">
            <div className="container">
            <div className="product-heading">
               <h2>Latest Blogs</h2>
               <p style={{marginBottom:'2rem'}}>You can read our popular blogs from here</p>
           </div>
                <div className="row">
                    {
                        blogData.map(blog => <BlogCard blog={blog}/>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Blog;