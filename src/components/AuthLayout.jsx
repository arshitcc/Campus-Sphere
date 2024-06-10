import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


/* This component is basically a meachanism through which provides a protected container*/
function AuthLayoutProtected({children, authentication = true}) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);
    
    useEffect(()=>{
        
        // if (authStatus === true){
        //     navigate('/');
        // }
        // else if(authStatus === false){
        //     navigate('/login')
        // }
        // let authValue = authStatus === true ? true : false;

        // TODO : Make it more easy

        if(authentication && authStatus !== authentication){ // userAuth && userAuth is not matching
            navigate('/login')
        }
        else if(!authentication && authStatus !== authentication){
            navigate('/');
        }
        setLoader(false);
    },[authStatus, navigate, authentication])

    return (
        loader ? <h1>Loading...</h1> : <>{children}</>
    )
}

export default AuthLayoutProtected
