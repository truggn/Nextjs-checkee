import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  createProcessOfProductSuccess,
  createProcessOfProductFail,
  updateProcessOfProductSuccess,
  updateProcessOfProductFail
} from "../actions/ProcessOfProductAction";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";
//import api
import createProcessOfProduct from "../../constant.config.api/api/createProcessOfProduct";
import updateProcessOfProduct from "../../constant.config.api/api/updateProcessOfProduct";
//
function* createDataProcessOfProduct(action) {
  try {
    let result = yield call(createProcessOfProduct, action.payload);
    if (result.status === 200) {
      yield put(createProcessOfProductSuccess(result));
      NProgress.done();
      toast({ type: "success", message: "Lưu thành công" });
    }
  } catch (error) {
    yield put(createProcessOfProductFail(error));
  }
}
//update
function* updateProcessProductSaga(action) {
  try {
    const res = yield call(updateProcessOfProduct, action.payload.values);
    if (res.status === 200) {
      yield put(updateProcessOfProductSuccess([]));
      NProgress.done()
      toast({ type: "success", message: "Cập nhật thành công" });
    }
    else {
      toast({ type: "error", message: "Cập nhật không thành công" });
    }
  } catch (error) {
    yield put(updateProcessOfProductFail(error));
  }
}

const ProcessofProductSaga = [
  takeLatest(
    actionTypes.CREATE_DATA_PROCESSOFPRODUCT,
    createDataProcessOfProduct
  ),
  takeLatest(actionTypes.UPDATE_PROCESSOFPRODUCT, updateProcessProductSaga)
];
export default ProcessofProductSaga;
