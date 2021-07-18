import axios from "axios";
import { server } from "./index";

export async function addNewCrop(data, callback) {
  const token = localStorage.getItem("token").replace(/['"]+/g, "");

  await axios
    .post(`${server}crop/new`, data, {
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

export async function getActiveCrops(callback) {
  await axios
    .get(`${server}crops/active`, callback, {
      "Content-type": "application/json",
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error.response);
    });
}

export async function loadActiveCrop(data, callback) {
  await axios
    .get(`${server}crop/${data}`, callback, {
      "Content-type": "application/json",
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error.response);
    });
}

export async function harvestCrop(data, callback) {
  const token = localStorage.getItem("token").replace(/['"]+/g, "");

  await axios
    .patch(`${server}crop/${data.pod_name}/harvest`, data, {
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

export async function updateCrop(data, podName, callback) {
  const token = localStorage.getItem("token").replace(/['"]+/g, "");

  await axios
    .patch(`${server}crop/${podName}/update`, data, {
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

export async function loadPastCrops(callback) {
  await axios
    .get(`${server}history`, callback, {
      "Content-type": "application/json",
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error.response);
    });
}

export async function getPDF(data, callback) {
  await axios
    .get(`${server}report/${data.pod_name}/${data.crop_id}`, callback, {
      "Content-type": "application/json",
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error.response);
    });
}

export async function chartData(data, callback) {
  await axios
    .get(`${server}chart/data/${data.crop_id}`, callback, {
      "Content-type": "application/json",
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error.response);
    });
}
