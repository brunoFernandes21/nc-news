import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { fetchAllArticles } from "../utils/api";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = "Home";
    setLoading(true);
    const getAllArticles = async () => {
      const articles = await fetchAllArticles();
      setArticles(articles);
      setLoading(false);
    };
    getAllArticles();
  }, []);

  return (
    <div>
      <div className="mt-28 text-center text-red-600 font-black mt-10 text-2xl md:text-4xl">
        <h1>Welcome to Northcoders-News</h1>
      </div>
      {loading && (
        <h2 className="text-center text-red-600 font-black mt-10 text-2xl md:text-4xl">
          Loading Articles...
        </h2>
      )}
      {!loading && (
        <main className="grid gap-4 w-11/12 m-auto mt-5 p-4 md:grid-cols-2 lg:grid-cols-3">
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
