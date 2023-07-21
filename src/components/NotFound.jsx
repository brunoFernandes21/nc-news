import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { ThemeContext } from '../contexts/Theme';
const NotFound = () => {
    const { theme } = useContext(ThemeContext)

  return (
    <div className={`p-10 mt-60 font-bold block text-center m-auto ${theme === "dark" ? "text-white" : "text-red-500"}`}>
        <h1 className='text-8xl'>404</h1>
        <h2 className='text-4xl'>Not Found: Page does not exist</h2>
        <p className='text-xl'>Go to the <Link className='underline' to={'/'}>Homepage</Link>.</p>
    </div>
  )
}

export default NotFound