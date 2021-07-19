import { call, put, takeLatest } from "redux-saga/effects";
import NProgress from "nprogress";
import toast from "@/ShowToast/ShowToast";
import {
  actionTypes,
  loadDataContractSuccess,
  loadDataContractFail,
  //
  deletedDataContractSuccess,
  deletedDataContractFail,
  //
  createDataContractSuccess,
  createDataContractFail,
  //
  updateDataContractSuccess,
  updateDataContractFail,
} from "../actions/ContractActions";
import getContract from "../../constant.config.api/api/getAllContract";
import deletedDataContract from "../../constant.config.api/api/deletedContract";
import createContract from "../../constant.config.api/api/createContract";
import updateContract from "../../constant.config.api/api/updateContract";
//
function* loadContractDataSaga() {
  try {
    const respose = yield call(getContract);
    yield put(loadDataContractSuccess(respose.data.data));
    //
  } catch (error) {
    yield put(loadDataContractFail(error));
  }
}
//
function* DeletedContractDataSaga(action) {
  try {
    const newData = yield call(deletedDataContract, action.payload.id);
    if (newData.status === 200) {
      yield put(deletedDataContractSuccess(newData, action.payload.id));
      NProgress.done();
      toast({ type: "success", message: "Xóa thành công" });
    } else {
      yield put(deletedDataContractFail(newData.data.errors[0].message));
      NProgress.done();
      toast({ type: "error", message: newData.data.errors[0].message });
    }
  } catch (error) {}
}
//
function* createContractSaga(action) {
  try {
    const newData = yield call(createContract, action.payload.values);
    console.log("new:ss", newData);
    if (newData.status === 200) {
      yield put(createDataContractSuccess(newData));
      NProgress.done();
      // Close(true);
      toast({ type: "success", message: "Tạo thành công" });
    } else {
      if (newData.response.data.errors[0].code === "err002") {
        NProgress.done();
        toast({ type: "error", message: "Đã tồn tại email" });
      }
      if (newData.response.data.errors[0].code === "err001") {
        NProgress.done();
        toast({
          type: "error",
          message: "Mật khẩu phải dài 6-24 ký tự, bao gồm cả chữ cái và chữ số",
        });
      }
      yield put(createDataContractFail(newData.response.data.errors[0].code));
    }
  } catch (error) {}
}
//
function* updateContractSaga(action) {
  // console.log("action", action);
  try {
    const newUpdate = yield call(updateContract, action.payload.values);
    // console.log("newupdate", newUpdate);
    if (newUpdate.status === 200) {
      yield put(
        updateDataContractSuccess(newUpdate, action.payload.values._id)
      );
      NProgress.done();
      toast({ type: "success", message: "Cập nhật thành công" });
    } else {
      yield put(updateDataContractFail(newUpdate.data.errors[0].message));
      NProgress.done();
      toast({ type: "error", message: newUpdate.data.errors[0].message });
    }
  } catch (error) {}
}
//
const ContractSaga = [
  takeLatest(actionTypes.LOAD_CONTRACT, loadContractDataSaga),
  takeLatest(actionTypes.DELETED_CONTRACT, DeletedContractDataSaga),
  takeLatest(actionTypes.CREATE_CONTRACT, createContractSaga),
  takeLatest(actionTypes.UPDATE_CONTRACT, updateContractSaga),
  // takeLatest(actionTypes.UPDATE_STATUS_USER, updateStatusSaga),
];

export default ContractSaga;
