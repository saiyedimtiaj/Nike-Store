import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../hooks/useUser';

const AdminRoute = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation()
    const [userInfo,isPending] = useUser()

    if(loading || isPending){
        return <p>Loading.....</p>
    }
    if(user && userInfo.role === 'admin'){
        return children
    }
    return <Navigate to='/signin' state={location.pathname} replace />
};

export default AdminRoute;