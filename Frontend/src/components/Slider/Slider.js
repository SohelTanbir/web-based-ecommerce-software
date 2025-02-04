import React from 'react';
import   SwiperCore, { Pagination,Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import banner1 from '../../images/banner-1.png'
import banner2 from '../../images/banner-2.jpg'
import banner3 from '../../images/banner-3.jpg'


const Slider = () => {
    SwiperCore.use([Autoplay])
    
    return (
        <div>
                <Swiper
                   modules={[Pagination]}
                   slidesPerView={1}
                   pagination={{ clickable: true }}
                   autoplay={{delay: 10000}}
                >
                <SwiperSlide>
                    <img src={banner2} alt="product " />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={banner1} alt="product " />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={banner3} alt="product " />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={banner1} alt="product " />
                </SwiperSlide>

                </Swiper>
        </div>
    );
};

export default Slider;