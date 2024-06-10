import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import {Input, Button, Logo} from './index'
import authService from '../appwrite/auth';
import { login as authLogin } from '../features/authSlice'; // just for fun prettiness I changed name
import { useForm } from 'react-hook-form';


function Signup() {
 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();

    const signUP = async (data) => {
        setError("");

        try {
            console.log("true 1");
            console.log(data);
            const userData = await authService.createAccount(data);
            console.log("true 2");
            if(userData){
                console.log("true 3");
                const user = await authService.getCurrentSession(userData);
                console.log("true 4");
                if(user) dispatch(authLogin(data)); // Make the User Login after signup
                console.log("true 5");
                navigate('/');
            }
        } 
        catch (error) {
            // console.log(error);
            setError(error.message);
        }
    }

  return (
    <div className='className="flex items-center justify-center"'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>

            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>

            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>

            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form 
            onSubmit={handleSubmit(signUP)}
            className='mt-8'>
                <div className='space-y-5'>

                    <Input
                    type="text"
                    label="Full Name"
                    placeholder="Enter Your Full Name"
                    {...register('userName',{
                        required : true,
                    })}
                    />

                    <Input
                    type="email"
                    label="Email : "
                    placeholder="Enter your Email"
                    {...register("userEmail",{
                        required : true,
                        validate : {
                            matchPattern : (value) => {
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                                ||
                                "Email address must be a valid address"
                            }
                        }
                    })}
                    />

                    <Input
                    type="password"
                    label="Password : "
                    placeholder="Enter your Password"
                    {...register("userPassword",{
                        required : true,
                        // validate : {
                        //     minLength : 8,
                        //     matchPattern : (value) => {
                        //         /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])/.test(value)
                        //         ||
                        //         "Create a STRONG Password"
                        //     }
                        // }
                    })}
                    />

                    <Button
                    type="submit"
                    className="w-full text-white font-semibold"
                    >Sign Up  / Create Account</Button>

                </div>
            </form>

        </div>
    </div>
  )
}

export default Signup