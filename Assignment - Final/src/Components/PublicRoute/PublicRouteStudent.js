import React from 'react';
import { Navigate } from 'react-router';
import { useAuthStudent } from '../../hooks/useAuthStudent';

function PublicRouteStudent({children}) {
    const auth = useAuthStudent();
    return !auth ? children : <Navigate to="/coursePlayer"></Navigate>
}

export default PublicRouteStudent;