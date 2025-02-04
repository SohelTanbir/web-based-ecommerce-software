import React from 'react';
import './NotFoundMessage.css';


const NotFoundMessage = ({message = 'There is no data available!'}) => {
          return (
                    <div className='not-found-message'>
                              <h2>{message}</h2>
                    </div>
          );
};

export default NotFoundMessage;