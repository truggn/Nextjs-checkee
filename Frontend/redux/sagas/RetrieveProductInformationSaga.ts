import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  loadDataProductSuccess,
  loadDataProductFail,
  loadReviewProductSuccess,
  addReviewProductSuccess,
  addReviewProductFailed,
  loadReviewProductFailed,
} from "../actions/RetrieveProductInformationActions";

import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";

import retrieveProductAPI from "../../constant.config.api/api/retrieveProductInformation";
import getReviewIPA from "../../constant.config.api/api/getReviewProduct";
import addReviewIPA from "../../constant.config.api/api/addReviewProduct";

//load product
function* loadDataProduct(action) {
  try {
    const productData = yield call(retrieveProductAPI, action.payload.value);
    if (productData.data.data) {
      yield put(loadDataProductSuccess(productData.data.data));
      NProgress.done();
      toast({ type: "success", message: "Truy xuất sản phẩm thành công " });
    } else {
      yield put(loadDataProductFail(productData.data.data));
      toast({ type: "error", message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    yield put(loadDataProductFail(error));
    toast({ type: "error", message: "Không tìm thấy sản phẩm" });
  }
}
//load review
function* loadReviewProduct(action) {
  try {
    const reviewData = yield call(getReviewIPA, action.payload.data);
    yield put(loadReviewProductSuccess(reviewData.data));
  } catch (error) {
    yield put(loadReviewProductFailed(error));
  }
}

//add reivew
function* addReviewProduct(action) {
  try {
    const dataRes = yield call(addReviewIPA, action.payload.data);
    yield put(addReviewProductSuccess(dataRes.data.data));
    toast({ type: "success", message: "Thêm đánh giá thành công " });
  } catch (error) {
    yield put(addReviewProductFailed(error));
    toast({ type: "error", message: "Thêm đánh giá thất bại" });
  }
}
const ProductSaga = [
  takeLatest(actionTypes.LOAD_DATA_PRODUCT, loadDataProduct),
  takeLatest(actionTypes.LOAD_REVIEW_PRODUCT, loadReviewProduct),
  takeLatest(actionTypes.ADD_REVIEW_PRODUCT, addReviewProduct),
];

export default ProductSaga;
