import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/ui/shared/Navbar'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from "./components/Jobs"
import Browse from './components/Browse'


const appRouter = createBrowserRouter([
 
  {
  path : '/',
  element : <Home />
},
  {
  path : '/login',
  element : <Login />
},
  {
  path : '/signup',
  element : <Signup />
},
   {
  path : '/jobs',
  element : <Jobs />
},
 
 {
  path : '/browse',
  element : <Browse />
},
 


])

function App() {


  return (
    <div>

<RouterProvider   router={appRouter}       />



    </div>
  )
}

export default App
