import React from 'react';
import './LatestNews.css';


const LatestNews = ()=>{
    return(
        <div className="latestNews">
            <div className="container">
                <div className="row">
                    <div className="latestText">
                        <h2>Get Our <br /> Latest Offers News</h2>
                        <p>Subscribe news latter</p>
                    </div>
                    <div className="latestInput">
                        <input type="email" placeholder="Enter you email"/>
                        <button>Shop Now </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LatestNews;