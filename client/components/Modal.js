/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/solid";
import { Fragment, useContext, useRef, useState } from "react";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { UserContext } from "../contexts/UserContext";
import { storage } from "../firebase";
import postService from "../services/postService";
import { PostsContext } from "../contexts/PostsContext";

const Modal = ({ isOpen, setIsOpen }) => {
  const [user] = useContext(UserContext);
  const [posts, setPosts] = useContext(PostsContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const submitPost = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const newPost = {
      username: user.username,
      uid: user.id,
      caption: caption,
    };

    const response = await postService
      .addPost(newPost, user.token)
      .then((res) => res.data)
      .catch((error) => console.log(error));

    const imageRef = ref(storage, `posts/${response.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        const newPost = await postService
          .addImageToPost(response.id, downloadURL, user.token)
          .then((res) => res.data)
          .catch((error) => console.log(error));

        setPosts(posts.reverse().concat(newPost).reverse());
        console.log(newPost);
      }
    );
    setLoading(false);
    setSelectedFile(null);
    setCaption(null);
    setIsOpen(false);
  };
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#111111] bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all w-full sm:max-w-sm">
              <Dialog.Title className="w-full text-center text-2xl font-semibold">
                Upload a Photo
              </Dialog.Title>
              <div className="flex flex-col justify-center items-center">
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    className="w-full object-contain cursor-pointer mt-6 hover:bg-gray-500 hover:opacity-50"
                    onClick={() => setSelectedFile(null)}
                    alt=""
                  />
                ) : (
                  <button
                    className="p-4 mt-6 bg-blue-900 rounded-full hover:opacity-80"
                    onClick={() => filePickerRef.current.click()}
                  >
                    <CameraIcon className="h-6 sm:h-6 text-blue-500 scale-150" />
                  </button>
                )}
                <input
                  ref={filePickerRef}
                  type="file"
                  hidden
                  onChange={addImage}
                />
                <input
                  className="mt-2 w-full focus:outline-none h-8 bg-[#f7f7f7] rounded"
                  onChange={({ target }) => setCaption(target.value)}
                  placeholder="Add a caption..."
                />
                <button
                  onClick={submitPost}
                  className="w-full h-10 bg-blue-600 text-white text-lg rounded mt-2"
                >
                  {loading ? "Uploading Post..." : "Upload"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

{
  /* <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="fixed flex flex-col justify-center items-center min-h-screen w-full p-48">
        <Dialog.Overlay className="fixed inset-0 bg-[#111111] opacity-80 flex flex-col justify-center items-center min-h-screen w-full" />
        <div className="bg-[#f7f7f7] p-24 rounded-md z-20">
          <Dialog.Title className="text-xl sm:text-2xl text-center">
            Upload A photo
          </Dialog.Title>
          <input type="file" />
          <Dialog.Description>Add a Caption</Dialog.Description>
          <input />

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>
        </div>
        <button onClick={() => setIsOpen(false)}>Deactivate</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </div>
    </Dialog> */
}
