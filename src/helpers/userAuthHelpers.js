export function checkUserAuth() {
  const user = JSON.parse(localStorage.getItem("user-data"));
  if (user !== null && typeof user !== 'undefined' && Object.keys(user).length !== 0) {
    const isGuest = user.username.includes("guest");
    if (isGuest) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export function getUserDataSession() {
  const user = localStorage.getItem("user-data");

  if (user === null || user === undefined) {
    return false;
  } else {
    return JSON.parse(user);
  }
}
