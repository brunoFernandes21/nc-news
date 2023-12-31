import axios from "axios";

const articlesApi = axios.create({
  baseURL: "https://brunofernandes-northcoders-news.onrender.com/api"
})

export const fetchAllArticles = async (topic) => {
  const response = await articlesApi.get("/articles", {params: {topic: topic}})
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

export const incrementVote = async (article_id) => {
  const patchRequestBody = {
    inc_votes: 1
  }
  const response = await articlesApi.patch(`/articles/${article_id}`, patchRequestBody)
  const data = response.data.article.votes
  return data
}

export const decrementVote = async (article_id) => {
  const patchRequestBody = {
    inc_votes: -1
  }
  const response = await articlesApi.patch(`/articles/${article_id}`, patchRequestBody)
  const data = response.data.article.votes
  return data
}

export const postComment = async (newComment, article_id) => {
  const response = await articlesApi.post(`/articles/${article_id}/comments`, newComment)
  const data = response.data.comment
  return data
}

export const deleteComment = async (comment_id) => {
  await articlesApi.delete(`/comments/${comment_id}`)
}