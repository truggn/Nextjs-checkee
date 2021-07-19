import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  loadDataSuccess,
  loadDataFailure,
  //
  deletedUser,
  deletedUserSuccess,
  deletedUserFailure,
  //
  createDataSuccess,
  createDataFail,
  //
  updateDataSuccess,
  updateDataFail,
  //
  updateStatusSuccess,
  updateStatusFail,
  //
  updateStatusNoActiveSuccess,
  updateStatusNoActiveFail,
} from "../actions/ListUserActions";
import getListUser from "../../constant.config.api/api/getListUser";
import deleteduser from "../../constant.config.api/api/deleteduser";
import createUser from "../../constant.config.api/api/createUser";
import updateUser from "../../constant.config.api/api/updateUser";
import updataeStatusActive from "../../constant.config.api/api/updateStatusUserActive";
import updataeStatusNoActive from "../../constant.config.api/api/updateStatusUserNoActive";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";
// import { Close } from "../../components/ListUser/AddUser";

//
function* loadDataSa() {
  try {
    const resposive = yield call(getListUser);
    yield put(loadDataSuccess(resposive.data.data));
    //
  } catch (error) {
    yield put(loadDataFailure(error));
  }
}
//phuong thuc deleted
function* deletedSaga(action) {
  try {
    const newData = yield call(deleteduser, action.payload.id);
    if (newData.status === 200) {
      yield put(deletedUserSuccess(newData, action.payload.id));
      NProgress.done();
      toast({ type: "success", message: "Xóa thành công" });
    } else {
      yield put(deletedUserFailure(newData.data.errors[0].message));
      NProgress.done();
      toast({ type: "error", message: newData.data.errors[0].message });
    }
  } catch (error) {}
}
//phuong thức create
function* createSaga(action) {
  try {
    const newData = yield call(createUser, action.payload);
    // console.log("new:ss", newData.response);
    if (newData.status === 200) {
      yield put(createDataSuccess(newData));
      NProgress.done();
      // Close(true);
      toast({ type: "success", message: "Tạo thành công" });
    } else {
      if (newData.response.data.errors[0].code === "err002") {
        NProgress.done();
        toast({ type: "error", message: "Đã tồn tại email" });
      }
      if (newData.response.data.errors[0].code === "err001") {
        NProgress.done();
        toast({
          type: "error",
          message: "Mật khẩu phải dài 6-24 ký tự, bao gồm cả chữ cái và chữ số",
        });
      }
      yield put(createDataFail(newData.response.data.errors[0].code));
    }
  } catch (error) {}
}
//phuong thức update
function* updateSaga(action) {
  // console.log("action", action);
  try {
    const newUpdate = yield call(updateUser, action.payload.values);
    // console.log("newupdate", newUpdate);
    if (newUpdate.status === 200) {
      yield put(updateDataSuccess(newUpdate, action.payload.values._id));
      NProgress.done();
      toast({ type: "success", message: "Cập nhật thành công" });
    } else {
      yield put(createDataFail(newUpdate.data.errors[0].message));
      NProgress.done();
      toast({ type: "error", message: newUpdate.data.errors[0].message });
    }
  } catch (error) {}
}
//
function* updateStatusSaga(action) {
  console.log("action", action);
  try {
    const newUpdate = yield call(updataeStatusActive, action.payload.values);
    console.log("newupdate", newUpdate);
    if (newUpdate.status === 200) {
      yield put(updateStatusSuccess(newUpdate, action.payload.values._id));
      NProgress.done();
      toast({ type: "success", message: "Cập nhật trạng thái thành công" });
    } else {
      yield put(updateStatusFail(newUpdate.data.errors[0].message));
      NProgress.done();
      toast({ type: "error", message: "Không cập nhật được trạng thái" });
    }
  } catch (error) {}
}
//
function* updateStatusNoActiveSaga(action) {
  console.log("action", action);
  try {
    const newUpdate = yield call(updataeStatusNoActive, action.payload.values);
    console.log("newupdate", newUpdate);
    if (newUpdate.status === 200) {
      yield put(
        updateStatusNoActiveSuccess(newUpdate, action.payload.values._id)
      );
      NProgress.done();
      toast({ type: "success", message: "Cập nhật trạng thái thành công" });
    } else {
      yield put(updateStatusNoActiveFail(newUpdate.data.errors[0].message));
      NProgress.done();
      toast({ type: "error", message: "Không cập nhật được trạng thái" });
    }
  } catch (error) {}
}
//
const ListUserSaga = [
  takeLatest(actionTypes.LOAD_DATA_USER, loadDataSa),
  takeLatest(actionTypes.DELETED_USER, deletedSaga),
  takeLatest(actionTypes.CREATE_DATA_USER, createSaga),
  takeLatest(actionTypes.UPDATE_DATA_USER, updateSaga),
  takeLatest(actionTypes.UPDATE_STATUS_USER, updateStatusSaga),
  takeLatest(actionTypes.UPDATE_NO_STATUS_USER, updateStatusNoActiveSaga),
];

export default ListUserSaga;
