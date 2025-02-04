import  { React } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

  const {isAuthenticated, user} = useSelector(state => state.user);
  const routeName = window.location.pathname;
  const url = `/login?intended=${routeName} `;
  const userFromLocalStorage = localStorage.getItem("user");
  const loggedInUser = userFromLocalStorage?.length > 0? JSON.parse(userFromLocalStorage) : user;

  if(routeName === '/dashboard'){
    return loggedInUser.role ==='admin' ? children  :<Navigate to="/" /> 
  }
  return isAuthenticated && user?.email? children : <Navigate to={url}/>
};

export default PrivateRoute;