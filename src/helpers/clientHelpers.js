import { v4 as uuidv4 } from "uuid";

export function getClientName() {
  const user = JSON.parse(localStorage.getItem("user-data"));
  if (user === null || typeof user === 'undefined' || Object.keys(user).length === 0) {
    const client = {
      username: `guest-${uuidv4()}`,
    };
    localStorage.setItem("user-data", JSON.stringify(client));
    return client;
  } else {
    return user.username;
  }
}
