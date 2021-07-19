import { call, put, takeLatest } from "@redux-saga/core/effects";
import {
  actionTypes,
  loadDataProductForProcessSuccess,
  loadDataProductForProcessFailed,
} from "../actions/ProductTypeForProcessActions";
import getProductTypeForProcess from "../../constant.config.api/api/getProductTypeForProcess";
import NProgress from "nprogress";

function* loadDataProductForProcess(action) {
  try {
    const resultData = yield call(getProductTypeForProcess, action.payload);
    yield put(loadDataProductForProcessSuccess(resultData.data));
    NProgress.done();
  } catch (error) {
    yield put(loadDataProductForProcessFailed(error));
    NProgress.done();
  }
}

const sagas = [
  takeLatest(actionTypes.LOAD_PRODUCT_FOR_PROCESS, loadDataProductForProcess),
];

export default sagas;
