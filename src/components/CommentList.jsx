import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { useState, useEffect } from "react";
import { fetchCommentsByArticleId } from "../utils/api";

const CommentList = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getComments = async () => {
      const data = await fetchCommentsByArticleId(article_id);
      setLoading(false);
      setComments(data);
    };
    getComments();
  }, []);
  return (
    <div>
      {loading && (
        <h2 className="text-center text-red-600 font-black mt-10 text-2xl md:text-4xl">
          Loading Comments...
        </h2>
      )}
      {!loading && (
        <main>
          <section className=" border border-red-600 m-auto text-center mt-10 text-red-600 font-black text-xl md:text-4xl">
            <h2>Comments</h2>
          </section>
          {comments.length === 0 ? (
            <h3 className="m-auto text-center mt-10 text-red-600 text-xl md:text-4xl">
              No comments yet!
            </h3>
          ) : (
            <section className="grid gap-4 m-auto mt-10 md:grid-cols-2">
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
