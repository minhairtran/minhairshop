import axios from "axios";
import { BASE_URL } from "../../constants/constants";

async function getUserProfile() {
  const access_token =
    "Bearer " + JSON.parse(localStorage.getItem("access_token"));

  return await axios({
    method: "get",
    url: BASE_URL + `/api/user/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: access_token,
    },
  });
}

async function updateUserProfile({ email, firstName, lastName }) {
  const access_token =
    "Bearer " + JSON.parse(localStorage.getItem("access_token"));

  return await axios({
    method: "put",
    url: BASE_URL + `/api/user/`,
    data: { email: email, first_name: firstName, last_name: lastName },
    headers: {
      "Content-Type": "application/json",
      Authorization: access_token,
    },
  });
}

async function getUsername() {
  const access_token =
    "Bearer " + JSON.parse(localStorage.getItem("access_token"));

  return await axios({
    method: "get",
    url: BASE_URL + `/api/user-name/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: access_token,
    },
  });
}

async function changePassword({oldPassword, newPassword}) {
  const access_token =
    "Bearer " + JSON.parse(localStorage.getItem("access_token"));

  return await axios({
    method: "put",
    url: BASE_URL + `/api/user/change-password/`,
    data: { old_password: oldPassword, new_password: newPassword }, 
    headers: {
      "Content-Type": "application/json",
      Authorization: access_token,
    },
  });
}

const userProfileApi = {
  getUserProfile: getUserProfile,
  updateUserProfile: updateUserProfile,
  getUsername: getUsername,
  changePassword: changePassword
};

export default userProfileApi;
