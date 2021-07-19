import { call, put, takeLatest } from "redux-saga/effects";
import { actionTypes, logoutSuccess, logoutFailure } from "../actions/LogoutActions";
import logout from "../../constant.config.api/api/logout";
import NProgress from 'nprogress'
import toast from "@/ShowToast/ShowToast";
import Router from 'next/router'

function* logoutSaga() {

  try {
    const response = yield call(logout);
    if (response.status === 200) {
      yield put(logoutSuccess(response.data.data, true));
      NProgress.done();
      toast({ type: "success", message: "Đăng xuất thành công" });
      Router.push("/")
    }
    else {
      yield put(logoutFailure(response.data.errors[0].message));
      NProgress.done();
      toast({ type: "error", message: "Đăng xuất thất bại" });
    }
  } catch (err) {
    yield put(logoutFailure(err));
    NProgress.done();
    toast({ type: "error", message: err });
  }
}

const sagas = [takeLatest(actionTypes.LOGOUT, logoutSaga)];

export default sagas;
