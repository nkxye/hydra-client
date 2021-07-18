import axios from "axios";
import { server } from "./index";

export async function loadPods(callback) {
  const token = localStorage.getItem("token").replace(/['"]+/g, "");
  await axios
    .get(`${server}pod/vacant`, {
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
