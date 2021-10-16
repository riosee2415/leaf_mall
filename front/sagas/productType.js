import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  PRODUCT_TYPE_REQUEST,
  PRODUCT_TYPE_SUCCESS,
  PRODUCT_TYPE_FAILURE,
  //
} from "../reducers/productType";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productTypeAPI(data) {
  return axios.get("/api/productType/list", data);
}

function* productType(action) {
  try {
    const result = yield call(productTypeAPI, action.data);
    yield put({
      type: PRODUCT_TYPE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TYPE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchProductType() {
  yield takeLatest(PRODUCT_TYPE_REQUEST, productType);
}

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
export default function* productTypeSaga() {
  yield all([
    fork(watchProductType),
    //
  ]);
}
