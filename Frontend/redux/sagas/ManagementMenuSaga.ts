import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  loadDataSuccess,
  loadDataFail,
  //
  deletedDataSuccess,
  deletedDataFail,
  //
  createDataSuccess,
  createDataFail,
  //
  updateDataSuccess,
  updateDataFail,
} from "../actions/MangementMenuAction";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";
//them api
import getManagementMenu from "../../constant.config.api/api/getManagementMenu";
import deletedManagementMenu from "../../constant.config.api/api/deletedManagementMenu";
import createManagementMenu from "../../constant.config.api/api/createManagementMenu";
import updateManagementMenu from "../../constant.config.api/api/updateManagementMenu";
//goi phuong thuc load
function* loadData() {
  try {
    const resposive = yield call(getManagementMenu);
    // console.log("sss", resposive);
    yield put(loadDataSuccess(resposive.data.data));
    //
  } catch (error) {
    yield put(loadDataFail(error));
  }
}
// phuong thuc xoa
function* deletedData(action) {
  try {
    const resposive = yield call(deletedManagementMenu, action.payload.id);
    if (resposive.status === 200) {
      yield put(deletedDataSuccess(resposive, action.payload.id));
      NProgress.done();
      toast({ type: "success", message: "Xóa thành công" });
    } else {
      yield put(deletedDataFail(resposive.data.errors[0].message));
      NProgress.done();
      toast({ type: "error", message: resposive.data.errors[0].message });
    }
  } catch (error) {
    yield put(deletedDataFail(error));
  }
}
//phuong thuc tao
function* createData(action) {
  try {
    const resposive = yield call(createManagementMenu, action.payload.values);
    if (resposive.status === 200) {
      yield put(createDataSuccess(resposive));
      NProgress.done();
      toast({ type: "success", message: "Tạo thành công" });
    } else {
      yield put(createDataFail(resposive.data.errors[0].message));
      NProgress.done();
      toast({ type: "error", message: resposive.data.errors[0].message });
    }
  } catch (error) {
    yield put(createDataFail(error));
  }
}
//phuong thuc sua
function* updateData(action) {
  // console.log("action", action);
  try {
    const responsive = yield call(updateManagementMenu, action.payload.values);
    console.log("res", responsive);
    if (responsive.status === 200) {
      yield put(updateDataSuccess(responsive, action.payload.values._id));
      NProgress.done();
      toast({ type: "success", message: "Cập nhật thành công" });
    } else {
      yield put(updateDataFail(responsive.data.errors[0].message));
      NProgress.done();
      toast({ type: "error", message: responsive.data.errors[0].message });
    }
  } catch (error) {
    yield put(updateDataFail(error));
    // toast({ type: "error", message: action.payload.error.message });
  }
}
//
const ManagementMenuSaga = [
  takeLatest(actionTypes.LOAD_DATA_MANAGEMENT, loadData),
  takeLatest(actionTypes.DELETED_DATA_MANAGEMENT, deletedData),
  takeLatest(actionTypes.CREATE_DATA_MANAGEMENT, createData),
  takeLatest(actionTypes.UPDATE_DATA_MANAGEMENT, updateData),
];
export default ManagementMenuSaga;
