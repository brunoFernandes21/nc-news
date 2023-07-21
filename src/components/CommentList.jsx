import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { useState, useEffect } from "react";
import { deleteComment, fetchCommentsByArticleId } from "../utils/api";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

const CommentList = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const [apiError, setApiError] = useState(null)
  const [success, setSuccess] = useState(false)

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

  const deleteUserComment = async (comment_id) => {
    const filteredComments = comments.filter((comment) => {
      return comment.comment_id !== comment_id;
    });
    setComments(filteredComments);
    try {
      setError(false)
      setSuccess(true) 
      await deleteComment(comment_id)
      setTimeout(() => {
        setSuccess(false)
      }, 1000);
    } catch (error) {
      setError(true)
      setSuccess(false)
      const unfilteredComments = comments.filter((comment) => {
        return comment
      });
      setComments(unfilteredComments);
      setTimeout(() => {
        setError(false)
      }, 1000);
    } 
  };

  return (
    <main>
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
        <section className="bg-blue">
          <section
            className={`${
              theme === "dark"
                ? "text-white border border:white"
                : "border border-black  text-black "
            } m-auto text-center mt-10 p-2 md:p-4 font-black text-xl md:text-4xl`}
          >
            <h2>Comments</h2>
          </section>
          {error && <p className={`text-center mt-4 p-2 border font-bold ${theme === "dark" ? "text-white " : "border-red-500 text-red-500 "}`}>Unable to delete comment. Please try again later!</p>}
          {success && <p className={`text-center mt-4 p-2 border font-bold ${theme === "dark" ? "text-white " : "border-green-900 text-green-600"}`}>Comment deleted successfully!</p>}
          {comments.length === 0 ? (
            <h3
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } m-auto text-center mt-10 text-xl md:text-4xl`}
            >
              No comments yet!
            </h3>
          ) : (
            <section className="grid mb-10 gap-4 m-auto mt-5 md:grid-cols-2">
              {comments.map(({ author, votes, body, comment_id }) => {
                return (
                  <CommentCard
                    key={comment_id}
                    author={author}
                    votes={votes}
                    body={body}
                    comment_id={comment_id}
                    deleteComment={deleteUserComment}
                  />
                );
              })}
             
            </section>
          )}
        </section>
      )}
    </main>
  );
};

export default CommentList;
