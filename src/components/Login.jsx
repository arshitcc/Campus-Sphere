import React, { useState } from 'react'
import { Input, Logo, Button } from './index'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth' 
import { login as authLogin } from '../features/authSlice'
import { useForm } from 'react-hook-form'

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");

    // This login is a different from login-of-authSlice that's why used authLogin for authSlice,
    const logIN = async (data) => {
        setError("");

        try {
            const session = await authService.userLogin(data);
            if(session){
                const userData = await authService.getCurrentSession();
                if(userData) dispatch(authLogin(userData));
                navigate('/'); 
                // navigate is used for forcefully-programatically navigate, but Link is an onClick Navigation so used navigate
            }
        } catch (error) {
            setError(error.message);
        }
    }

return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>

            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>

            {error && (
                <p className="text-red-600 mt-8 text-center">{error}</p>
            )}

            <form onSubmit={handleSubmit(logIN)}>
                <div className='space-y-5'>

                    <Input
                    type="email"
                    label="Email : "
                    placeholder="Enter Your Email"
                    {...register("userEmail",{ 

                        // ...registered is used as it may contain previous data, it takes ("name", Object)

                        required : true,
                        validate : {
                            matchPattern : (value) => (
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                                ||
                                "Email address must be a valid address"
                            )
                        }
                    })}
                    />

                    <Input
                    type="password"
                    label="Password : "
                    placeholder="Enter Your Password"
                    {...register("userPassword",{
                        required : true,
                    })}
                    />

                    <Button
                    type="submit"
                    className="w-full text-white font-semibold"
                    >Sign In</Button>  
                    {/* // 'Sign In' is the children that is going to be passed in component */}

                </div>

            </form>
        </div>
    </div>
)
}

export default Login