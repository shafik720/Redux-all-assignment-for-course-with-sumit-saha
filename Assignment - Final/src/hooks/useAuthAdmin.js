import { useSelector } from "react-redux";



export function useAuthAdmin (){
    const isAuth = useSelector(state => state.auth);
    if(isAuth.accessToken && isAuth.user.role=='admin'){
        return true;
    }else{
        return false;
    }
}