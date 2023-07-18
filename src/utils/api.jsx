import axios from "axios";

const articlesApi = axios.create({
  baseURL: "https://brunofernandes-northcoders-news.onrender.com/api"
})

export const fetchAllArticles = async () => {
  const response = await articlesApi.get("/articles")
  const articles = response.data.articles
  return articles
}

export const fetchSingleArticle = async (article_id) => {
  const response = await articlesApi.get(`/articles/${article_id}`)
  const article = response.data.article
  return article
}

export const fetchCommentsByArticleId = async (article_id) => {
  const response = await articlesApi.get(`/articles/${article_id}/comments`)
  const comments = response.data.comments
  return comments
}