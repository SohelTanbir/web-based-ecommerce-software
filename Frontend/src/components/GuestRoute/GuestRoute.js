import  { React } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';

const GuestRoute = ({children}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const intendedUrl = searchParams.get('intended');
  const {isAuthenticated, user} = useSelector(state => state.user);
  const url =intendedUrl?intendedUrl :'/'


    return isAuthenticated && user?.email? <Navigate to={url}/>: children 
    
};

export default GuestRoute;