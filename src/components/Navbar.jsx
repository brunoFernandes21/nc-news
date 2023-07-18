import React from 'react'
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <div className='bg-red-600 shadow-md shadow-black top-0 fixed z-50 w-full flex justify-between items-center text-white font-black p-5 h-14 md:h-20'>
        <div>
          <Link className='text-2xl md:text-3xl' to={"/"}>NC NEWS</Link>
        </div>
        <div className='flex md:text-xl md:gap-4'>
          <Link className='p-2 ease-in-out duration-300 hover:uppercase hover:text-gray-300' to={"/"} >Coding</Link>
          <Link className='p-2 ease-in-out duration-300 hover:uppercase hover:text-gray-300' to={"/"} >Football</Link>
          <Link className='p-2 ease-in-out duration-300 hover:uppercase hover:text-gray-300' to={"/"} >Cooking</Link>
        </div>
    </div>
  )
}

export default Navbar