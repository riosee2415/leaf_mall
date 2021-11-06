import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  //
  PRODUCT_TOP_TOGGLE_REQUEST,
  PRODUCT_TOP_TOGGLE_SUCCESS,
  PRODUCT_TOP_TOGGLE_FAILURE,
  //
  PRODUCT_THUMBNAIL_REQUEST,
  PRODUCT_THUMBNAIL_SUCCESS,
  PRODUCT_THUMBNAIL_FAILURE,
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

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productTopToggleAPI(data) {
  return axios.patch(`/api/product/update/top`, data);
}

function* productTopToggle(action) {
  try {
    const result = yield call(productTopToggleAPI, action.data);
    yield put({
      type: PRODUCT_TOP_TOGGLE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TOP_TOGGLE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productThumbnailAPI(data) {
  return axios.post(`/api/product/image`, data);
}

function* productThumbnail(action) {
  try {
    const result = yield call(productThumbnailAPI, action.data);
    yield put({
      type: PRODUCT_THUMBNAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_THUMBNAIL_FAILURE,
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

function* watchProductTopToggle() {
  yield takeLatest(PRODUCT_TOP_TOGGLE_REQUEST, productTopToggle);
}

function* watchProductThumbnail() {
  yield takeLatest(PRODUCT_THUMBNAIL_REQUEST, productThumbnail);
}

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
export default function* productTypeSaga() {
  yield all([
    fork(watchProductList),
    fork(watchProductTopToggle),
    fork(watchProductThumbnail),
    //
  ]);
}
