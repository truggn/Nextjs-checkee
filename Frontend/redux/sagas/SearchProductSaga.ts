import { call, put, takeLatest } from "redux-saga/effects";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";
import {
  actionTypes,
  searchDataProductSuccess,
  searchDataProductFail
} from "../actions/SearchProductActions";
import searchProduct from "../../constant.config.api/api/searchProduct"

function* searchProductDataSaga(action) {
  try {
    const searchData = yield call(searchProduct, action.payload.value);
      if(searchData.data.data.length !== 0) {
        yield put(searchDataProductSuccess(searchData));
        NProgress.done();
        toast({ type: "success", message: "Tìm sản phẩm thành công " });
      } else {
        toast({ type: "error", message: "Không tìm thấy sản phẩm" });
      }
  } catch (error) {
    yield put(searchDataProductFail(error));
  }
}
const SearchProductSaga = [
  takeLatest(actionTypes.SEARCH_PRODUCT, searchProductDataSaga)
];

export default SearchProductSaga;
