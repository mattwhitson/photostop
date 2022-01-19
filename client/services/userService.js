import axios from "axios";

const baseUrl = "https://quiet-wildwood-05743.herokuapp.com";

const login = async (user) => {
  const response = await axios.post(`${baseUrl}/users/login`, user);

  return response;
};

const register = async (user) => {
  const response = await axios.post(`${baseUrl}/users/register`, user);

  return response;
};

const addProfilePicture = async (id, downloadURL, token) => {
  const body = {
    userId: id,
    downloadURL,
  };
  const response = await axios.post(`${baseUrl}/users/addprofilepic`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

const getUser = async (username) => {
  const response = await axios.get(`${baseUrl}/users/profile/${username}`);
  return response;
};

const functionForExport = {
  login,
  register,
  addProfilePicture,
  getUser,
};

export default functionForExport;
