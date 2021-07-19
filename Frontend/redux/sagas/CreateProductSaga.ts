import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  createProductFailure,
  createProductSuccess,
  getProductSuccess,
  getProductFailure,
  updateProductSuccess,
  updateProductFailure,
  detailProductSuccess,
  detailProductFailure,
} from "../actions/CreateProductActions";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";
import createProduct from "../../constant.config.api/api/createProduct";
import getProduct from "../../constant.config.api/api/getProduct";
import updateProduct from "../../constant.config.api/api/updateConfirmProduct";
import detailProduct from "../../constant.config.api/api/getDetailProduct";
function* loadDataSaga() {
  try {
    const res = yield call(getProduct);
    yield put(getProductSuccess(res.data.data));
  } catch (error) {
    yield put(getProductFailure(error));
  }
}

function* createDataSaga(action) {
  try {
    const response = yield call(createProduct, action.payload);
    if (response.status === 200) {
      yield put(createProductSuccess(response.data.data));
      yield loadDataSaga();
      NProgress.done();
      toast({ type: "success", message: "Tạo thành công" });
    } else {
      toast({ type: "error", message: response.data.errors[0].message });
    }
  } catch (err) {
    yield put(createProductFailure(err));
    NProgress.done();
    toast({ type: "error", message: err });
  }
}

function* updateDataSaga(action) {
  try {
    const res = yield call(updateProduct, action.payload);
    if (res.status === 200) {
      yield put(updateProductSuccess(res.data.data));
      //yield loadDataSaga();
      NProgress.done();
      toast({ type: "success", message: "Duyệt thành công" });
    } else {
      toast({ type: "error", message: res.data.errors[0].message });
    }
  } catch (error) {
    yield put(updateProductFailure(error));
  }
}

function* detailDataSaga(action) {
  try {
    const res = yield call(detailProduct, action.payload.id);
    if (res.data) {
      yield put(detailProductSuccess(res.data));
      NProgress.done();
    } else {
      yield put(detailProductFailure(res));
    }
  } catch (error) {
    yield put(detailProductFailure(error));
  }
}
const sagas = [
  takeLatest(actionTypes.CREATE_PRODUCT, createDataSaga),
  takeLatest(actionTypes.GET_PRODUCT, loadDataSaga),
  takeLatest(actionTypes.UPDATE_PRODUCT, updateDataSaga),
  takeLatest(actionTypes.DETAIL_PRODUCT, detailDataSaga),
];

export default sagas;
