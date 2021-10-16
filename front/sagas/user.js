import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
// function loadMyInfoAPI(data) {
//     return axios.get("/api/user/signin", data);
//   }

//   function* loadMyInfo(action) {
//     try {
//       const result = yield call(loadMyInfoAPI, action.data);
//       yield put({
//         type: LOAD_MY_INFO_SUCCESS,
//         data: result.data,
//       });
//     } catch (err) {
//       console.error(err);
//       yield put({
//         type: LOAD_MY_INFO_FAILURE,
//         error: err.response.data,
//       });
//     }
//   }

// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

// function* watchLoadMyInfo() {
//   yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
// }

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
export default function* userSaga() {
  yield all([
    //
  ]);
}
