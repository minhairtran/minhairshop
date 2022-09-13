import axios from "axios";
import {BASE_URL} from "./constants";

async function login({username, password}) {
  return await axios({
    method: "post",
    url: BASE_URL + `/api/user/login/`,
    data: {
      username: username,
      password: password,
    },
  });
}

const userApi = {
  login: login,
};

export default userApi;
