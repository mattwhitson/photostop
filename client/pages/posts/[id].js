import axios from "axios";
import Moment from "react-moment";

const PostPage = ({ post, user, likes, comments }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] w-full bg-[#f7f7f7] items-center justify-center">
      <div className="flex flex-col 2xl:flex-row">
        <div className="max-w-7xl">
          <img src={post.url} alt="" />
        </div>
        <div className="flex flex-col w-full 2xl:w-64 xl:bg-white rounded-md pb-2">
          <div className="flex items-center mx-2 mt-2">
            {user.profilepicture ? (
              <img
                src={user.profilepicture}
                alt=""
                className="h-8 rounded-full"
              />
            ) : (
              <img
                src="/default-avatar.jpg"
                alt=""
                className="h-8 rounded-full"
              />
            )}
            <h4 className="text-xl pl-2">{post.username}</h4>
          </div>
          <div className="flex">
            <p className="mx-2 2xl:mx-4">
              <span className="font-semibold text-blue-700">
                {likes.length}
              </span>{" "}
              likes
            </p>
            <Moment className="pl-2 font-semibold text-sm ml-auto" fromNow>
              {post.createdat}
            </Moment>
          </div>
          <p className="mx-2 pb-6 2xl:mt-6 2xl:border-b-[1px] 2xl:border-gray-200  2xl:mb-6">
            {post.caption}
          </p>
          {comments.map((comment) => (
            <div key={comment.id} className="flex text-sm mx-2">
              <p className="mr-2 font-semibold">{comment.username}</p>
              <p>{comment.comment}</p>
              <Moment fromNow className="ml-auto text-sm font-semibold">
                {comment.timestamp}
              </Moment>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const postId = context.params.id;

  const response = await axios
    .get(`https://quiet-wildwood-05743.herokuapp.com/posts/post/${postId}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  const userResponse = await axios
    .get(
      `https://quiet-wildwood-05743.herokuapp.com/users/profile/${response.username}`
    )
    .then((response) => response.data)
    .catch((error) => console.log(error));

  const likesResponse = await axios
    .get(`https://quiet-wildwood-05743.herokuapp.com/posts/likes/${postId}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  const commentsResponse = await axios
    .get(
      `https://quiet-wildwood-05743.herokuapp.com/posts/getcomments/${postId}`
    )
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return {
    props: {
      post: response || null,
      user: userResponse || null,
      likes: likesResponse || null,
      comments: commentsResponse || null,
    },
  };
};

export default PostPage;
