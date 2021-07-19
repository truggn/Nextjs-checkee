import { call, put, takeLatest } from "redux-saga/effects";
import { actionTypes, forgotPassSuccess, forgotPassFailure } from "../actions/ForgotPassActions";
import forgotPass from "../../constant.config.api/api/forgotPassword";
import NProgress from 'nprogress'
import toast from "@/ShowToast/ShowToast";
import Router from 'next/router'

function* forgotPassSaga(action) {

  try {
    const response = yield call(forgotPass, action.payload);
    if (response.status === 200) {
      yield put(forgotPassSuccess(response.data.data, true));
      NProgress.done();
      toast({ type: "success", message: "Vui lòng kiểm tra email" });
    }
    else {
      yield put(forgotPassFailure(response.data.errors[0].message));
      NProgress.done();
      if (response.data.errors[0].code === "ERROR-000001")
        toast({ type: "error", message: "Không tìm thấy email" });
      else if (response.data.errors[0].code === "ERROR-000002") {
        toast({ type: "error", message: "Không tạo được mật khẩu" });
      }
    }
  } catch (err) {
    yield put(forgotPassFailure(err));
    NProgress.done();
    toast({ type: "error", message: err });
  }
}

const sagas = [takeLatest(actionTypes.FORGOT_PASSWORD, forgotPassSaga)];

export default sagas;
