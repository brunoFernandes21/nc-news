import { useState, useEffect } from "react";
import { fetchSingleArticle } from "../utils/api";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
const SingleArticle = () => {
  //TODO:
  //DISPLAY ARTICLES DATA IN A ENGAGING WAY
  //USE ANOTHER USEEFFECT TO FETCH ARTICLES OF SAME TOPIC AND DISPLAY ARE CARDS OR CAROUSELL
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("");
  const { article_id } = useParams();
  const article_date = dayjs(article.created_at).format("DD/MM/YYYY HH:mm A");

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
    // const { title, author, body} = article
    <div>
      {loading && (
        <h2 className="text-center text-red-600 font-black mt-28 text-2xl md:text-4xl">
          Loading Article...
        </h2>
      )}
      {!loading && (
        <div>
          <div className="w-11/12 m-auto mt-28 text-center ">
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
            <section className="grid bg-red-500 shadow-lg shadow-red-500/50 text-white rounded-t-lg md:rounded-none md:grid-cols-2">
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
              <section className=" border border-red-600 m-auto text-center mt-10 text-red-600 font-black text-xl md:text-4xl">
                <h2>Related articles here</h2>
              </section>

          </main>
        </div>
      )}
    </div>
  );
};

export default SingleArticle;
