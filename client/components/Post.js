import { PaperAirplaneIcon, HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import CommentsCompressed from "./CommentsCompressed";
import Moment from "react-moment";
import postService from "../services/postService";
import PostTitleCard from "./PostTopCard";

const Post = ({ post, user }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await postService
        .getComments(post)
        .then((response) => setComments(response.data))
        .catch((error) => console.log(error));

      await postService
        .getLikes(post)
        .then((response) => setLikes(response.data))
        .catch((error) => console.log(error));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => user?.id === like.userid) !== -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  const updateLike = async () => {
    if (!hasLiked) {
      const newLike = {
        postId: post.id,
        userId: user.id,
        username: user.username,
      };
      await postService
        .addLike(newLike, user.token)
        .then((response) => setLikes(likes.concat(response.data)))
        .catch((error) => console.log(error));
    } else {
      await postService
        .removeLike(post, user)
        .catch((error) => console.log(error));

      await postService
        .getLikes(post)
        .then((response) => setLikes(response.data))
        .catch((error) => console.log(error));
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      return;
    }

    const newComment = {
      comment: comment,
      username: user.username,
      postId: post.id,
    };

    const response = await postService
      .addComment(newComment, user.token)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    setComments(comments.concat(response));
    setComment("");
  };

  return (
    <article className="w-full pt-2 bg-white rounded pb-1">
      <Link href={`/profile/${post.username}`} passHref>
        <section className="flex pb-2 pl-2 items-center hover:cursor-pointer">
          <PostTitleCard post={post} />
        </section>
      </Link>
      <img src={post.url} alt="" className="mx-auto" />

      <section className="pt-2 pb-2 border-b-[1px] mx-2 border-gray-200">
        {user && (
          <div className="flex mr-2 w-full">
            {hasLiked ? (
              <button onClick={updateLike}>
                <HeartIconSolid className="h-6 text-red-500 hover:scale-125 mr-2" />
              </button>
            ) : (
              <button onClick={updateLike}>
                <HeartIcon className="h-6 hover:scale-125 mr-2" />
              </button>
            )}
            <Link href={`/posts/${post.id}`} passHref>
              <button>
                <PaperAirplaneIcon className="h-6 hover:scale-110 hover:cursor-pointer rotate-45 mb-1" />
              </button>
            </Link>
            <Moment fromNow className="ml-auto text-xs font-semibold">
              {post.createdat}
            </Moment>
          </div>
        )}
        {likes.length > 0 && (
          <>
            {likes.length > 1 ? (
              <p className="text-xs mt-1">
                Liked by <span className="font-semibold">{likes.length}</span>{" "}
                users
              </p>
            ) : (
              <p className="text-xs mt-1">
                Liked by{" "}
                <span className="font-semibold">{likes[0]?.username}</span>
              </p>
            )}
          </>
        )}

        {post.caption && (
          <p className="sm:mt-1 text-sm">
            <span className="font-semibold pr-1">{post.username}</span>
            {post.caption}
          </p>
        )}
      </section>

      <section className="pt-1 mx-2 max-h-48">
        {comments.length < 3 ? (
          comments.map((comment, index) => (
            <div key={index} className="flex">
              <p className="text-sm">
                <span className="font-semibold pr-2">{comment.username}</span>
                {comment.comment}
              </p>
              <Moment fromNow className="text-xs font-semibold ml-auto">
                {comment.timestamp}
              </Moment>
            </div>
          ))
        ) : (
          <CommentsCompressed comments={comments} />
        )}
        {user && (
          <form onSubmit={addComment} className="py-1 relative">
            <input
              className="w-full focus:outline-none bg-gray-100 rounded pl-1"
              onChange={({ target }) => setComment(target.value)}
              value={comment}
            />
            <button
              type="submit"
              className="absolute right-0 text-blue-500 mr-1 hover:cursor-pointer"
            >
              Send
            </button>
          </form>
        )}
      </section>
    </article>
  );
};

export default Post;
