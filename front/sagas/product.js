import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
} from "../reducers/product";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productListAPI(data) {
  return axios.get(`/api/product/list/${data.typeId}`);
}

function* productList(action) {
  try {
    const result = yield call(productListAPI, action.data);
    yield put({
      type: PRODUCT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchProductList() {
  yield takeLatest(PRODUCT_LIST_REQUEST, productList);
}

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
export default function* productTypeSaga() {
  yield all([
    fork(watchProductList),

    //
  ]);
}
