import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  loadDataProductAttributesSuccess,
  loadDataProductAttributesFail,
  //
  deleteDataProductAttributesSuccess,
  deleteDataProductAttributesFail,
  //
  createDataProductAttributesSuccess,
  createDataProductAttributesFail,
  //
  updateDataProductAttributesSuccess,
  updateDataProductAttributesFail,
} from "../actions/ProductAttributesActions";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";
//import api
import getProductAttributes from "../../constant.config.api/api/getAllProductAttributes";
import deletedProductAttributes from "../../constant.config.api/api/deleteProductAttributes";
import createProductAttributes from "../../constant.config.api/api/createProductAttributes";
import updateProductAttributes from "../../constant.config.api/api/updateProductAttributes";
//function
function* loadDataProductAttributes() {
  try {
    const dataProductAttributes = yield call(getProductAttributes);
    yield put(
      loadDataProductAttributesSuccess(dataProductAttributes.data.data)
    );
  } catch (error) {
    yield put(loadDataProductAttributesFail(error));
  }
}

function* deleteDataProductAttributes(action) {
  try {
    const dataProductAttributes = yield call(
      deletedProductAttributes,
      action.payload.id
    );
    // console.log("dataApi", dataProductAttributes);
    if (dataProductAttributes.status === 200) {
      yield put(
        deleteDataProductAttributesSuccess(
          dataProductAttributes,
          action.payload.id
        )
      );
      NProgress.done();
      toast({
        type: "success",
        message: "Xóa thành công",
      });
    } else {
      NProgress.done();
      toast({ type: "success", message: "Xóa không thành công" });
    }
  } catch (error) {
    yield put(deleteDataProductAttributesFail(error));
  }
}

function* createDataProductAttributes(action) {
  try {
    const dataProductAttributes = yield call(
      createProductAttributes,
      action.payload.value
    );
    if (dataProductAttributes.status === 200) {
      yield put(createDataProductAttributesSuccess(dataProductAttributes));
      NProgress.done();
      toast({
        type: "success",
        message: "Tạo thành công",
      });
    } else {
      NProgress.done();
      toast({
        type: "error",
        message: "Tạo không thành công",
      });
    }
  } catch (error) {
    yield put(createDataProductAttributesFail(error));
  }
}

function* updateDataProductAttributes(action) {
  try {
    const updateData = yield call(
      updateProductAttributes,
      action.payload.value
    );
    if (updateData.status === 200) {
      yield put(updateDataProductAttributesSuccess(updateData));
      NProgress.done();
      toast({
        type: "success",
        message: "Cập nhật thành công",
      });
    } else {
      NProgress.done();
      toast({
        type: "error",
        message: "Cập nhật không thành công",
      });
    }
  } catch (error) {
    yield put(updateDataProductAttributesFail(error));
  }
}
//
const ProductAttributesSaga = [
  takeLatest(
    actionTypes.LOAD_DATA_PRODUCTATTRIBUTES,
    loadDataProductAttributes
  ),
  takeLatest(
    actionTypes.DELETE_DATA_PRODUCTATTRIBUTES,
    deleteDataProductAttributes
  ),
  takeLatest(
    actionTypes.CREATE_DATA_PRODUCTATTRIBUTES,
    createDataProductAttributes
  ),
  takeLatest(
    actionTypes.UPDATE_DATA_PRODUCTATTRIBUTES,
    updateDataProductAttributes
  ),
];
export default ProductAttributesSaga;
