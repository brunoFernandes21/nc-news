import { useNavigate, useParams } from "react-router";
import { useContext } from 'react';
import { ThemeContext } from '../contexts/Theme';

const ArticleCard = ({
  title,
  author,
  topic,
  votes,
  article_img_url,
  article_id,
}) => {
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(`/articles/${article_id}`);
  };
  return (
    <article
      className={`${theme === "dark" ? "bg-white text-black shadow-md hover:shadow-white" : "text-white bg-red-500 shadow-md hover:shadow-black"} rounded-lg cursor-pointer ease-in duration-300 hover:scale-105`}
      onClick={navigateTo}
    >
      <img
        className="rounded-t-lg"
        src={article_img_url}
        alt="Image related to the article"
      />
      <div className="article__info m-4">
        <p>
          <strong>Title</strong>: {title}
        </p>
        <p>
          Article written by <strong>{author}</strong>
        </p>
        <div className="flex gap-4">
          <p>
            <strong>Topic:</strong> {topic}
          </p>
          <span>.</span>
          <p>
            <strong>votes:</strong> {votes}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
