import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  loadDataSuccess,
  loadDataFailure,
  createDataSuccess,
  createDataFailure,
  deletedDataSuccess,
  deletedDataFailure,
  updateDataSuccess,
  updateDataFailure
} from "../../actions/user/ParticipantActions";
import getParticipant from "../../../constant.config.api/api/user/getParticipant";
import addParticipant from "../../../constant.config.api/api/addParticipant";
import deleteParticipant from "../../../constant.config.api/api/deleteParticipant";
import updateParticipant from "../../../constant.config.api/api/updateParticipant";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";

//
function* loadDataSaga(action) {
  try {
    const organizationId = action.payload;
    const res = yield call(getParticipant,organizationId);
    yield put(loadDataSuccess(res.data.data));

  } catch (error) {
    yield put(loadDataFailure(error));
  }
}
//
function* createDataSaga(action) {
  try {
    const res = yield call(addParticipant, action.payload);
    if(res.status === 200){
      yield put(createDataSuccess(res.data.data));
      NProgress.done()
      toast({ type: "success", message: "Thêm mới thành công" });
    }
    else {
      toast({ type: "error", message: res.data.errors[0].message });
    }
  } catch (error) {
    yield put(createDataFailure(error));
  }
}
//
function* deleteDataSaga(action) {
  try {
    const res = yield call(deleteParticipant, action.payload.id);
    if(res.status === 200) {
      yield put(deletedDataSuccess(res.data.data, action.payload));
      NProgress.done()
      toast({ type: "success", message: "Xóa thành công" });
    }
    else {
      toast({ type: "error", message: res.data.errors[0].message });
    }
  } catch (error) {
    yield put(deletedDataFailure(error));
  }
}
//
function* updateDataSaga(action) {
  try {
    const res = yield call(updateParticipant, action.payload.values);
    if(res.status === 200) {
      yield put(updateDataSuccess(res.data.data, action.payload));
      NProgress.done()
      toast({ type: "success", message: "Cập nhật thành công" });
    }
    else {
      toast({ type: "error", message: res.data.errors[0].message });
    }
  } catch (error) {
    yield put(updateDataFailure(error));
  }
}
const sagas = [
  takeLatest(actionTypes.LOAD_DATA_PARTICIPANT_USER, loadDataSaga),
  takeLatest(actionTypes.CREATE_DATA_PARTICIPANT_USER, createDataSaga),
  takeLatest(actionTypes.DELETED_PARTICIPANT_USER, deleteDataSaga),
  takeLatest(actionTypes.UPDATE_DATA_PARTICIPANT_USER, updateDataSaga)
];

export default sagas;
