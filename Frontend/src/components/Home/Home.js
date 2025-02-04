import React, { Fragment } from 'react';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import HeaderTop from '../Header/HeaderTop';

import LatestNews from '../LatestNews/LatestNews';
import Product from '../Product/Product';
import SearchBox from '../SearchBox/SearchBox';
import Service from '../Service/Service';
import CartFixed from '../Cart/CartFixed';


const Home = ()=> {
    return (
        <Fragment>
            <HeaderTop/>
            <Header/>
            <div className="home">
                <CartFixed/>
                <Banner/>
                <Service/>
                <Product/>
                <LatestNews/>
                {/* <Blog/> */}
                <Footer/>
            </div>
        </Fragment>
    )
}

export default Home;