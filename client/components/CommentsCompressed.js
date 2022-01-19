import { useState } from "react";
import Moment from "react-moment";

const CommentsCompressed = ({ comments }) => {
  const [viewAllComments, setViewAllComments] = useState(false);
  const lastComments = comments.slice(-2);
  return (
    <>
      {viewAllComments ? (
        <>
          <button
            className="text-sm text-gray-500"
            onClick={() => setViewAllComments(false)}
          >
            Hide
          </button>
          {comments.map((comment) => (
            <div key={comment.id} className="flex">
              <p className="text-sm">
                <span className="font-semibold pr-2">{comment.username}</span>
                {comment.comment}
              </p>
              <Moment fromNow className="text-xs font-semibold ml-auto">
                {comment.timestamp}
              </Moment>
            </div>
          ))}
        </>
      ) : (
        <>
          <button
            className="text-sm text-gray-500"
            onClick={() => setViewAllComments(true)}
          >
            View All Comments
          </button>
          {lastComments.map((comment) => (
            <div key={comment.id} className="flex">
              <p className="text-sm">
                <span className="font-semibold pr-2">{comment.username}</span>
                {comment.comment}
              </p>
              <Moment fromNow className="text-xs font-semibold ml-auto">
                {comment.timestamp}
              </Moment>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default CommentsCompressed;
