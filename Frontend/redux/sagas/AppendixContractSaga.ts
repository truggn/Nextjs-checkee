import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  getAppendixContractSuccess,
  getAppendixContractFailure,
  //
  createAppendixContractSuccess,
  createAppendixContractFailure,
  //
  updateAppendixContractSuccess,
  updateAppendixContractFailure,
  //
  deleteAppendixContractSuccess,
  deleteAppendixContractFailure,
} from "../actions/AppendixContractActions";
import getAppendixContract from "../../constant.config.api/api/getAllAppendixContract";
import createAppendixContract from "../../constant.config.api/api/createAppendixContract";
import updateAppendixContract from "../../constant.config.api/api/updateAppendixContract";
import deletedAppendixContract from "../../constant.config.api/api/deleteAppendixContract";
import toast from "@/ShowToast/ShowToast";

import NProgress from "nprogress";

export function* getAppendixContractProcess() {
  try {
    const response = yield call(getAppendixContract);
    yield put(getAppendixContractSuccess(response.data.data));
  } catch (err) {
    yield put(getAppendixContractFailure(err));
  }
}

export function* createAppendixContractProcess(action) {
  try {
    const response = yield call(createAppendixContract, action.payload);
    yield put(createAppendixContractSuccess(response));
    NProgress.done();
    toast({ type: "success", message: "Tạo mới đối tác thành công" });
  } catch (err) {
    yield put(createAppendixContractFailure(err));
    toast({ type: "error", message: "Có gì đó sai sai" });
  }
}

export function* updateAppendixContractProcess(action) {
  try {
    const response = yield call(updateAppendixContract, action.payload);
    yield put(updateAppendixContractSuccess(response.data.data));
    NProgress.done();
    toast({ type: "success", message: "Cập nhật đối tác thành công" });
  } catch (err) {
    yield put(updateAppendixContractFailure(err));
    toast({ type: "error", message: "Có gì đó sai sai" });
  }
}

export function* deleteAppendixContractProcess(action) {
  try {
    const response = yield call(deletedAppendixContract, action.payload.id);
    yield put(deleteAppendixContractSuccess(response, action.payload.id));
    NProgress.done();
    toast({ type: "success", message: "Xóa đối tác thành công" });
  } catch (err) {
    yield put(deleteAppendixContractFailure(err));
    toast({ type: "error", message: "Có gì đó sai sai" });
  }
}
/////-------------------------------------------------------
export function* onGetAppendixContractStart() {
  yield takeLatest(
    actionTypes.GET_APPENDIX_CONTRACT_START,
    getAppendixContractProcess
  );
}

export function* onCreateAppendixContractStart() {
  yield takeLatest(
    actionTypes.CREATE_APPENDIX_CONTRACT_START,
    createAppendixContractProcess
  );
}

export function* onUpdateAppendixContractStart() {
  yield takeLatest(
    actionTypes.UPDATE_APPENDIX_CONTRACT_START,
    updateAppendixContractProcess
  );
}

export function* onDeleteAppendixContractStart() {
  yield takeLatest(
    actionTypes.DELETE_APPENDIX_CONTRACT_START,
    deleteAppendixContractProcess
  );
}

const sagas = [
  call(onGetAppendixContractStart),
  call(onCreateAppendixContractStart),
  call(onUpdateAppendixContractStart),
  call(onDeleteAppendixContractStart),
];

export default sagas;
