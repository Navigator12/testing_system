import axios from "axios";

const API_URL = "http://localhost:4000";

export const registerUser = (user) => {
  const url = `${API_URL}/api/auth/register`;
  return axios.post(url, user);
};

export const loginUser = (user) => {
  const url = `${API_URL}/api/auth/login`;
  return axios.post(url, user);
};

export const getContestById = (id) => {
  const url = `${API_URL}/api/contest/${id}`;
  return axios.get(url);
}
