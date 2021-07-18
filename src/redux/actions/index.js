import {
  COLLECT_USER_DATA,
  COLLECT_USER_TOKEN,
  RESET_DATA,
} from "./actionTypes";

// for User Data after Authenication
export function collectUserData(data) {
  return {
    type: COLLECT_USER_DATA,
    payload: data,
  };
}
// end

// for User Token Data after Authenication
export function collectUserToken(data) {
  return {
    type: COLLECT_USER_TOKEN,
    payload: data,
  };
}
// end

// for state reset
export function resetData() {
  return {
    type: RESET_DATA,
  };
}
