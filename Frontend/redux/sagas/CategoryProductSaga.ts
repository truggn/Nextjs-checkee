import categoryProductAPI from "Frontend/constant.config.api/api/getCategoryProduct";
import { call, put, takeLatest } from "redux-saga/effects";
import { actionTypes, loadDataCategoryFailed, loadDataCategorySuccess, loadListOfProductFailed, loadListOfProductSuccess } from "../actions/CategoryProductActions";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";
import getListIPA from "Frontend/constant.config.api/api/getListOfProduct";

function* loadDataProduct( ) {
    try {
        console.log("Hello saga")
        const productData = yield call(categoryProductAPI)
        yield put(loadDataCategorySuccess(productData.data.data))
        NProgress.done();
        toast({ type: "success", message: "Thêm danh mục thành công" });
    } catch (error) {
        yield put (loadDataCategoryFailed(error))
        NProgress.done();
        toast({ type: "error", message: "Thêm danh mục thất bại" });
    }
}

function* loadListOfProduct(action) {
    try {
        const dataList = yield call(getListIPA,action.payload.data);
        yield put(loadListOfProductSuccess(dataList.data)); 
    } catch (error) {
        yield put(loadListOfProductFailed(error));
    }
}

const ProductSaga = [
    takeLatest(actionTypes.LOAD_DATA_CATEGORYPRODUCT,loadDataProduct),
    takeLatest(actionTypes.LOAD_DATA_LISTOFPRODUCT,loadListOfProduct),
];

export default ProductSaga ;