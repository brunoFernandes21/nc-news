import React from "react";

const CommentCard = ({ author, votes, body }) => {
  return (
    <div className="bg-red-500 p-4 shadow-md text-white rounded-lg cursor-pointer ease-in duration-300 hover:shadow-black">
      <div>
        <p>{body}</p>
      </div>
      <div className="mt-2">
        <p>
          Comment by <strong>{author}</strong>
        </p>
        <p><strong>Likes</strong> {votes}</p>
      </div>
    </div>
  );
};

export default CommentCard;
