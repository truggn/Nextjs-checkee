import { call, put, takeLatest, take } from "redux-saga/effects";
import {
  actionTypes,
  loadDataFailure,
  loadDataSuccess,
  addSystemUserTypePageSuccess,
  addSystemUserTypePageFailure,
  updateSystemUserTypePageSuccess,
  updateSystemUserTypePageFailure,
  deleteSystemUserTypePageSuccess,
  deleteSystemUserTypePageFailure,
  checkAccessRightSuccess,
  checkAccessRightFailure
//   getSystemUserTypePageByIdSuccess,
//   getSystemUserTypePageByIdFailure,
} from "../actions/SystemUserTypePageActions";
import getAllSystemUserTypePage from "../../constant.config.api/api/getAllSystemUserTypePage";
import addSystemUserTypePage from "../../constant.config.api/api/addSystemUserTypePage";
import updateSystemUserTypePage from "../../constant.config.api/api/updateSystemUserTypePage";
import deleteSystemUserTypePage from "../../constant.config.api/api/deleteSystemUserTypePage";
import checkAccessRight from "../../constant.config.api/api/accessRight";
// import getSystemUserTypePageById from "../../constant.config.api/api/getSystemUserTypePageById"
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";

function* loadSystemUserTypePageSaga() {
  try {
    const response = yield call(getAllSystemUserTypePage);
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

function* addSystemUserTypePageSaga(action) {
  try {
    const response = yield call(addSystemUserTypePage, action.payload);
    if (response) {
      if (response.status === 200) {
        // yield put(addSystemUserTypePageSuccess(response.data.data));
        yield put(addSystemUserTypePageSuccess(action.payload));
        yield loadSystemUserTypePageSaga();
        toast({ type: "success", message: "Tạo phân quyền thành công!" });
        NProgress.done();
      } else {
        yield put(addSystemUserTypePageFailure(response.data.errors[0].message));
        toast({ type: "error", message: response.data.errors[0].message });
        NProgress.done();
      }
    }
  } catch (err) {
    NProgress.done();
    toast({ type: "error", message: err });
    yield put(addSystemUserTypePageFailure(err));
  }
}

function* updateSystemUserTypePageSaga(action) {
  try {
    const response = yield call(updateSystemUserTypePage, action.payload);
    if (response) {
      if (response.status === 200) {
        yield put(updateSystemUserTypePageSuccess(response.data.data));
        toast({ type: "success", message: "Cập nhật thành công!" });
        NProgress.done();
      } else {
        yield put(updateSystemUserTypePageFailure(response.data.errors[0].message));
        toast({ type: "error", message: response.data.errors[0].message });
        NProgress.done();
      }
    }
  } catch (err) {
    NProgress.done();
    toast({ type: "error", message: err });
    yield put(updateSystemUserTypePageFailure(err));
  }
}

function* deleteSystemUserTypePageSaga(action) {
  try {
    const response = yield call(deleteSystemUserTypePage, action.payload);
    if (response) {
      if (response.status === 200) {
        yield put(deleteSystemUserTypePageSuccess(action.payload));
        toast({ type: "success", message: "Xóa phân quyền thành công!" });
        NProgress.done();
      } else {
        yield put(deleteSystemUserTypePageFailure(response.data.errors[0].message));
        toast({ type: "error", message: response.data.errors[0].message });
        NProgress.done();
      }
    }
  } catch (err) {
    NProgress.done();
    toast({ type: "error", message: err });
    yield put(deleteSystemUserTypePageFailure(err));
  }
}

function* checkAccessRightSaga(action) {
  try {
    for (const actionName of action.payload.actionName) {
      let params = {
        userId : action.payload.userId,
        // userId : "600edf079749ee3ea80389de",
        controllerName: action.payload.controllerName,
        actionName: actionName
      }
      const response = yield call(checkAccessRight, params);
    if (response) {
      if (response.status === 200) {
        yield put(checkAccessRightSuccess(params, true,response.data.errors[0].message));
        NProgress.done();
      } else if (response.status === 400) {
        yield put(checkAccessRightSuccess(params, false,response.data.errors[0].message));
        NProgress.done();
      }
      else {
        NProgress.done();
        yield put(checkAccessRightFailure(response.data.errors[0].message));
        // if(response.data.errors[0].message === "Cannot read property 'userTypeId' of null") {
        //   toast({ type: "error", message: "Không tìm thấy thông tin User đăng nhập!" });
        // }
      }
    }
    }
  } catch (err) {
    NProgress.done();
    toast({ type: "error", message: err });
     yield put(checkAccessRightFailure(err));
  }
}


const sagas = [
  takeLatest(actionTypes.LOAD_SYSTEMUSERTYPEPAGE, loadSystemUserTypePageSaga),
  takeLatest(actionTypes.ADD_SYSTEMUSERTYPEPAGE, addSystemUserTypePageSaga),
  takeLatest(actionTypes.UPDATE_SYSTEMUSERTYPEPAGE, updateSystemUserTypePageSaga),
  takeLatest(actionTypes.DELETE_SYSTEMUSERTYPEPAGE, deleteSystemUserTypePageSaga),
  takeLatest(actionTypes.CHECK_ACCESSRIGHT, checkAccessRightSaga),
//   takeLatest(actionTypes.GET_SYSTEMUSERTYPEPAGE_BYID, getSystemUserTypePageByIdSaga),
];

export default sagas;
