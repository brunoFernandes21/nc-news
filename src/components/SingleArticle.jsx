import { useState, useEffect } from "react";
import { fetchSingleArticle } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import CommentList from "./CommentList";
const SingleArticle = () => {

  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("");
  const { article_id } = useParams();
  const article_date = dayjs(article.created_at).format("DD/MM/YYYY HH:mma");

  useEffect(() => {
    document.title = "Single Article";
    setLoading(true);
    const getSingleArticle = async () => {
      const data = await fetchSingleArticle(article_id);
      setArticle(data);
      setPageTitle(data.title);
      setLoading(false);
    };
    getSingleArticle();
  }, []);

  return (
    <div className="mt-10">
      {loading && (
        <h2 className="text-center text-red-600 font-black mt-20 text-2xl md:text-4xl">
          Loading Article...
        </h2>
      )}
      {!loading && (
        <div className="mt-14 md:mt-20">
          <div className="w-11/12 m-auto text-center ">
            <p>
              <strong>Published </strong> {article_date}
            </p>
          </div>
          <header className="w-11/12 m-auto text-center text-red-600 font-black text-xl md:text-4xl">
            <h1>{pageTitle}</h1>
          </header>
          <div className="w-11/12 m-auto text-center ">
            <p>
              By <strong>{article.author}</strong>
            </p>
          </div>
          <main className="w-11/12 mt-5 m-auto md:w-11/12 lg:w-3/5 ">
            <section className="grid bg-red-500 shadow-md hover:shadow-black ease-in duration-300 text-white rounded-t-lg md:rounded-none md:grid-cols-2">
              <img
                className="rounded-t-lg md:rounded-none "
                src={article.article_img_url}
                alt="Image related to the article"
              />
              <div className="p-4">
                <div>
                  <p>{article.body}</p>
                </div>
                <div className="pt-3">
                <p><strong>Topic:</strong> {article.topic}</p>
                <p><strong>Votes:</strong> {article.votes}</p>
                <p><strong>Comments:</strong> {article.comment_count}</p>
                </div>
              </div>
            </section>
            <div className="mt-4">
              <Link className="text-red-600 font-bold" to={"/"}><p>Back to home</p></Link>
              </div>
              <section>
                <CommentList article_id={article_id}/>
              </section>
          </main>
        </div>
      )}
    </div>
  );
};

export default SingleArticle;
