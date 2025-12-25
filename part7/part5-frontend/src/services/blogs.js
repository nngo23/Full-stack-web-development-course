import axios from "axios";

let baseUrl = `http://localhost:${window.BACKEND_PORT || 3003}/api/blogs`;

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject);
  return res.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data.id;
};

export default { setToken, getAll, create, update, remove };
