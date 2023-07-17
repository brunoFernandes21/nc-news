import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ArticleList from './components/ArticleList'
import { Route, Routes } from 'react-router'
import TopicPage from './components/TopicPage'

function App() {

  return (
    <div className='app h-screen'>
      <Navbar/>
      <div className='text-center text-red-600 font-black mt-10 text-2xl md:text-4xl'>
        <h1>Welcome to NC-news</h1>
      </div>

      <Routes>
        <Route path='/' element={<ArticleList/>}/>
        <Route path='/topic' element={<TopicPage/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
