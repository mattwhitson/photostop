import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import axios from "axios";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import { storage } from "../../firebase";
import { UserContext } from "../../contexts/UserContext";
import userService from "../../services/userService";
import Cookies from "js-cookie";

export const getServerSideProps = async (context) => {
  const username = context.params.username;
  const posts = await axios
    .get(`https://quiet-wildwood-05743.herokuapp.com/posts/${username}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  const user = await axios
    .get(`https://quiet-wildwood-05743.herokuapp.com/users/profile/${username}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return {
    props: {
      posts: posts || null,
      userProfileInitial: user || null,
    },
  };
};

const Profile = ({ posts, userProfileInitial }) => {
  const [user, setUser] = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userProfile, setUserProfile] = useState(userProfileInitial);
  const filePickerRef = useRef();

  const addImage = (event) => {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const saveChanges = async () => {
    if (!selectedFile) {
      return;
    }
    const imageRef = ref(storage, `users/${user.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        const response = await userService
          .addProfilePicture(user.id, downloadURL, user.token)
          .then((res) => res.data)
          .catch((error) => console.log(error));
        setUserProfile(response);
        if (response.username === user.username) {
          Cookies.set("user", JSON.stringify(response));
          setUser(response);
        }
      }
    );
    setSelectedFile(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f7f7f7]">
      <div className="flex flex-col max-w-7xl mx-auto pt-16">
        <div className="flex pb-8 border-b-[1px] border-gray-300">
          {userProfile?.profilepicture ? (
            <img
              src={userProfile.profilepicture}
              className={`h-24 ml-4 md:ml-0 md:h-40 rounded-full ${
                editMode && "hover:opacity-80"
              }`}
              alt=""
              onClick={() => editMode && filePickerRef.current.click()}
            />
          ) : (
            <img
              src="/default-avatar.jpg"
              className={`h-24 ml-4 md:ml-0 md:h-40 rounded-full ${
                editMode && "hover:opacity-80"
              }`}
              alt=""
              onClick={() => editMode && filePickerRef.current.click()}
            />
          )}
          <input hidden type="file" ref={filePickerRef} onChange={addImage} />
          <div className="flex flex-col space-y-4 ml-4 mt-2 sm:ml-10 w-full">
            <p className="text-xl sm:text-2xl font-semibold">
              {userProfile?.username}
            </p>
            <p className="text-lg sm:text-xl text-gray-600 italic">
              {userProfile?.email}
            </p>
            {userProfile?.username === user?.username && (
              <button
                onClick={() => setEditMode(!editMode)}
                className="bg-blue-600 text-lg text-white mt-8 w-36 py-2 rounded"
              >
                {editMode ? (
                  <span onClick={saveChanges}>Save Changes</span>
                ) : (
                  <span>Edit Profile Pic</span>
                )}
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 w-full pt-2 md:pt-8">
          {posts.length &&
            posts.map((post) => (
              <div
                key={post.id}
                className="relative col-span-1 pb-[30%] aspect-square mx-[1px] my-[1px] sm:mx-1 sm:my-1 hover:cursor-pointer"
              >
                <Link href={`/posts/${post.id}`} passHref>
                  <img
                    className="absolute w-full h-full object-cover"
                    src={post.url}
                    alt=""
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
