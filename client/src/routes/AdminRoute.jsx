import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../hooks/useUser';

const AdminRoute = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation()
    const [userInfo,isPending] = useUser()

    console.log(userInfo);

    if (loading || isPending) {
        return <p>Loading.....</p>;
    }
    
    if (!user || !userInfo || userInfo.role !== 'admin') {
        return <Navigate to="/signin" state={location.pathname } replace />;
    }
    
    return children;
};

export default AdminRoute;