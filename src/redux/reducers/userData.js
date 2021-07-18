import { COLLECT_USER_DATA } from "../actions/actionTypes";

let inititalState = {};

const userData = (state = inititalState, action) => {
  switch (action.type) {
    case COLLECT_USER_DATA: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state;
    }
  }
};

export default userData;
