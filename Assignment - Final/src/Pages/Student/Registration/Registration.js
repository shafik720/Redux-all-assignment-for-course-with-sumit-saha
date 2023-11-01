import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import learningLogo from '../../../assets/image/learningportal.svg';
import { useRegisterMutation } from '../../../features/auth/authApi';

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const[register, { data, isLoading, isError, isSuccess, error }] = useRegisterMutation();
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name, email, password, rePassword);
        if(password !== rePassword){
            toast.error('Password is not matched', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }else{
            register({
                email,
                password,
                role : 'student',
                name,
            })
        }
        // setEmail('');
        // setPassword('');
        // setName('');
        // setRePassword('');
    }

    // --- making ui interactive while logging in and taking user to dashboard if successfully logged in
    const navigate = useNavigate();
    let content = null;
    let status = "Create Account";
    const errorMsg = () => toast.error(error.error || error.data, {
        position: "bottom-center",
        autoClose: 3000,
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
        if (!isLoading && !isError && data?.accessToken && data?.user) {
            toast.success('Account Created Successfully !', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/coursePlayer');
            console.log(data);  
        }
    }, [isSuccess, isLoading, data])
    return (
        <section className="py-6 bg-primary h-screen grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div>
                    <img className="h-12 mx-auto" src={learningLogo} />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Create Your New Account
                </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input id="name" name="name" type="name" autoComplete="name" required
                                className="login-input rounded-t-md" placeholder="Student Name" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required
                                className="login-input " placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}  />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required
                                className="login-input" placeholder="Password"  value={password} onChange={e => setPassword(e.target.value)}  />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <input id="confirm-password" name="confirm-password" type="password"
                                autoComplete="confirm-password" required className="login-input rounded-b-md"
                                placeholder="Confirm Password" value={rePassword} onChange={e => setRePassword(e.target.value)}  />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                            {status}
                    </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Registration;