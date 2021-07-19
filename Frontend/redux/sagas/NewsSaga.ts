import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";

import getNewsApi from "Frontend/constant.config.api/api/getNewApi";
import { actionTypes, loadNewsSuccess,loadNewsFailure, deleteNewsSuccess, updateNewsSuccess, createNewsSuccess, createNewsFailure, deleteNewsFailure, updateNewsFailure } from "../actions/NewsActions";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";

import createNewsApi from "Frontend/constant.config.api/api/createNewsApi";
import deleteNewsApi from "Frontend/constant.config.api/api/deleteNewsApi";
import updateNewsApi from "Frontend/constant.config.api/api/updateNewsApi";

function* loadDataSaga(action){
    try{
        const page = action.page;
        
        const resposive = yield call(getNewsApi,page);
        yield put(loadNewsSuccess(resposive.data.data));
        toast({ type: "success", message: "đây là bản tin" });
    }catch(error){
        yield put(loadNewsFailure(error));
        toast({ type: "error", message: "load dữ liệu thất bại" + error});
    }
}
function* createDataSaga(action){
    try{
        console.log(action.payload.values);
        const resposive = yield call(createNewsApi,action.payload.values);
        yield put(createNewsSuccess(resposive.data.data));
        NProgress.done();
        toast({ type: "success", message: "đã thêm mới 1 bản tin" });
    }catch(error){
        yield put(createNewsFailure(error));
        toast({ type: "error", message: "load dữ liệu thất bại" + error});
    }
}
function* deleteDataSaga(action){
    try{
        const response = yield call(deleteNewsApi,action.payload)
        yield put(deleteNewsSuccess(response.data.data._id))
        NProgress.done();
        toast({ type: "success", message: "đã xóa 1 bản tin" });
    }catch(error){
        yield put(deleteNewsFailure(error));
        toast({ type: "error", message: "load dữ liệu thất bại" + error});
    }
}
function* updateDataSaga(action){
    try{
        const resposive = yield call(updateNewsApi,action.payload.values);
        yield put(updateNewsSuccess(resposive.data.data));
        NProgress.done();
        toast({ type: "success", message: "đã cập nhật 1 bản tin" });
    }catch(error){
        yield put(updateNewsFailure(error));
        toast({ type: "error", message: "load dữ liệu thất bại" + error});
    }
}
const ListNewsSaga = [
    takeLatest(actionTypes.LOAD_NEWS, loadDataSaga),
    takeEvery(actionTypes.CREATE_NEWS, createDataSaga),
    takeLatest(actionTypes.DELETE_NEWS, deleteDataSaga),
    takeLatest(actionTypes.UPDATE_NEWS, updateDataSaga),
]
export default ListNewsSaga;