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
    <main
      className={`${theme === "dark" ? "bg-white text-black shadow-md hover:shadow-white" : "text-black bg-white shadow-md hover:shadow-black"} rounded-lg cursor-pointer ease-in duration-300 hover:scale-105`}
      onClick={navigateTo}
    >
      <img
        className="rounded-t-lg"
        src={article_img_url}
        alt={title}
      />
      <section className="article__info m-4">
        <p>
          <strong>Title</strong>: {title}
        </p>
        <p>
          Article written by <strong>{author}</strong>
        </p>
        <section className="flex gap-4">
          <p>
            <strong>Topic:</strong> {topic}
          </p>
          <span>.</span>
          <p>
            <strong>votes:</strong> {votes}
          </p>
        </section>
      </section>
    </main>
  );
};

export default ArticleCard;
