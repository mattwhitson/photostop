import { useEffect, useState } from "react";
import userService from "../services/userService";

const PostTitleCard = ({ post }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    userService
      .getUser(post.username)
      .then((response) => setUserProfile(response.data))
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userProfile) return <div className="w-8 h-8"></div>;
  return (
    <>
      {userProfile?.profilepicture ? (
        <img
          src={userProfile.profilepicture}
          className="h-8 rounded-full"
          alt=""
        />
      ) : (
        <img src="/default-avatar.jpg" className="h-8 rounded-full" alt="" />
      )}
      <p className="font-xl font-semibold ml-2 ">{post.username}</p>
    </>
  );
};

export default PostTitleCard;
