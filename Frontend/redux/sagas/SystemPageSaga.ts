import { call, put, takeLatest, take } from "redux-saga/effects";
import {
  actionTypes,
  loadDataFailure,
  loadDataSuccess,
  addSystemPageSuccess,
  addSystemPageFailure,
  updateSystemPageSuccess,
  updateSystemPageFailure,
  deleteSystemPageSuccess,
  deleteSystemPageFailure,
  getSystemPageByLevelSuccess,
  getSystemPageByLevelFailure,
} from "../actions/SystemPageActions";
import getAllSystemPage from "../../constant.config.api/api/getAllSystemPage";
import addSystemPage from "../../constant.config.api/api/addSystemPage";
import updateSystemPage from "../../constant.config.api/api/updateSystemPage";
import deleteSystemPage from "../../constant.config.api/api/deleteSystemPage";
import getSystemPageByLevel from "../../constant.config.api/api/getSystemPageByLevel"
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";

function* loadSystemPageSaga() {
  try {
    const response = yield call(getAllSystemPage);
    if (response) {
      if (response.status === 200) {
        yield put(loadDataSuccess(response.data.data));
        // toast({ type: "success", message: "Lấy danh sách thành công" });
        NProgress.done();
      } else {
        yield put(loadDataFailure(response.data.errors[0].message));
        NProgress.done();
      }
    }
  } catch (err) {
    NProgress.done();
    toast({ type: "error", message: err });
    yield put(loadDataFailure(err));
  }
}

function* addSystemPageSaga(action) {
  try {
    const response = yield call(addSystemPage, action.payload);
    if (response) {
      if (response.status === 200) {
        // yield put(addSystemPageSuccess(response.data.data));
        yield put(addSystemPageSuccess(action.payload));
        yield loadSystemPageSaga();
        toast({ type: "success", message: "Thêm mới thành công!" });
        NProgress.done();
      } else {
        NProgress.done();
        if(String(response.data.errors[0].message).indexOf("E11000") === 0){
          yield put(addSystemPageFailure(response.data.errors[0].message));
          toast({ type: "error", message: "Tên trang đã tồn tại!" });
        }
        else {
          yield put(addSystemPageFailure(response.data.errors[0].message));
          toast({ type: "error", message: response.data.errors[0].message });
        } 
        // yield put(addSystemPageFailure(response.data.errors[0].message));
        // toast({ type: "error", message: response.data.errors[0].message });
      }
    }
  } catch (err) {
    NProgress.done();
    toast({ type: "error", message: err });
    // yield put(addSystemPageFailure(err));
  }
}

function* updateSystemPageSaga(action) {
  try {
    const response = yield call(updateSystemPage, action.payload);
    console.log(response)
    if (response) {
      if (response.status === 200) {
        yield put(updateSystemPageSuccess(response.data.data));
        // yield loadSystemPageSaga();
        toast({ type: "success", message: "Cập nhật thành công!" });
        NProgress.done();
      } else {
        NProgress.done();
        if(String(response.data.errors[0].message).indexOf("E11000") === 0){
          yield put(addSystemPageFailure(response.data.errors[0].message));
          toast({ type: "error", message: "Tên trang đã tồn tại!" });
        }
        else {
          yield put(addSystemPageFailure(response.data.errors[0].message));
          toast({ type: "error", message: response.data.errors[0].message });
        } 
        // yield put(updateSystemPageFailure(response.data.errors[0].message));
        // toast({ type: "error", message: response.data.errors[0].message });
        // NProgress.done();
      }
    }
  } catch (err) {
    NProgress.done();
    toast({ type: "error", message: err });
    // yield put(updateSystemPageFailure(err));
  }
}

function* deleteSystemPageSaga(action) {
  try {
    const response = yield call(deleteSystemPage, action.payload);
    if (response) {
      if (response.status === 200) {
        yield put(deleteSystemPageSuccess(action.payload));
        // yield loadSystemPageSaga();
        toast({ type: "success", message: "Xóa thành công!" });
        NProgress.done();
      } else {
        yield put(deleteSystemPageFailure(response.data.errors[0].message));
        toast({ type: "error", message: response.data.errors[0].message });
        NProgress.done();
      }
    }
  } catch (err) {
    NProgress.done();
    toast({ type: "error", message: err });
    // yield put(deleteSystemPageFailure(err));
  }
}

function* getSystemPageByLevelSaga(action) {
  try {
    const response = yield call(getSystemPageByLevel, action.payload);
    if (response) {
      if (response.status === 200) {
        yield put(getSystemPageByLevelSuccess(response.data.data));
        // toast({ type: "success", message: "Xóa thành công!" });
        NProgress.done();
      } else {
        yield put(getSystemPageByLevelFailure(response.data.errors[0].message));
        toast({ type: "error", message: response.data.errors[0].message });
        NProgress.done();
      }
    }
  } catch (err) {
    NProgress.done();
    toast({ type: "error", message: err });
    // yield put(deleteSystemPageFailure(err));
  }
}

const sagas = [
  takeLatest(actionTypes.LOAD_SYSTEMPAGE, loadSystemPageSaga),
  takeLatest(actionTypes.ADD_SYSTEMPAGE, addSystemPageSaga),
  takeLatest(actionTypes.UPDATE_SYSTEMPAGE, updateSystemPageSaga),
  takeLatest(actionTypes.DELETE_SYSTEMPAGE, deleteSystemPageSaga),
  takeLatest(actionTypes.GET_SYSTEMPAGE_BYLEVEL, getSystemPageByLevelSaga),
];

export default sagas;
