import React from 'react';
import { Navigate } from 'react-router';
import { useAuthAdmin } from '../../hooks/useAuthAdmin';

function PrivateRoute({children}) {
    const auth = useAuthAdmin();
    
    return auth ? children : <Navigate to="/admin"></Navigate>
}

export default PrivateRoute;