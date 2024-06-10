import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayoutProtected } from './components/index.js'
import { LogIn, SignUp, Home, AllPosts, Post, EditPost, AddPost } from './pages/pages.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayoutProtected authentication={false}>
                    <LogIn />
                </AuthLayoutProtected>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayoutProtected authentication={false}>
                    <SignUp />
                </AuthLayoutProtected>
            ),
        },
        {
            path: "/posts",
            element: (
                <AuthLayoutProtected authentication>
                    {" "}
                    <AllPosts />
                </AuthLayoutProtected>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayoutProtected authentication>
                    {" "}
                    <AddPost />
                </AuthLayoutProtected>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayoutProtected authentication>
                    {" "}
                    <EditPost />
                </AuthLayoutProtected>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
            path: "/posts/post/:slug",
            element: <Post />,
        },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>
)
