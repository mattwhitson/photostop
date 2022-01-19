import Post from "./Post";

const Feed = ({ posts, user }) => {
  return (
    <div className="max-w-xl mx-auto sm:py-4 space-y-4">
      {posts.map((post) => (
        <Post key={post.id} user={user} post={post} />
      ))}
    </div>
  );
};

export default Feed;
