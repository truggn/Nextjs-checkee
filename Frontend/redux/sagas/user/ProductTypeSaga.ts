import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  loadDataProductTypeSuccess,
  loadDataProductTypeFail,
  //
  createDataProductTypeSuccess,
  createDataProductTypeFail,
  //
  deleteDataProductTypeSuccess,
  deleteDataProductTypeFail,
  //
  updateDataProductTypeSuccess,
  updateDataProductTypeFail,
  verifiedDataProductTypeSuccess,
  verifiedDataProductTypeFail,
  //
  loadAllCateFailed,
  loadAllCateSuccess,
} from "../../actions/user/ProductTypeActions";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";
//import api
import getProductType from "../../../constant.config.api/api/user/getProductType";
import createProductType from "../../../constant.config.api/api/user/createProductType";
import deletedProductTye from "../../../constant.config.api/api/user/deleteProductType";
import updateProductType from "../../../constant.config.api/api/user/updateProductType";
import verifiedProductType from "../../../constant.config.api/api/user/verifiedProductType";
import allCateAPI from "../../../constant.config.api/api/getAllCategory";
//
function* loadDataProductType(action) {
  try {
    const ProductTypeData = yield call(
      getProductType,
      action.payload.organizationId
    );
    yield put(loadDataProductTypeSuccess(ProductTypeData.data.data));
    //
  } catch (error) {
    yield put(loadDataProductTypeFail(error));
  }
}
function* deletedDataProductType(action) {
  try {
    const response = yield call(deletedProductTye, action.payload.data);

    if (response.status === 200) {
      yield put(deleteDataProductTypeSuccess(action.payload.data));
      NProgress.done();
      toast({ type: "success", message: "Xóa thành công" });
    } else {
      yield put(deleteDataProductTypeFail(response));
      NProgress.done();
      toast({ type: "error", message: "Xóa thất bại" });
    }
  } catch (error) {
    yield put(deleteDataProductTypeFail(error));
  }
}
function* createDataProductType(action) {
  try {
    const createDataProductType = yield call(
      createProductType,
      action.payload.value
    );
    if (
      createDataProductType.status < 300 &&
      createDataProductType.status >= 200
    ) {
      yield put(createDataProductTypeSuccess(createDataProductType));
      NProgress.done();
      toast({ type: "success", message: "Tạo thành công" });
    } else {
      yield put(createDataProductTypeFail(createDataProductType));
      NProgress.done();
      toast({
        type: "error",
        message: createDataProductType.data.errors[0].message,
      });
    }
  } catch (error) {
    console.log(`error`, error);
  }
}
function* updateDataProductType(action) {
  try {
    const dataProductType = yield call(updateProductType, action.payload.value);
    if (dataProductType.data) {
      yield put(
        updateDataProductTypeSuccess(dataProductType, action.payload.value._id)
      );
      NProgress.done();
      toast({ type: "success", message: "Cập nhật thành công" });
    } else {
      yield put(updateDataProductTypeFail(dataProductType));
      NProgress.done();
      toast({ type: "error", message: "Cập nhật thất bại" });
    }
  } catch (error) {
    yield put(updateDataProductTypeFail(error));
    toast({ type: "error", message: action.payload.error.message });
  }
}
function* verifiedDataProductType(action) {
  try {
    const dataProductType = yield call(
      verifiedProductType,
      action.payload.data
    );
    if (dataProductType.data.length > 0) {
      yield put(verifiedDataProductTypeSuccess(dataProductType.data));
      NProgress.done();
      toast({ type: "success", message: "Xác minh thành công" });
    } else {
      yield put(verifiedDataProductTypeFail(dataProductType));
      NProgress.done();
      toast({ type: "error", message: "Xác minh thất bại" });
    }
  } catch (error) {
    yield put(verifiedDataProductTypeFail(error));
    toast({ type: "error", message: "Xác minh thất bại" });
  }
}
function* loadAllCategory() {
  try {
    const cate = yield call(allCateAPI);
    if (cate.status < 300 && cate.status >= 200) {
      yield put(loadAllCateSuccess(cate.data.data));
      NProgress.done();
    } else {
      yield put(loadAllCateFailed(cate.message));
      NProgress.done();
      toast({ type: "error", message: "Lấy danh mục thất bại" });
    }
  } catch (error) {
    yield put(loadAllCateFailed(error));
    NProgress.done();
    toast({ type: "error", message: "Lấy danh mục thất bại" });
  }
}
//
const ProductTypeSaga = [
  takeLatest(actionTypes.LOAD_DATA_PRODUCTTYPEUSER, loadDataProductType),
  takeLatest(actionTypes.DELETE_DATA_PRODUCTTYPEUSER, deletedDataProductType),
  takeLatest(actionTypes.CREATE_DATA_PRODUCTTYPEUSER, createDataProductType),
  takeLatest(actionTypes.UPDATE_DATA_PRODUCTTYPEUSER, updateDataProductType),
  takeLatest(
    actionTypes.VERIFIED_DATA_PRODUCTTYPEUSER,
    verifiedDataProductType
  ),
  takeLatest(actionTypes.LOAD_ALLCATEGORY, loadAllCategory),
];

export default ProductTypeSaga;
