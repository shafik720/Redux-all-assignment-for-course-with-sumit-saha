import React from 'react';
import { Navigate } from 'react-router';
import { useAuthAdmin } from '../../hooks/useAuthAdmin';

function PublicRoute({children}) {
    const auth = useAuthAdmin();
    
    return !auth ? children : <Navigate to="/admin/dashboard"></Navigate>
}

export default PublicRoute;