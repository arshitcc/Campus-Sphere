import React from 'react'
import { logout } from '../../features/authSlice'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Logout() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.userLogOut().then((response) => {
        if(response){
          dispatch(logout())
        }
        navigate('/')
    }) 
  }

  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default Logout