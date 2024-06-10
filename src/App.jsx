import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import './App.css'
import { Header, Footer } from './components';
import authService from './appwrite/auth';
import { login, logout } from './features/authSlice';
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentSession()
    .then( (userData) => {
      if(userData) {
        dispatch(login({userData}));
      }
      else{
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false));
  }, []);

  return !loading? (
    <div className='min-h-screen bg-gray-700 flex flex-wrap'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null

  // if(loading){
  //   return <div>Loading....</div>
  // }
}

export default App
