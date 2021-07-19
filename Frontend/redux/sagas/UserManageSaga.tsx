import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  loadUserManageSuccess,
  loadUserManageFailure,
  createUserManageSuccess,
  createUserManageFailure
//   deletedDataSuccess,
//   deletedDataFailure,
//   updateDataSuccess,
//   updateDataFailure
} from "../actions/UserManageActions";
import getUserManage from "../../constant.config.api/api/getUserManage";
import createUserManage from "../../constant.config.api/api/createUserManage";
// import deleteParticipant from "../../constant.config.api/api/deleteParticipant";
// import updateParticipant from "../../constant.config.api/api/updateParticipant";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";

//
function* loadDataSaga(action) {
  try {
    const res = yield call(getUserManage, action.payload.value);
    yield put(loadUserManageSuccess(res.data.data));

  } catch (error) {
    yield put(loadUserManageFailure(error));
  }
}
//
function* createDataSaga(action) {
  try {
    const res = yield call(createUserManage, action.payload);
    if(res.status === 200){
      //yield put(createUserManageSuccess(res.data.data));
      NProgress.done()
      toast({ type: "success", message: "Thêm mới thành công" });
      yield loadDataSaga(action.payload.organizationId);
    }
    else {
      toast({ type: "error", message: res.response.data.errors[0].message });
    }
  } catch (error) {
    yield put(createUserManageFailure(error));
  }
}
// //
// function* deleteDataSaga(action) {
//   try {
//     const res = yield call(deleteParticipant, action.payload.id);
//     if(res.status === 200) {
//       yield put(deletedDataSuccess(res.data.data, action.payload));
//       NProgress.done()
//       toast({ type: "success", message: "Xóa thành công" });
//     }
//     else {
//       toast({ type: "error", message: res.data.errors[0].message });
//     }
//   } catch (error) {
//     yield put(deletedDataFailure(error));
//   }
// }
// //
// function* updateDataSaga(action) {
//   try {
//     const res = yield call(updateParticipant, action.payload.values);
//     if(res.status === 200) {
//       yield put(updateDataSuccess(res.data.data, action.payload));
//       NProgress.done()
//       toast({ type: "success", message: "Cập nhật thành công" });
//     }
//     else {
//       toast({ type: "error", message: res.data.errors[0].message });
//     }
//   } catch (error) {
//     yield put(updateDataFailure(error));
//   }
// }
const sagas = [
  takeLatest(actionTypes.LOAD_USER_MANAGE, loadDataSaga),
  takeLatest(actionTypes.CREATE_USER_MANAGE, createDataSaga),
//   takeLatest(actionTypes.DELETED_PARTICIPANT, deleteDataSaga),
//   takeLatest(actionTypes.UPDATE_DATA_PARTICIPANT, updateDataSaga)
 ];

export default sagas;
