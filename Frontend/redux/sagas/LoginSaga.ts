import { call, put, takeLatest } from "redux-saga/effects";
import { actionTypes, loginSuccess, loginFailure, updateUserSuccess, updateUserFailure } from "../actions/LoginActions";
import login from "../../constant.config.api/api/login";
import updateUser from "../../constant.config.api/api/updateUser";
import getUserLogin from "../../constant.config.api/api/getUserLogin";
import NProgress from 'nprogress'
import toast from "@/ShowToast/ShowToast";
import Router from 'next/router'

// Đăng nhập
function* loginSaga(action) {
  try {
    const response = yield call(login, action.payload);
    if (response.status === 200) {
      const getdata = yield call(getUserLogin);
      yield put(loginSuccess(response.data.data, getdata.data.data, true));
      Router.push('/homepage')
      NProgress.done();  
      toast({ type: "success", message: "Đăng nhập thành công" });
    }
    else {
      yield put(loginFailure(response.data.errors[0].message));
      NProgress.done();     
        toast({ type: "error", message: response.data.errors[0].message });
    }
  } catch (err) {
    yield put(loginFailure(err));
    NProgress.done();
    toast({ type: "error", message: err });
  }
}

// Cập nhật thông tin user
function* updateUserSaga(action) {
  try {
    const response = yield call(updateUser, action.payload);
    if (response.status === 200) {
      yield put(updateUserSuccess(response.data.data));
      NProgress.done();  
      toast({ type: "success", message: "Cập nhật thành công" });
    }
    else {
      yield put(updateUserFailure(response.data.errors[0].message));
      NProgress.done();     
        toast({ type: "error", message: response.data.errors[0].message });
    }
  } catch (err) {
    yield put(loginFailure(err));
    NProgress.done();
    toast({ type: "error", message: err });
  }
}

const sagas = [
  takeLatest(actionTypes.LOGIN, loginSaga),
  takeLatest(actionTypes.UPDATE_USER, updateUserSaga)
];

export default sagas;
