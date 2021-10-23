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

//////////////////////////////////////////////////////////////

function* watchProductType() {
  yield takeLatest(PRODUCT_TYPE_REQUEST, productType);
}

function* watchProductTypeCreate() {
  yield takeLatest(PRODUCT_TYPE_CREATE_REQUEST, productTypeCreate);
}

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
export default function* productTypeSaga() {
  yield all([
    fork(watchProductType),
    fork(watchProductTypeCreate),
    //
  ]);
}
