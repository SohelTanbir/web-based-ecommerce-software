import React from 'react';
import './ServiceCard.css';


const ServiceCard = ({service}) => {
    return (
                    <div className="col-md-3 py-3">
                        <div className="d-flex justify-content-beteen">
                                <div className="icon" style={{width:'5rem'}}>
                                    <img  src={service.imgUrl} className="img-fluid " alt="" />
                                </div>
                            <div className="service-text">
                                <h3 className='fw-bold'>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        </div>
                    </div>
    );
};

export default ServiceCard;