import { useSelector } from "react-redux";



export function useAuthStudent (){
    const isAuth = useSelector(state => state.auth);
    if(isAuth?.accessToken && isAuth?.user?.role==='student'){
        return true;
    }else{
        return false;
    }
}