import { call, put, takeLatest } from "redux-saga/effects";
import { actionTypes, addSignUpSuccess, addSignUpFailure } from "../actions/SignUpActions";
import addSignUp from "../../constant.config.api/api/addSignUp";
import NProgress from 'nprogress'
import toast from "@/ShowToast/ShowToast";
import Router from 'next/router'

function* addSignUpSaga(action) {

  try {
    const response = yield call(addSignUp, action.payload);
    if (response.status === 200) {
      yield put(addSignUpSuccess(response.data.data, true));
      Router.push("/")
      NProgress.done();
      toast({ type: "success", message: "Đăng ký thành công" });
    }
    else {
      yield put(addSignUpFailure(response.data.errors[0].message));
      NProgress.done();
      if (response.data.errors[0].code === "err002")
        toast({ type: "error", message: "Tài khoản email đã tồn tại" });
      else if (response.data.errors[0].code === "err001") {
        toast({ type: "error", message: "Mật khẩu phải chứa cả ký tự chữ và số" });
      }
    }
  } catch (err) {
    yield put(addSignUpFailure(err));
    NProgress.done();
    toast({ type: "error", message: err });
  }
}

const sagas = [takeLatest(actionTypes.ADD_SIGNUP, addSignUpSaga)];

export default sagas;
