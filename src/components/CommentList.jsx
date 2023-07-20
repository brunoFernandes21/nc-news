import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { useState, useEffect } from "react";
import { fetchCommentsByArticleId } from "../utils/api";
import { useContext } from 'react';
import { ThemeContext } from '../contexts/Theme';
import { UserContext } from '../contexts/User';
const CommentList = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    setLoading(true);
    const getComments = async () => {
      const data = await fetchCommentsByArticleId(article_id);
      setLoading(false);
      setComments(data);
    };
    getComments();
  }, []);

  const deleteUserComment = async(author) => {
    console.log(author, "author")
  }
  console.log(user, "user")
  return (
    <div>
      {loading && (
        <h2 className={`${theme === "dark" ? "text-white" : "text-red-600"} text-center  font-black mt-10 text-2xl md:text-4xl`}>
          Loading Comments...
        </h2>
      )}
      {!loading && (
        <main className="bg-blue" >
          <section className={`${theme === "dark" ? "text-white border border:white" : "border border-black  text-black "} m-auto text-center mt-10 p-2 md:p-4 font-black text-xl md:text-4xl`}>
            <h2>Comments</h2>
          </section>
          {comments.length === 0 ? (
            <h3 className={`${theme === "dark" ? "text-white" : "text-black"} m-auto text-center mt-10 text-xl md:text-4xl`}>
              No comments yet!
            </h3>
          ) : (
            <section className="grid mb-10 gap-4 m-auto mt-10 md:grid-cols-2">
              {comments.map(({ author, votes, body, comment_id}) => {
                return (
                  <CommentCard
                    key={comment_id}
                    author={author}
                    votes={votes}
                    body={body}
                    deleteComment={deleteUserComment}
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
