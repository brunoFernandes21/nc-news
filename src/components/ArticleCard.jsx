

const ArticleCard = ({ title, author, topic, votes, article_img_url }) => {
  return (
    <div className="bg-red-500 shadow-lg shadow-red-500/50 text-white  rounded-lg cursor-pointer ease-in duration-300 hover:scale-105">
        <img className="rounded-t-lg" src={article_img_url} alt="Image related to the article" />
        <div className="article__info m-4">
            <p><strong>Title</strong>: {title}</p>
            <p>Article written by <strong>{author}</strong></p>
            <p><strong>Topic:</strong> {topic}</p>
            <p><strong>votes:</strong> {votes}</p>
        </div>
    </div>
  )
}

export default ArticleCard