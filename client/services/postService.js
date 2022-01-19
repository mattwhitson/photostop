import axios from "axios";

const baseUrl = "https://quiet-wildwood-05743.herokuapp.com";

const getComments = async (post) => {
  const response = await axios.get(`${baseUrl}/posts/getcomments/${post.id}`);

  return response;
};

const getLikes = async (post) => {
  const response = await axios.get(`${baseUrl}/posts/likes/${post.id}`);

  return response;
};

const addLike = async (newLike, token) => {
  const response = await axios.post(`${baseUrl}/posts/likes`, newLike, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

const removeLike = async (post, user) => {
  const response = await axios.delete(
    `${baseUrl}/posts/likes/remove/${post.id}&${user.id}`,
    {
      headers: { Authorization: `Bearer ${user.token}` },
    }
  );
  return response;
};

const addComment = async (newComment, token) => {
  const response = await axios.post(`${baseUrl}/posts/addcomment`, newComment, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const addPost = async (newPost, token) => {
  const response = await axios.post(`${baseUrl}/posts/add`, newPost, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

const addImageToPost = async (id, downloadURL, token) => {
  const response = await axios.post(
    `${baseUrl}/posts/addimage`,
    { id: id, url: downloadURL },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};

const functionsForExport = {
  getComments,
  getLikes,
  addLike,
  removeLike,
  addComment,
  addPost,
  addImageToPost,
};

export default functionsForExport;
