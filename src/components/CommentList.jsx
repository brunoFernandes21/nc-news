import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { useState, useEffect } from "react";
import { fetchCommentsByArticleId } from "../utils/api";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
const CommentList = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    setLoading(true);
    setApiError(null)
    const getComments = async () => {
      try {
        const data = await fetchCommentsByArticleId(article_id);
        setLoading(false);
        setComments(data);
      } catch (error) {
        setApiError(error)
        setLoading(false)
      }
    };
    getComments();
  }, []);

  return (
    <div>
      {loading && (
        <h2
          className={`${
            theme === "dark" ? "text-white" : "text-red-600"
          } text-center  font-black mt-10 text-2xl md:text-4xl`}
        >
          Loading Comments...
        </h2>
      )}
      {apiError && (
        <p
        className={` ${
          theme === "dark"
            ? "text-red-600 text-center rounded bg-white"
            : "text-center rounded text-white bg-red-500 border-4 border-red-700"
        } font-bold mx-4 mt-10 p-6 md:p-10 md:m-auto md:text-xl md:w-5/12`}
      >
        {apiError.response.status} 
        <br />
        {apiError.response.data.msg}
      </p>
      )}
      {!loading && (
        <main className="bg-blue">
          <section
            className={`${
              theme === "dark"
                ? "text-white border border:white"
                : "border border-black  text-black "
            } m-auto text-center mt-10 p-2 md:p-4 font-black text-xl md:text-4xl`}
          >
            <h2>Comments</h2>
          </section>
          {comments.length === 0 ? (
            <h3
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } m-auto text-center mt-10 text-xl md:text-4xl`}
            >
              No comments yet!
            </h3>
          ) : (
            <section className="grid mb-10 gap-4 m-auto mt-10 md:grid-cols-2">
              {comments.map(({ author, votes, body }) => {
                return (
                  <CommentCard
                    key={body}
                    author={author}
                    votes={votes}
                    body={body}
                  />
                );
              })}
            </section>
          )}
        </main>
      )}
    </div>
  );
};

export default CommentList;
