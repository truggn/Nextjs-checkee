import { call, put, takeLatest, take } from "redux-saga/effects";
import {
  actionTypes,
  loadDataFailure,
  loadDataSuccess,
  addUserTypeSuccess,
  addUserTypeFailure,
  updateUserTypeSuccess,
  updateUserTypeFailure,
  deleteUserTypeSuccess,
  deleteUserTypeFailure,
  getUserTypeByIdSuccess,
  getUserTypeByIdFailure,
} from "../actions/UserTypeActions";
import getAllUserType from "../../constant.config.api/api/getAllUserType";
import addUserType from "../../constant.config.api/api/addUserType";
import updateUserType from "../../constant.config.api/api/updateUserType";
import deleteUserType from "../../constant.config.api/api/deleteUserType";
import getUserTypeById from "../../constant.config.api/api/getUserTypeById"
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";

function* loadUserTypeSaga() {
  try {
    const response = yield call(getAllUserType);
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

function* addUserTypeSaga(action) {
  try {
    const response = yield call(addUserType, action.payload);
    if (response) {
      if (response.status === 200) {
        yield put(addUserTypeSuccess(response.data.data[0]));
        // console.log("response",response)
        // yield put(addUserTypeSuccess(action.payload));
        // yield loadUserTypeSaga();
        toast({ type: "success", message: "Thêm mới thành công!" });
        NProgress.done();
      } else {
        NProgress.done();
        if(String(response.data.errors[0].message).indexOf("E11000") === 0){
          yield put(addUserTypeFailure(response.data.errors[0].message));
          toast({ type: "error", message: "Loại người dùng đã tồn tại!" });
        }
        else {
          yield put(addUserTypeFailure(response.data.errors[0].message));
          toast({ type: "error", message: response.data.errors[0].message });
        } 
      }
    }
  } catch (err) {
    NProgress.done();
    toast({ type: "error", message: err });
    // yield put(addUserTypeFailure(err));
  }
}

function* updateUserTypeSaga(action) {
  try {
    const response = yield call(updateUserType, action.payload);
    if (response) {
      if (response.status === 200) {
        yield put(updateUserTypeSuccess(response.data.data));
        // yield loadUserTypeSaga();
        toast({ type: "success", message: "Cập nhật thành công!" });
        NProgress.done();
      } else {
        NProgress.done();
        if(String(response.data.errors[0].message).indexOf("E11000") === 0){
          yield put(addUserTypeFailure(response.data.errors[0].message));
          toast({ type: "error", message: "Loại người dùng đã tồn tại!" });
        }
        else {
          yield put(addUserTypeFailure(response.data.errors[0].message));
          toast({ type: "error", message: response.data.errors[0].message });
        } 
      }
    }
  } catch (err) {
    NProgress.done();
    toast({ type: "error", message: err });
    // yield put(updateUserTypeFailure(err));
  }
}

function* deleteUserTypeSaga(action) {
  try {
    const response = yield call(deleteUserType, action.payload);
    if (response) {
      if (response.status === 200) {
        yield put(deleteUserTypeSuccess(action.payload));
        // yield loadUserTypeSaga();
        toast({ type: "success", message: "Xóa thành công!" });
        NProgress.done();
      } else {
        yield put(deleteUserTypeFailure(response.data.errors[0].message));
        toast({ type: "error", message: response.data.errors[0].message });
        NProgress.done();
      }
    }
  } catch (err) {
    NProgress.done();
    toast({ type: "error", message: err });
    // yield put(deleteUserTypeFailure(err));
  }
}

function* getUserTypeByIdSaga(action) {
  try {
    const response = yield call(getUserTypeById, action.payload);
    if (response) {
      if (response.status === 200) {
        yield put(getUserTypeByIdSuccess(response.data.data));
        // toast({ type: "success", message: "Xóa thành công!" });
        NProgress.done();
      } else {
        yield put(getUserTypeByIdFailure(response.data.errors[0].message));
        toast({ type: "error", message: response.data.errors[0].message });
        NProgress.done();
      }
    }
  } catch (err) {
    NProgress.done();
    toast({ type: "error", message: err });
    // yield put(deleteUserTypeFailure(err));
  }
}

const sagas = [
  takeLatest(actionTypes.LOAD_USERTYPE, loadUserTypeSaga),
  takeLatest(actionTypes.ADD_USERTYPE, addUserTypeSaga),
  takeLatest(actionTypes.UPDATE_USERTYPE, updateUserTypeSaga),
  takeLatest(actionTypes.DELETE_USERTYPE, deleteUserTypeSaga),
  takeLatest(actionTypes.GET_USERTYPE_BYID, getUserTypeByIdSaga),
];

export default sagas;
