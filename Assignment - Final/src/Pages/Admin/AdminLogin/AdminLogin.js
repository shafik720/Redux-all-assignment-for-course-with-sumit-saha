import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ClipLoader from 'react-spinners/ClipLoader';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import learningLogo from '../../../assets/image/learningportal.svg';
import Error from '../../../Components/Error';
import { useLoginMutation } from '../../../features/auth/authApi';
import { userLoggedOut } from '../../../features/auth/authSlice';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isUser, setIsUser] = useState(false);
    const [dummy, setDummy] = useState(false);

    const [login, { data, isLoading, isError, error, isSuccess }] = useLoginMutation();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
        setEmail('');
        setPassword('')
    }
    // --- to clear out user login credential
    useEffect(() => {
        if (isUser) {
            dispatch(userLoggedOut());
            localStorage.clear();
            localStorage.removeItem('auth');
            setIsUser(false);
        }
    }, [isUser])

    // --- making ui interactive while logging in and taking user to dashboard if successfully logged in
    const navigate = useNavigate();
    let content = null;
    let status = "Sign In";
    const authState = useSelector(state => state.auth);
    const errorMsg = () => toast.error(error.error || error.data, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    if (isLoading && !isError) {
        status = <HashLoader color="white" size={20} />;
    }
    

    useEffect(() => {
        
        if (!isLoading && isError) {
            console.log(error);
            errorMsg();
        }
        if (!isLoading && !isError && data?.accessToken && data?.user.role === 'student') {
            setIsUser(true);
            toast.error("Can not login in as User from here", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
            localStorage.clear();
            localStorage.removeItem('auth');
        }else if (!isLoading && !isError && data?.accessToken && data?.user.role === 'admin') {
            toast.success('Logged In Successfully !', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/admin/dashboard');
            console.log(data);            
            setIsUser(false);
        }
    }, [isSuccess, isLoading, data])

    return (
        <section className="py-6 bg-primary h-screen grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div>
                    <img className="h-12 mx-auto" src={learningLogo} />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Sign in to Admin Account
                </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required
                                className="login-input rounded-t-md" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required
                                className="login-input rounded-b-md" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-violet-600 hover:text-violet-500">
                                Forgot your password?
                        </a>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                            {status}
                    </button>
                    </div>
                
                {content}
                </form>
            </div>
        </section>
    );
};

export default AdminLogin;