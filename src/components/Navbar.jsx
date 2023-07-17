import React from 'react'
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <div className='bg-red-600 shadow-md shadow-black top-0 fixed z-50 w-full h-20 flex justify-between items-center text-white font-black p-10'>
        <div>
          <Link className='text-2xl md:text-3xl' to={"/"}>NC NEWS</Link>
        </div>
        <div className='flex gap-4 md:text-xl '>
          <Link className='p-2 ease-in-out duration-300 hover:uppercase hover:text-gray-300' to={"/"} >Coding</Link>
          <Link className='p-2 ease-in-out duration-300 hover:uppercase hover:text-gray-300' to={"/"} >Football</Link>
          <Link className='p-2 ease-in-out duration-300 hover:uppercase hover:text-gray-300' to={"/"} >Cooking</Link>
        </div>
    </div>
  )
}

export default Navbar