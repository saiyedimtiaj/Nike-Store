import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation()
    console.log(location);

    if(loading){
        return <p>Loading.....</p>
    }
    if(user){
        return children
    }
    return <Navigate to='/signin' state={location.pathname} replace />
};

export default PrivateRoutes;


