import { useState, useEffect } from "react";
import {
  fetchSingleArticle,
  incrementVote,
  decrementVote,
  postComment,
  deleteComment
} from "../utils/api";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import CommentList from "./CommentList";
import { FaComments } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
import { UserContext } from '../contexts/User';
import { FaTrashAlt } from "react-icons/fa"

const SingleArticle = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext)
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState({});
  const [newComment_id, setNewComment_id] = useState(null)
  const [showNewComment, setShowNewComment] = useState(false);
  const [error, setError] = useState(false);
  const [postError, setPostError] = useState(false);
  const [deleteError, setDeleteError] = useState(false)
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const { article_id } = useParams();

  const article_date = dayjs(article.created_at).format("DD/MM/YYYY HH:mma");
  const [formData, setFormData] = useState({
    username: user,
    body: "",
  });

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

  const handleChange = (event) => {
    setFormData((currentFormData) => {
      const { name, value } = event.target;
      return {
        ...currentFormData,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowNewComment(true);
    setNewComment(formData);
    setPostError(false);
    setLoading(false);
    try {
      const data = await postComment(formData, article_id);
      setNewComment_id(data.comment_id)
      setFormData({
        username: user,
        body: "",
      });
    } catch (error) {
      setLoading(false);
      setPostError(true);
    }
  };
  const handleLikeDislike = async (param) => {
    if (param === "like") {
      setLike((currentLikeCount) => {
        return currentLikeCount + 1;
      });
      try {
        setError(false);
        await incrementVote(article_id);
      } catch (error) {
        setLike((currentlikeCount) => {
          return currentlikeCount - 1;
        });
        setError(true);
        console.log(error);
      }
    } else {
      setDislike((currentDislikeCount) => {
        return currentDislikeCount + 1;
      });
      setLike((currentlikeCount) => {
        return currentlikeCount - 1;
      });
      try {
        setError(false);
        await decrementVote(article_id);
      } catch (error) {
        setDislike((currentDeslikeCount) => {
          return currentDeslikeCount - 1;
        });
        setLike((currentlikeCount) => {
          return currentlikeCount + 1;
        });
        setError(true);
      }
    }
  };
  const toggleShowComments = () => {
    setShowComments(!showComments);
    setShowNewComment(false);
  };
  const handleDelete = async() => {
    setShowNewComment(false)
    setDeleteError(false)
    setLoading(false)
    try {
      await deleteComment(newComment_id)
    } catch (error) {
      setLoading(false)
      setDeleteError(true)
      setShowNewComment(true)
    } 
  }
  return (
    <main className={`mt-14 ${theme}`}>
      <section
        className={`mt-14 md:mt-20 border-2 ml-5 md:ml-10  rounded p-2 w-36 ease-in duration-100 hover:text-red-500 hover:border-red-500 ${
          theme === "dark" ? "border-white" : "border-black"
        }`}
      >
        <Link className=" font-bold" to={"/"}>
          <p>Back to home</p>
        </Link>
      </section>
      {loading && (
        <h2
          className={`text-center  font-black mt-20 text-2xl md:text-4xl ${
            theme === "dark" ? "text-white" : "text-red-600"
          }`}
        >
          Loading Article...
        </h2>
      )}
      {!loading && (
        <section>
          <header
            className={`w-11/12 m-auto mt-5 text-center font-black text-xl md:text-2xl lg:text-4xl ${
              theme === "dark" ? "text-white" : "text-red-600"
            }`}
          >
            <h1>{pageTitle}</h1>
          </header>
          <section className="w-11/12 m-auto mt-5 md:w-11/12 lg:w-3/5">
            <p>
              <strong>Published </strong>
              {article_date}
            </p>
          </section>
          <section className="w-11/12 m-auto md:w-11/12 lg:w-3/5">
            <p>
              By <strong>{article.author}</strong>
            </p>
          </section>
          <section className="w-11/12 mt-2 m-auto md:w-11/12 lg:w-3/5 ">
            <section
              className={`grid ease-in duration-300 rounded-t-lg md:rounded-none ${
                theme === "dark"
                  ? "bg-white text-black shadow-md hover:shadow-white"
                  : "bg-red-500 text-white"
              }`}
            >
              <section className="m-auto md:border-8  md:border-white">
              <img
                className="rounded-t-lg md:rounded-none"
                src={article.article_img_url}
                alt={pageTitle}
              />
              </section>
              <section className="p-4">
                  <p>{article.body}</p>
                <section className="flex justify-center flex-wrap gap-4 items-center pt-4">
                  <section className="flex gap-4 items-center">
                    <p>
                      <strong>Topic:</strong> {article.topic}
                    </p>
                    <p>
                      <strong>Comments:</strong> {article.comment_count}
                    </p>
                  </section>
                  <section className="flex gap-4">
                    <section className=" flex ">
                      <button
                        className={
                          like > 0
                            ? "text-gray-400"
                            : dislike > 0
                            ? "text-gray-400"
                            : "cursor-pointer flex"
                        }
                        aria-label="like this comment"
                        onClick={() => handleLikeDislike("like")}
                        disabled={like > 0 || dislike > 0}
                      >
                        <AiFillLike className="text-2xl mr-2" />
                      </button>
                      <p>{article.votes + like}</p>
                    </section>

                    <section className="flex">
                      <button
                        className={
                          dislike > 0
                            ? "text-gray-400"
                            : like !== 0
                            ? "text-gray-400"
                            : "cursor-pointer flex"
                        }
                        aria-label="dislike this comment"
                        disabled={like > 0 || dislike > 0}
                        onClick={() => handleLikeDislike("dislike")}
                      >
                        <AiFillDislike className="text-2xl mr-2" />
                      </button>
                    </section>
                  </section>
                  <section>
                    {error && (
                      <p
                        className={` ${
                          theme === "dark"
                            ? " text-red-500 p-2 rounded bg-white"
                            : "text-center p-2 rounded bg-red-500 text-white"
                        } font-bold`}
                      >
                        Oops, something has gone wrong. Please try again!
                      </p>
                    )}
                  </section>
                </section>
              </section>
            </section>
            <section className="mt-10">
              <form
                className={` border rounded p-4 ${
                  theme === "dark" ? "" : "border-red-500 "
                } `}
                onSubmit={handleSubmit}
              >
                <section>
                  <p className={`font-bold text-center mb-5 text-red-500 md:text-xl ${theme === "dark" ? "text-white" : ""}`}>
                    Share your thoughts below!
                  </p>
                </section>
                <section className="md:flex md:justify-space-between md:items-center">
                  <section className="md:flex">
                      <label htmlFor="username" className="font-medium">
                        Username
                      </label>
                    <section>
                      <input
                        className={`block focus:ring-red-500 focus:border-red-500 border-red-500  font-medium border  p-2 rounded-lg w-full ${
                          theme === "dark" ? "text-black" : ""
                        }`}
                        id="username"
                        type="text"
                        value={formData.username}
                        name="username"
                        onChange={handleChange}
                        placeholder="Enter your username..."
                      />
                    </section>
                  </section>
                  <section className="mt-4 md:flex">
                      <label htmlFor="body" className="font-medium">
                        Content
                      </label>
                      <textarea
                        className={`border block font-medium  p-2 rounded-lg w-full ${
                          theme === "dark"
                            ? "text-black focus:ring-red-500 focus:border-red-500 border-red-500"
                            : "focus:ring-red-500 focus:border-red-500 border-red-500"
                        }`}
                        id="body"
                        type="text"
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                        placeholder="Enter your comment…"
                      />
                  </section>
                </section>

                <button
                  className={` hover:bg-red-600 ease-in duration-100 text-white mt-4 w-full font-bold rounded p-2 md:p-4 ${
                    formData.username === "" ? "bg-gray-300" : "bg-red-500"
                  }`}
                  disabled={formData.username === "" || formData.body === ""}
                >
                  Post Comment
                </button>
                <section>
                  {postError && (
                    <p
                    className={` ${
                      theme === "dark"
                        ? "text-red-500 border-2 border-red-700 text-center p-2 rounded bg-white"
                        : " rounded  bg-red-400 text-white border-2 border-red-700"
                    } font-bold mt-4 p-2 text-center`}
                    >
                      Oops, something has gone wrong. Please try again!
                    </p>
                  )}
                </section>
              </form>
            </section>
            {deleteError && (
              <p
              className={` ${
                theme === "dark"
                  ? "text-red-500 border-2 border-red-700 text-center p-2 rounded bg-white"
                  : " rounded  bg-red-400 text-white border-2 border-red-700"
              } font-bold mt-4 p-2 text-center`}
            >
              Oops, something has gone wrong. Please try again!
            </p>
            )}
            {showNewComment && (
                <section
                className={`${
                  theme === "dark"
                    ? "bg-white text-black hover:shadow-white"
                    : "bg-red-500 text-white hover:shadow-black"
                } p-4 mt-4 shadow-md rounded-lg ease-in duration-300 relative`}
              >
                <p className="w-11/12">{newComment.body}</p>
                {user === newComment.username && (
                  <span>
                  <FaTrashAlt onClick={handleDelete} className={`ease-in duration-300 hover:scale-150 text-xl absolute right-0 top-0 mr-4 mt-4 cursor-pointer ${theme === "dark" ? "text-red-600 hover:" : ""}`}/>
                  </span>
                )}
                <section className="mt-2 flex gap-4">
                  <p>
                    Comment by <strong>{newComment.username}</strong>
                  </p>
                  <span>.</span>
                  <p>
                    <strong>Likes</strong> 0
                  </p>
                </section>
              </section>
              )}

            <section>
              <section
                className={`font-bold text-center mt-5 mb-8  ${
                  theme === "dark"
                    ? "text-white ease-in duration-100 hover:text-red-600 "
                    : "text-red-600"
                }`}
              >
                <section
                  className="flex gap-1 justify-center items-center"
                  onClick={toggleShowComments}
                >
                  <FaComments className="text-4xl cursor-pointer" />
                  <p className="cursor-pointer">{showComments ? "Hide Comment" : "Show comments"}</p>
                </section>
              </section>
              
              {showComments ? (
                <section>
                  <CommentList article_id={article_id}/>
                </section>
              ) : (
                ""
              )}
            </section>
          </section>
        </section>
      )}
    </main>
  );
};

export default SingleArticle;
