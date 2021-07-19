import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  loadDataCategorySuccess,
  loadDataCategoryFailed,
  addDataCategorySuccess,
  addDataCategoryFailed,
  deleteDataCategorySuccess,
  deleteDataCategoryFailed,
  updateDataCategorySuccess,
  updateDataCategoryFailed,
} from "../actions/CategoryActions";
import getAPI from "../../constant.config.api/api/getCategory";
import addAPI from "../../constant.config.api/api/addCategory";
import deleteAPI from "../../constant.config.api/api/deleteCategory";
import updateAPI from "../../constant.config.api/api/updateCategory";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";

// load
function* loadCategory() {
  try {
    const dataCategory = yield call(getAPI);
    if (dataCategory.length > 0) {
      yield put(loadDataCategorySuccess(dataCategory));
      NProgress.done();
    } else {
      yield put(loadDataCategoryFailed(dataCategory));
      NProgress.done();
      toast({ type: "error", message: "Lấy danh sách danh mục thất bại" });
    }
  } catch (error) {
    yield put(loadDataCategoryFailed(error));
  }
}

// add
function* addCategory(action) {
  try {
    const dataCategory = yield call(addAPI, action.payload.data);
    if (dataCategory.data) {
      yield put(addDataCategorySuccess(dataCategory.data));
      toast({ type: "success", message: "Thêm danh mục thành công" });
      NProgress.done();
    } else {
      yield put(addDataCategoryFailed(dataCategory));
      NProgress.done();
      toast({ type: "error", message: "Thêm danh mục thất bại" });
    }
  } catch (error) {
    yield put(addDataCategoryFailed(error));
  }
}

// delete
function* deleteCategory(action) {
  try {
    const dataCategory = yield call(deleteAPI, action.payload.data);
    if (dataCategory.data) {
      yield put(deleteDataCategorySuccess(dataCategory.data));
      toast({ type: "success", message: "Xóa danh mục thành công" });
      NProgress.done();
    } else {
      yield put(deleteDataCategoryFailed(dataCategory));
      NProgress.done();
      toast({ type: "error", message: "Xóa danh mục thất bại" });
    }
  } catch (error) {
    yield put(deleteDataCategoryFailed(error));
  }
}

// update
function* updateCategory(action) {
  try {
    const dataCategory = yield call(updateAPI, action.payload.data);
    if (dataCategory.status >= 200 && dataCategory.status < 300) {
      yield put(updateDataCategorySuccess(dataCategory.data.data));
      toast({ type: "success", message: "Cập nhật danh mục thành công" });
      NProgress.done();
    } else {
      console.log(`dataCategory`, dataCategory);
      yield put(updateDataCategoryFailed(dataCategory));
      NProgress.done();
      toast({ type: "error", message: dataCategory.data.errors[0].message });
    }
  } catch (error) {
    yield put(updateDataCategoryFailed(error));
  }
}

const sagaCategory = [
  takeLatest(actionTypes.LOAD_DATA_CATEGORY, loadCategory),
  takeLatest(actionTypes.ADD_DATA_CATEGORY, addCategory),
  takeLatest(actionTypes.DELETE_DATA_CATEGORY, deleteCategory),
  takeLatest(actionTypes.UPDATE_DATA_CATEGORY, updateCategory),
];

export default sagaCategory;
