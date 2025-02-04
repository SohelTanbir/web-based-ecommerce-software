import React from 'react';
import discoutnImg from '../../images/discount.png'
import supportImg from '../../images/support-2.png'
import shipping from '../../images/free.png';
import money from '../../images/money.png';
import ServiceCard from '../ServiceCard/ServiceCard';


const serviceData = [
    {
        title:'Order Discount',
        description:'Get 5% off on your first order',
        imgUrl:discoutnImg
    },
    {
        title:'Money Return',
        description:'100% Money back guarantee',
        imgUrl:money
    },
    {
        title:'Support 24/7',
        description:'Get Instant customer support',
        imgUrl:supportImg
    },
    {
        title:'Free Shipping',
        description:'Free shipping on first order',
        imgUrl:shipping
    }
]

const Service = () => {
    return(
        <div className="service py-5">
            <div className="container">
                <div className="row">
                    {
                        serviceData.map(serivce => <ServiceCard service={serivce}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Service;