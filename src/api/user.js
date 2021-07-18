import axios from "axios";
import { server } from "./index";

//params setUpName, password, email
export async function registerUser(data, callback) {
  await axios
    .post(`${server}admin/register`, data, {
      headers: {
        "Content-type": "application/json",
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error.response);
    });
}

export async function elevateRole(data, callback) {
  await axios
    .post(`${server}admin/elevate`, data, {
      headers: {
        "Content-type": "application/json",
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error.response);
    });
}

export async function logoutUser(data, headers, callback) {
  await axios
    .post(`${server}LogOut`, data, {
      headers: {
        "Content-type": "application/json",
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error.response);
    });
}

export async function changeUserPassword(data, callback) {
  const token = localStorage.getItem("token").replace(/['"]+/g, "");
  await axios
    .patch(`${server}admin/update`, data, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error.response);
    });
}

export async function resetPassword(data, callback) {
  await axios
    .patch(`${server}reset/${data.token}`, data, {
      headers: {
        "Content-type": "application/json",
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error.response);
    });
}

//params setUpName, password, email
export async function forgotPassword(callback) {
  await axios
    .get(`${server}forgot`, {
      headers: {
        "Content-type": "application/json",
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error.response);
    });
}
