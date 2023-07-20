import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
import ArticleCard from "./ArticleCard";
import { fetchAllArticles } from "../utils/api";

const TopicPage = () => {
  const { topic } = useParams();
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (topic === "coding") {
      document.title = "Coding";
    } else if (topic === "cooking") {
      document.title = "Cooking";
    } else {
      document.title = "Football";
    }
    setLoading(true);
    setError(false);
    const getAllArticles = async () => {
      try {
        setError(false);
        // const articles = await fetchAllArticles(topic);
        setArticles(articles);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getAllArticles();
  }, [topic]);

  const filterArticlesByTopic = articles.filter((article) => {
    return article.topic === topic;
  });
  return (
    <div className={`text-red-500 m-auto mt-20 md:mt-32 ${theme}`}>
      <div
        className={`font-bold text-center md:mb-10 text-lg md:text-4xl ${
          theme === "dark" ? "text-white" : ""
        }`}
      >
        <h1>
          Articles about{" "}
          <span
            className={`${
              theme === "dark"
                ? "bg-white text-red-600 p-2 rounded"
                : "bg-red-600 text-white p-2 rounded"
            } capitalize`}
          >
            {topic}
          </span>{" "}
        </h1>
      </div>
      {loading && (
        <h2
          className={`${
            theme === "dark" ? "text-white" : "text-red-600"
          } text-center font-black mt-10 text-2xl md:text-4xl`}
        >
          Loading Articles...
        </h2>
      )}
      <div>
        {error && (
          <p
            className={` ${
              theme === "dark"
                ? "text-red-600 text-center rounded bg-white"
                : "text-center rounded text-white bg-red-500 border-4 border-red-700"
            } font-bold mx-4 mt-10 p-6 md:p-10 md:text-xl`}
          >
            Oops, something has gone wrong. 
            {/* <br /> */}
            Please try again!
          </p>
        )}
      </div>
      {!loading && (
        <main className="grid gap-4 w-11/12 m-auto mt-5 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {filterArticlesByTopic.map(
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

export default TopicPage;
