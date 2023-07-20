import React, { useState } from 'react'
import {Link} from "react-router-dom"
import ToggleTheme from "./ToggleTheme";
import { useContext } from 'react';
import { ThemeContext } from '../contexts/Theme';
const Navbar = () => {
  const { theme } = useContext(ThemeContext)
  const [topics, setTopics] = useState(["coding", "cooking", "football"])
  return (
    <div className={`${theme === "dark" ? "bg-red-600 shadow-white" : "shadow-black bg-red-600"} shadow-md top-0 fixed z-50 w-full flex justify-between items-center text-white font-black p-5 h-14 md:h-20 md:px-40`}>
        <div>
          <Link className='text-2xl md:text-3xl ease-in-out duration-300 hover:text-gray-300' to={"/"}>NC NEWS</Link>
        </div>
        <div className='flex justify-center items-center gap-2 md:gap-4 '>
        {topics.map((topic) => {
          return <div key={topic} >
            <Link className='capitalize p-2 ease-in-out duration-300 hover:text-gray-300 md:text-xl' to={`/topic/${topic}`} >{topic}</Link>
          </div>
        })}
      <ul className='p-2 cursor-pointer md:text-xl'><ToggleTheme/></ul>
        </div>
    </div>
  )
}

export default Navbar