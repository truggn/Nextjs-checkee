import { call, put, takeLatest } from "redux-saga/effects";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";
import {
  actionTypes,
  loadSettingParticipantFailure,
  loadSettingParticipantSuccess,
  createSettingParticipantSuccess,
  createSettingParticipantFailure,
  loadSettingPropsSuccess,
  loadSettingPropsFailure,
  createSettingPropsSuccess,
  createSettingPropsFailure
} from "../actions/SettingProcessAction";
//api

import createSettingProcessOfProduct from "../../constant.config.api/api/createColumnProcessManage";
import getSettingProcessColumn from "../../constant.config.api/api/getSettingProcessColumn";
import getSettingProcessProps from "../../constant.config.api/api/getSettingProcessProps";
import createSettingProcessProps from "../../constant.config.api/api/createSettingProcessProps";
// CREATE SETTING PARTICIPANT
function* createSettingParticipant(action) {
  try {
    const res = yield call(createSettingProcessOfProduct, action.payload);
    if (res.status === 200) {
      yield put(createSettingParticipantSuccess(res.data.data));
      NProgress.done()
      toast({ type: "success", message: "Thêm mới thành công" });
    }
    else {
      toast({ type: "error", message: res.data.errors[0].message });
    }
  } catch (error) {
    yield put(createSettingParticipantFailure(error));
  }
}
// LOAD SETTING PARTICIPANT
function* loadSettingParticipant(action) {
  try {
    const data = yield call(getSettingProcessColumn, action.payload.id);
    yield put(loadSettingParticipantSuccess(data.data.data));
  } catch (error) {
    yield put(loadSettingParticipantFailure(error));
  }
}
// LOAD SETTING PROPS
function* loadSettingProps(action) {
  try {
    const data = yield call(getSettingProcessProps, action.payload.id);
    yield put(loadSettingPropsSuccess(data.data.data, action.payload.id));
  } catch (error) {
    yield put(loadSettingPropsFailure(error));
  }
}
// CREATE SETTING PROPS
function* createSettingProps(action) {
  try {
    const res = yield call(createSettingProcessProps, action.payload.values);
    if (res.status === 200) {
      yield put(createSettingPropsSuccess(res.data.data));
      NProgress.done()
      toast({ type: "success", message: "Thêm mới thành công" });
    }
    else {
      toast({ type: "error", message: res.data.errors[0].message });
    }
  } catch (error) {
    yield put(createSettingPropsFailure(error));
  }
}
const SettingProcessOfProductSaga = [
  takeLatest(
    actionTypes.CREATE_SETTING_PROCESS_PARTICIPANT,
    createSettingParticipant
  ),
  takeLatest(
    actionTypes.LOAD_SETTING_PROCESS_PARTICIPANT,
    loadSettingParticipant
  ),
  takeLatest(
    actionTypes.LOAD_SETTING_PROCESS_PROPS,
    loadSettingProps
  ),
  takeLatest(
    actionTypes.CREATE_SETTING_PROCESS_PROPS,
    createSettingProps
  ),
];

export default SettingProcessOfProductSaga;
