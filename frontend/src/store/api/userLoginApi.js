import axios from "axios";
import { BASE_URL } from "../../constants/constants";

async function login({ username, password }) {
  return await axios({
    method: "post",
    url: BASE_URL + `/api/user/login/`,
    data: {
      username: username,
      password: password,
    },
  });
}

async function register({ username, password }) {
  const data = JSON.stringify({
    "username": username,
    "password": password,
  });
  return await axios({
    method: "post",
    url: BASE_URL + `/api/user/`,
    headers: { "Content-Type": "application/json" },
    data: data,
  });
}

const userLoginApi = {
  login: login,
  register: register,
};

export default userLoginApi;
