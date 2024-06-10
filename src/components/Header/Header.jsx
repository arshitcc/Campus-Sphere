import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Logo, Logout, Container } from '../index'

function Header() {

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name : "HOME",
      slug : '/',
      active : true
    },
    {
      name : "Login",
      slug : '/login',
      active : !authStatus
    },
    {
      name : "SignUp",
      slug : '/signup',
      active : !authStatus
    },
    {
      name : "All Posts",
      slug : '/posts',
      active : authStatus,
    },
    {
      name : "Add-Post",
      slug : '/add-post',
      active : authStatus
    }
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex flex-wrap justify-between items-center'>
          <div>
            <Link to="/">
              <Logo width="70px"/>
            </Link>
          </div>
          <ul className='flex flex-wrap items-center justify-center'>
            {
              navItems.map((navItem) =>
                navItem.active ? (
                  <li key={navItem.name}>
                    <button
                    onClick={() => navigate(navItem.slug)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-200 rounded-full'
                    >{navItem.name}</button>
                  </li>
                ) : null
              )
            }

            { // If authenticated/LogedIn then show Logout Button
              authStatus && (
                <li>
                  <Logout/>
                </li>
              )
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header