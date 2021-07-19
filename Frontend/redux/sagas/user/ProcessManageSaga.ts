import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  loadProcessManageSuccess,
  loadProcessManageFailure,
  createProcessManageSuccess,
  createProcessManageFailure,
  //   deletedDataSuccess,
  //   deletedDataFailure,
  //   updateDataSuccess,
  //   updateDataFailure
} from "../../actions/user/ProcessManageActions";
import getProcessManage from "../../../constant.config.api/api/user/getProcessManage";
import createProcessManage from "../../../constant.config.api/api/user/createProcessManage";
// import deleteParticipant from "../../constant.config.api/api/deleteParticipant";
// import updateParticipant from "../../constant.config.api/api/updateParticipant";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";

//
function* loadDataSaga(action) {
  try {
    const res = yield call(getProcessManage, action.payload);
    yield put(loadProcessManageSuccess(res.data.data));
  } catch (error) {
    yield put(loadProcessManageFailure(error));
  }
}
//
function* createDataSaga(action) {
  try {
    const res = yield call(createProcessManage, action.payload);
    if (res.status === 200) {
      yield put(createProcessManageSuccess(res.data.data));
      NProgress.done();
      toast({ type: "success", message: "Thêm mới thành công" });
    } else {
      toast({ type: "error", message: res.response.data.errors[0].message });
    }
  } catch (error) {
    yield put(createProcessManageFailure(error));
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
  takeLatest(actionTypes.LOAD_PROCESS_MANAGEUSER, loadDataSaga),
  takeLatest(actionTypes.CREATE_PROCESS_MANAGEUSER, createDataSaga),
  //   takeLatest(actionTypes.DELETED_PARTICIPANT, deleteDataSaga),
  //   takeLatest(actionTypes.UPDATE_DATA_PARTICIPANT, updateDataSaga)
];

export default sagas;
