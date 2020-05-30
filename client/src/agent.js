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

export const createContest = (contest, token) => {
  const url = `${API_URL}/api/contest/create`;
  return axios.post(url, contest, { headers: { Authorization: `Bearer ${token}` } });
};

export const getContestById = (id, token) => {
  const url = `${API_URL}/api/contest/${id}`;
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
};

export const getContestsByUser = (token) => {
  const url = `${API_URL}/api/contest/index`;
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
};

export const addUsersToContest = (contestId, studentIds, token) => {
  const url = `${API_URL}/api/contest/${contestId}`;
  return axios.put(url, { studentIds }, { headers: { Authorization: `Bearer ${token}` } });
}

export const createMark = (contestId, answers, token) => {
  const url = `${API_URL}/api/mark/create`;
  return axios.post(url, { contestId, answers }, { headers: { Authorization: `Bearer ${token}` } });
}

export const getMark = (contestId, userId) => {
  const url = `${API_URL}/api/mark/${contestId}/${userId}`;
  return axios.get(url);
}

export const getUsers = (token) => {
  const url = `${API_URL}/api/teacher/users`;
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } } );
}
