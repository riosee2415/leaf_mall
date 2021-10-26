import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import productType from "./productType";
import product from "./product";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        productType,
        product,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
