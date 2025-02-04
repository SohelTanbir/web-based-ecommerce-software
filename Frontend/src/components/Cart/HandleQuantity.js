import React from 'react';

const HandleQuantity = () => {
    const [productQuantity, setProductQuantity] = useState(1);

    // handle product quantity
    const quantityIncrease = ()=>  {
        if(productQuantity <10){
            setProductQuantity(productQuantity+1);
        }
    };
    const quantityDecrease = ()=>{
        if(productQuantity > 1){
            setProductQuantity(productQuantity-1)
        }
    }



    return (
        <div>
            
        </div>
    );
};

export default HandleQuantity;