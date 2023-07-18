import axios from "axios";

const articlesApi = axios.create({
  baseURL: "https://brunofernandes-northcoders-news.onrender.com/api"
})

export const fetchAllArticles = async () => {
  const response = await articlesApi.get("/articles")
  const responseData = response
  const articles = responseData.data.articles
  return articles
}

export const fetchSingleArticle = async (article_id) => {
  const response = await articlesApi.get(`/articles/${article_id}`)
  const responseData = response
  const article = responseData.data.article
  return article
}