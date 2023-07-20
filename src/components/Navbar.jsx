import React from 'react'
import {Link} from "react-router-dom"
import ToggleTheme from "./ToggleTheme";
import { useContext } from 'react';
import { ThemeContext } from '../contexts/Theme';
import { UserContext } from '../contexts/User';
const Navbar = () => {
  const { theme } = useContext(ThemeContext)
  const { user } = useContext(UserContext)
  return (
    <div className={`${theme === "dark" ? "bg-red-600 shadow-white" : "shadow-black bg-red-600"} shadow-md top-0 fixed z-50 w-full flex justify-between items-center flex-wrap text-white font-black p-2 px-4 md:p-6 md:px-20 `}>
        <div>
          <Link className='text-2xl md:text-3xl ease-in-out duration-300 hover:text-gray-300' to={"/"}>NC NEWS</Link>
        </div>
        <div className='flex md:text-xl md:gap-4 justify-center items-center md:m-auto'>
          <Link className='p-2 ease-in-out duration-300 hover:text-gray-300' to={"/"} >Coding</Link>
          <Link className='p-2 ease-in-out duration-300 hover:text-gray-300' to={"/"} >Football</Link>
          <Link className='p-2 ease-in-out duration-300 hover:text-gray-300' to={"/"} >Cooking</Link>
          <ul className='p-2 cursor-pointer'><ToggleTheme/></ul>
        </div>
        <div className='text-center bg-white text-red-600 p-2 rounded'>
          <p>Logged in as {user}</p>
          </div>
    </div>
  )
}

export default Navbar