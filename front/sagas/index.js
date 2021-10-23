import { all, fork } from "redux-saga/effects";
import userSaga from "./user";
import productTypeSaga from "./productType";
//
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:4000";

export default function* rootSaga() {
  yield all([
    fork(userSaga), //
    fork(productTypeSaga), //
  ]);
}
