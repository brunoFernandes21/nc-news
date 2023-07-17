import React, { useState, useEffect } from 'react'
import ArticleCard from './ArticleCard'
import fetchAllArticles from "../utils/api"
const ArticleList = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const getAllArticles = async () => {
      const articles = await fetchAllArticles()
      setArticles(articles)
    }
    getAllArticles()
  }, [])
  
  return (
    <div className='grid gap-4 w-4/5 m-auto mt-5 p-4 max-sm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {articles.map(({title, author, topic, votes, article_id, article_img_url}) => {
        return <ArticleCard key={article_id} title={title} author={author} topic={topic} votes={votes} article_img_url={article_img_url}/>
      })}
      
    </div>
  )
}

export default ArticleList