import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";


export const useAuthCheck = () => {
    const [authcheck, setAuthcheck] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const localAuth = localStorage?.getItem('auth');
        if (localAuth) {
            const auth = JSON.parse(localAuth);
            if (auth?.accessToken && auth?.user) {
                dispatch(userLoggedIn({
                    accessToken: auth.accessToken,
                    user: auth.user,
                }));
                
            }
        }
        setAuthcheck(true);
    }, [dispatch, setAuthcheck])
    return authcheck;
}