import { call, put, takeLatest } from "@redux-saga/core/effects";
import {
  actionTypes,
  loadDataProductWithoutProcessSuccess,
  loadDataProductWithoutProcessFailed,
  addDataProductWithoutProcessSuccess,
  addDataProductWithoutProcessFailed,
} from "../actions/ProductTypeWithoutProcessActions";
import getProductTypeWithoutProcess from "../../constant.config.api/api/getProductTypeWithoutProcess";
import addataProductWithoutProcess from "../../constant.config.api/api/addProductTypeWithoutProcess";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";

//get
function* loadDataProductWithoutProcess(action) {
  try {
    const resultData = yield call(getProductTypeWithoutProcess);
    yield put(loadDataProductWithoutProcessSuccess(resultData.data));
    NProgress.done();
  } catch (error) {
    yield put(loadDataProductWithoutProcessFailed(error));
    NProgress.done();
  }
}
//add
function* addDataProductWithoutProcess(action) {
  try {
    const resultData = yield call(
      addataProductWithoutProcess,
      action.payload.id,
      action.payload.values
    );
    yield put(addDataProductWithoutProcessSuccess(action.payload.values));
    NProgress.done();
    toast({
      type: "success",
      message: "Thêm sản phẩm vào quy trình thành công ",
    });
  } catch (error) {
    yield put(addDataProductWithoutProcessFailed(error));
    toast({ type: "error", message: "Thêm sản phẩm vào quy trình thất bại " });
  }
}
//saga
const sagas = [
  takeLatest(
    actionTypes.LOAD_PRODUCT_WITHOUT_PROCESS,
    loadDataProductWithoutProcess
  ),
  takeLatest(
    actionTypes.ADD_PRODUCT_WITHOUT_PROCESS,
    addDataProductWithoutProcess
  ),
];

export default sagas;
