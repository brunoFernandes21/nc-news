import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
import { FaTrashAlt } from "react-icons/fa"
import { UserContext } from '../contexts/User';


const CommentCard = ({ author, votes, body, comment_id, deleteComment }) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext)

  return (
    <main
      className={`${
        theme === "dark"
          ? "bg-white text-black hover:shadow-white"
          : "bg-white text-black hover:shadow-gray-400"
      } p-4  shadow-md rounded-lg ease-in duration-300 relative`}
    >
      <p className="w-11/12">{body}</p>
      {user === author && (
        <span>
        <FaTrashAlt onClick={() => deleteComment(comment_id)} className={` " ease-in duration-300 hover:scale-150 text-xl absolute right-0 top-0 mr-4 mt-4 cursor-pointer ${theme === "dark" ? "text-red-600 " : "text-red-600"}`}/>
        </span>
      )}
      <section className="mt-2 flex gap-4">
        <p>
          Comment by <strong>{author}</strong>
        </p>
        <span>.</span>
        <p>
          <strong>Likes</strong> {votes}
        </p>
      </section>
    </main>
  );
};

export default CommentCard;
