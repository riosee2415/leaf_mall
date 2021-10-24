import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  PRODUCT_TYPE_REQUEST,
  PRODUCT_TYPE_SUCCESS,
  PRODUCT_TYPE_FAILURE,
  //
  PRODUCT_TYPE_CREATE_REQUEST,
  PRODUCT_TYPE_CREATE_SUCCESS,
  PRODUCT_TYPE_CREATE_FAILURE,
  //
  PRODUCT_TYPE_DELETE_REQUEST,
  PRODUCT_TYPE_DELETE_SUCCESS,
  PRODUCT_TYPE_DELETE_FAILURE,
  //
  PRODUCT_TYPE_UPDATE_REQUEST,
  PRODUCT_TYPE_UPDATE_SUCCESS,
  PRODUCT_TYPE_UPDATE_FAILURE,
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

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productTypeCreateAPI(data) {
  return axios.post("/api/productType/create", data);
}

function* productTypeCreate(action) {
  try {
    const result = yield call(productTypeCreateAPI, action.data);
    yield put({
      type: PRODUCT_TYPE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TYPE_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productTypeDeleteAPI(data) {
  return axios.patch("/api/productType/delete", data);
}

function* productTypeDelete(action) {
  try {
    const result = yield call(productTypeDeleteAPI, action.data);
    yield put({
      type: PRODUCT_TYPE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TYPE_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productTypeUpdateAPI(data) {
  return axios.patch("/api/productType/update", data);
}

function* productTypeUpdate(action) {
  try {
    const result = yield call(productTypeUpdateAPI, action.data);
    yield put({
      type: PRODUCT_TYPE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TYPE_UPDATE_FAILURE,
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

function* watchProductTypeCreate() {
  yield takeLatest(PRODUCT_TYPE_CREATE_REQUEST, productTypeCreate);
}

function* watchProductTypeDelete() {
  yield takeLatest(PRODUCT_TYPE_DELETE_REQUEST, productTypeDelete);
}

function* watchProductTypeUpdate() {
  yield takeLatest(PRODUCT_TYPE_UPDATE_REQUEST, productTypeUpdate);
}

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
export default function* productTypeSaga() {
  yield all([
    fork(watchProductType),
    fork(watchProductTypeCreate),
    fork(watchProductTypeDelete),
    fork(watchProductTypeUpdate),
    //
  ]);
}
