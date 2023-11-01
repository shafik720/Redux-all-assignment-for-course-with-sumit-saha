import React from 'react';
import { Navigate } from 'react-router';
import { useAuthAdmin } from '../../hooks/useAuthAdmin';
import { useAuthStudent } from '../../hooks/useAuthStudent';

function PrivateRouteStudent({children}) {
    const auth = useAuthStudent();
    
    return auth ? children : <Navigate to="/"></Navigate>
}

export default PrivateRouteStudent;