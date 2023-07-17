import axios from "axios";

const fetchAllArticles = async () => {
  const response = await axios.get("https://brunofernandes-northcoders-news.onrender.com/api/articles")
  const responseData = response
  const articles = responseData.data.articles
  return articles
}

export default fetchAllArticles