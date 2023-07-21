import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { fetchAllArticles } from "../utils/api";
import { useContext } from 'react';
import { ThemeContext } from '../contexts/Theme';
import { useParams, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NotFound from "./NotFound";

const ArticleList = () => {
  const { theme } = useContext(ThemeContext)
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const { search } = useLocation()
  const topic = new URLSearchParams(search).get("topic")

  useEffect(() => {
  if (topic === "coding") {
      document.title = "Coding";
    } else if (topic === "cooking") {
      document.title = "Cooking";
    } else if(topic === "football") {
      document.title = "Football";
    } else if(topic === null) {
      document.title = "Home"
    }
    setLoading(true);
    setApiError(false);
    const getAllArticles = async () => {
      try {
        const articles = await fetchAllArticles(topic);
        setApiError(false);
        setArticles(articles);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setApiError(error);
      }
    };
    getAllArticles();
  }, [topic]);

  return (
    <div className={`${theme} pb-10 mb-0`}>
      {!apiError && <div className={`mt-28 md:mb-14 md:mt-32 text-center font-black text-xl md:text-2xl lg:text-4xl ${theme === "dark" ? "text-white" : "text-red-600"}`}>
        <h1>Welcome to Northcoders-News</h1>
      </div>}
      <div>
        {apiError && (
          <NotFound/>
        )}
      </div>
      {loading && (
        <h2 className={`${theme === "dark" ? "text-white" : "text-red-600"} text-center font-black mt-10 text-2xl md:text-4xl`}>
          Loading Articles...
        </h2>
      )}
      
      {!loading && (
        <main className="grid gap-4 w-11/12 m-auto mt-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map(
            ({ title, author, topic, votes, article_id, article_img_url }) => {
              return (
                <ArticleCard
                  article_id={article_id}
                  key={article_id}
                  title={title}
                  author={author}
                  topic={topic}
                  votes={votes}
                  article_img_url={article_img_url}
                />
              );
            }
          )}
        </main>
      )}
    </div>
  );
};

export default ArticleList;
