import { useState, useEffect } from "react";
import {
  fetchSingleArticle,
  incrementVote,
  decrementVote,
  postComment,
  deleteComment,
} from "../utils/api";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import CommentList from "./CommentList";
import { FaComments } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
import { UserContext } from "../contexts/User";
import { FaTrashAlt } from "react-icons/fa";
import NotFound from "./NotFound";

const SingleArticle = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState({});
  const [newComment_id, setNewComment_id] = useState(null);
  const [showNewComment, setShowNewComment] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [noArticleError, setNoArticleError] = useState(null);
  const [postError, setPostError] = useState(null);
  const [deleteError, setDeleteError] = useState(false);
  const [success, setSuccess] = useState(false)
  const [like, setLike] = useState(0);
  const [isLike, setIsLike] = useState(false)
  const [isDislike, setIsDislike] = useState(false)
  const [dislike, setDislike] = useState(0);
  const { article_id } = useParams();

  const article_date = dayjs(article.created_at).format("DD/MM/YYYY HH:mma");
  const [formData, setFormData] = useState({
    username: user,
    body: "",
  });

  useEffect(() => {
    window.scrollTo(0,0);
    document.title = "Single Article";
    setLoading(true);
    setNoArticleError(null);
    const getSingleArticle = async () => {
      try {
        const data = await fetchSingleArticle(article_id);
        setNoArticleError(null);
        setArticle(data);
        setPageTitle(data.title);
        setLoading(false);
      } catch (error) {
        setNoArticleError(error);
        setLoading(false);
      }
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
    setPostError(null);
    setLoading(false);
    try {
      const data = await postComment(formData, article_id);
      setNewComment_id(data.comment_id);
      setFormData({
        username: user,
        body: "",
      });
    } catch (error) {
      setLoading(false);
      setPostError(error);
    }
  };
  const handleLike = async () => {
    if(isDislike) {
      setDislike((currentDislikeCount) => {
        return currentDislikeCount - 1
      })
      setIsDislike(false)
    }
    if(isLike) {
      setLike((currentLikeCount) => {
        return currentLikeCount - 1;
      });
      setIsLike(false)
      try {
        setApiError(false);
        await decrementVote(article_id);
      } catch (error) {
        setLike((currentlikeCount) => {
          return currentlikeCount + 1;
        });
        setIsLike(true)
        setIsDislike(false)
        setApiError(error);
      }

    } else {
      setLike((currentLikeCount) => {
        return currentLikeCount + 1;
      });
      setIsLike(true)
        try {
          setApiError(null);
          await incrementVote(article_id);
          setIsDislike(false)
          setIsLike(true)
        } catch (error) {
          setLike((currentlikeCount) => {
            return currentlikeCount - 1;
          });
          setIsLike(false)
          setIsDislike(false)
          setApiError(error);
        }
    }

  }

  const handleDislike = async () => {
    if(isLike) {
      setLike((currentLikeCount) => {
        return currentLikeCount - 1;
      });
      setIsLike(false)
      setIsDislike(true)
      try {
        setApiError(false);
        await decrementVote(article_id);
      } catch (error) {
        setLike((currentlikeCount) => {
          return currentlikeCount + 1;
        });
        setIsLike(false)
        setIsDislike(false)
        setApiError(error);
      }
    } 
    if(isDislike) {
      setDislike((currentDislikeCount) => {
        return currentDislikeCount - 1
      })
      setIsDislike(false)
    }else {
      setDislike((currentDislikeCount) => {
        return currentDislikeCount + 1
      })
      setIsDislike(true)
    }
  }
  const handleLikeDislike = (param) => {
    if(param === "like") {
      handleLike()
    }else {
      handleDislike()
    }
  };
  const toggleShowComments = () => {
    setShowComments(!showComments);
    setShowNewComment(false);
  };
  const handleDelete = async () => {
    setShowNewComment(false);
    setDeleteError(false);
    setLoading(false);
    setSuccess(true)
    try {
      await deleteComment(newComment_id);
      setTimeout(() => {
        setSuccess(false)
      }, 2000);
    } catch (error) {
      setLoading(false);
      setDeleteError(true);
      setSuccess(false)
      setShowNewComment(true);
      setTimeout(() => {
        setDeleteError(false)
      }, 2000);
    }
  };
  return (
    <main className={`mt-14 ${theme}`}>
      {!noArticleError && !loading && (
        <section
          className={`text-sm w-32 p-1 text-center mt-5 md:mt-10 lg:mt-16 border-2 ml-5 md:ml-10 rounded md:p-2 md:text-base md:w-36 ease-in duration-100 hover:text-red-500 hover:border-red-500 ${
            theme === "dark" ? "border-white" : "border-black"
          }`}
        >
          <Link className=" font-bold" to={"/"}>
            <p>Back to home</p>
          </Link>
        </section>
      )}
      {loading && (
        <h2
          className={`text-center  font-black mt-20 text-2xl md:text-4xl ${
            theme === "dark" ? "text-white" : "text-red-600"
          }`}
        >
          Loading Article...
        </h2>
      )}
      {noArticleError && <NotFound />}

      {!noArticleError && (
        <section>
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
            <section className="m-auto md:mb-2 flex items-center justify-center">
                <img
                  className="rounded-t-lg lg:rounded md:border-4 md:border-black"
                  src={article.article_img_url}
                  alt={pageTitle}
                />
                </section>
              <section
                className={`grid ease-in duration-300 md:rounded-lg ${
                  theme === "dark"
                    ? "bg-white text-black shadow-md hover:shadow-white"
                    : "bg-white text-black shadow-md hover:shadow-gray-400"
                }`}
              >
                
                <section className="p-4 ">
                    <p>{article.body}</p>
                  <section className="flex justify-center flex-wrap  items-center gap-2 pt-4">
                    <section className="flex gap-2 items-center">
                      <p>
                        <strong>Topic:</strong> {article.topic}
                      </p>
                      <span>.</span>
                      <p>
                        <strong>Comments:</strong> {article.comment_count}
                      </p>
                    </section>
                    <span className="max-sm:hidden flex">.</span>
                    <section className="flex gap-2 bg-gray-400 rounded-full p-1">
                      <section className="flex pl-2">
                        <button
                          className={` ${theme === "dark" && isLike ? "text-black" : ""}ease-in duration-300 hover:scale-125 text-sm cursor-pointer flex ${isLike ? "text-black" : "text-white"}`}
                          aria-label="like this comment"
                          onClick={() => handleLikeDislike("like")}
                        >
                          <AiFillLike className={`text-2xl mr-2 `} />
                        </button>
                        <p className={` font-bold ${theme === "dark" ? "text-white" : "text-white"}`}>{article.votes + like}</p>
                      </section>
                      <span className={` font-bold text-white`}>|</span>
                      <section>
                        <button
                          className={` ${theme === "dark" && isDislike ? "text-black" : ""}ease-in duration-300 hover:scale-125 text-sm cursor-pointer flex ${isDislike ? "text-black" : "text-white" }`}
                          aria-label="dislike this comment"
                          onClick={() => handleLikeDislike("dislike")}
                        >
                          <AiFillDislike className="text-2xl mr-2" />
                        </button>
                      </section>
                    </section>
                    <section>
                      {apiError && (
                        <p
                          className={` ${
                            theme === "dark"
                              ? " text-red-500 p-2 rounded bg-white"
                              : "text-center p-2 rounded bg-red-500 text-white"
                          } font-bold`}
                        >
                          Something has gone wrong
                        </p>
                      )}
                    </section>
                  </section>
                </section>
              </section>
              <section className="mt-10 m-auto md:max-w-2xl">
                <form
                  className={` bg-white border px-6 py-8 rounded shadow-md w-full`}
                  onSubmit={handleSubmit}
                >
                  <section>
                    <p className={`font-bold text-center mb-5 text-red-500 md:text-xl `}>
                      Share your thoughts below
                    </p>
                  </section>
                  <section >
                    <section >
                        <label htmlFor="username" className=" text-black font-medium">
                          Username
                        </label>
                      <section>
                        <input
                          className={`block font-medium border mt-2 p-2 rounded-lg w-full ${
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
                    <section className="mt-4">
                        <label htmlFor="body" className="text-black font-medium">
                          Comment
                        </label>
                        <textarea
                          className={`border block font-medium mt-2  p-2 rounded-lg w-full ${
                            theme === "dark" ? "text-black" : ""
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
                        <p>Unable to post comment. Please, try again later!</p>
                      </p>
                    )}
                  </section>
                </form>
              </section>
              {!postError && showNewComment && (
                <section
                className={`${
                  theme === "dark"
                    ? "bg-white text-black hover:shadow-white"
                    : "bg-white text-black hover:shadow-gray-400"
                } w-1/2 m-auto p-4 mt-4 shadow-md rounded-lg ease-in duration-300 relative`}
              >
                <p className="w-11/12">{newComment.body}</p>
                {user === newComment.username && (
                  <span>
                  <FaTrashAlt onClick={handleDelete} className={`ease-in duration-300 hover:scale-150 text-xl absolute right-0 top-0 mr-4 mt-4 cursor-pointer ${theme === "dark" ? "text-red-600 " : "text-red-600"}`}/>
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

              {deleteError && <p className={` w-1/2 m-auto text-center mt-4 p-2 border font-bold ${theme === "dark" ? "text-white " : "border-red-500 text-red-500 "}`}>Unable to delete comment. Please try again later!</p>}
              {success && <p className={`w-1/2 m-auto text-center mt-4 p-2 border font-bold ${theme === "dark" ? "text-white " : "border-green-900 text-green-600"}`}>Comment deleted successfully!</p>}
              <section>
                <section
                  className={`font-bold text-center mt-5 mb-8  ${
                    theme === "dark"
                      ? "text-white ease-in duration-100 hover:text-red-500 "
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
        </section>
      )}
    </main>
  );
};

export default SingleArticle;
