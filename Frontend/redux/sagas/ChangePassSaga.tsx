import { call, put, takeLatest } from "redux-saga/effects";
import { 
  actionTypes, 
  changePassSuccess, 
  changePassFailure, 
} 
  from "../actions/ChangePassActions";
import changePass from "../../constant.config.api/api/changePassword";
import changeForgotPass from "../../constant.config.api/api/changeForgotPassword";
import NProgress from 'nprogress'
import toast from "@/ShowToast/ShowToast";
import Router from 'next/router'
// Thay đổi mật khẩu
function* changePassSaga(action) {

  try {
    const response = yield call(changePass, action.payload);
    if (response.status === 200) {
      yield put(changePassSuccess(response.data.data));
      NProgress.done();
      toast({ type: "success", message: "Đổi mật khẩu thành công" });
    }
    else {
      yield put(changePassFailure(response.data.errors[0].message));
      NProgress.done();  
        toast({ type: "error", message: response.data.errors[0].message });
    }
  } catch (err) {
    yield put(changePassFailure(err));
    NProgress.done();
    toast({ type: "error", message: err });
  }
}

// Quên mật khẩu
function* changeForgotPassSaga(action) {

  try {
    const response = yield call(changeForgotPass, action.payload);
    if (response.status === 200) {
      yield put(changePassSuccess(response.data.data));
      NProgress.done();
      toast({ type: "success", message: "Reset mật khẩu thành công" });
      Router.push("/")
    }
    else {
      yield put(changePassFailure(response.data.errors[0].message));
      NProgress.done();  
        toast({ type: "error", message: response.data.errors[0].message });
    }
  } catch (err) {
    yield put(changePassFailure(err));
    NProgress.done();
    toast({ type: "error", message: err });
  }
}
const sagas = [
  takeLatest(actionTypes.CHANGE_PASSWORD, changePassSaga),
  takeLatest(actionTypes.CHANGE_FORGOT_PASSWORD, changeForgotPassSaga)
];

export default sagas;
