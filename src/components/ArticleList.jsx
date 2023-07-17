import React, { useState } from 'react'
import ArticleCard from './ArticleCard'

const ArticleList = () => {
    const [articles, setArticles] = useState([
    ])
  return (
    <div className='border border-black w-4/5 m-auto p-4'>
        <ArticleCard/>
        <ArticleCard/>
        <ArticleCard/>
        <ArticleCard/>
        <ArticleCard/>
    </div>
  )
}

export default ArticleList