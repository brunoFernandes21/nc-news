import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ArticleList from './components/ArticleList'

function App() {

  return (
    <div className='app'>
      <Navbar/>
      <div className='text-center text-red-600 font-black'>
        <h1>Welcome to NC-news</h1>
      </div>
      <ArticleList/>
      <Footer/>
    </div>
  )
}

export default App
