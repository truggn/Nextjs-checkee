import { call, put, takeLatest } from "redux-saga/effects";

import { actionTypes, loadDataFailure, loadDataSuccess } from "../actions/EmployeeActions";

import getEmployee from "../../constant.config.api/api/getEmployee";

function* loadDataSaga() {
  try {
    const response = yield call(getEmployee);
    yield put(loadDataSuccess(response.data.data));
  } catch (err) {
    yield put(loadDataFailure(err));
  }
}

const sagas = [takeLatest(actionTypes.LOAD_DATA, loadDataSaga)];

export default sagas;
