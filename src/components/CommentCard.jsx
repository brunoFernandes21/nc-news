
import { useContext } from 'react';
import { ThemeContext } from '../contexts/Theme';
const CommentCard = ({ author, votes, body }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`${theme === "dark" ? "bg-white text-black hover:shadow-white" : "bg-red-500 text-white hover:shadow-black"} p-4 shadow-md rounded-lg cursor-pointer ease-in duration-300`}>
      <div>
        <p>{body}</p>
      </div>
      <div className="mt-2 flex gap-4">
        <p>
          Comment by <strong>{author}</strong>
        </p>
        <span>.</span>
        <p><strong>Likes</strong> {votes}</p>
      </div>
    </div>
  );
};

export default CommentCard;
