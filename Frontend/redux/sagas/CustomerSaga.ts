import { call, put, takeLatest,delay } from 'redux-saga/effects'
import { 
  actionTypes,
  getCustomerSuccess, 
  getCustomerFailure,
  createCustomerSuccess,
  createCustomerFailure,
  updateCustomerSuccess,
  updateCustomerFailure,
  deleteCustomerSuccess,
  deleteCustomerFailure,
} from '../actions/CustomerActions'
import getCustomer from '../../constant.config.api/api/getAllCustomer'
import createCustomer from '../../constant.config.api/api/createCustomer'
import updateCustomer from '../../constant.config.api/api/updateCustomer'
import deleteCustomer from '../../constant.config.api/api/deleteCustomer'
import toast from "@/ShowToast/ShowToast";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import NProgress from 'nprogress'
import exportCustomerExcelApi from 'Frontend/constant.config.api/api/exportExcelCustomerApi'

export function* getCustomerProcess() {
  try { 
    const response = yield call(getCustomer)
    yield put(getCustomerSuccess(response.data.data))
  } catch(err) {
    yield put(getCustomerFailure(err))
  }
}

export function* createCustomerProcess(action) {
  try {
    const response = yield call(createCustomer, action.payload);
    if (response.status >= 200 && response.status < 300) {
      yield put(createCustomerSuccess(response.data.data));
      NProgress.done();
      toast({ type: "success", message: "Thêm mới thành công" });
    } else {
      toast({
        type: "error",
        message: response.response.data.errors[0].message,
      });
    }
  } catch (err) {
    yield put(createCustomerFailure(err));
    toast({ type: "error", message: "Thêm không thành công" });
  }
}

export function* updateCustomerProcess(action) {
  try {
    const response = yield call(updateCustomer, action.payload)
    yield put(updateCustomerSuccess(response.data.data))
    NProgress.done()
    toast({ type: "success", message: "Cập nhật đối tác thành công" });
  } catch(err) {
    yield put(updateCustomerFailure(err))
    toast({ type: "error", message: "Có gì đó sai sai"})
  }
}

export function* deleteCustomerProcess(action) {
  try {
    const response = yield call(deleteCustomer, action.payload)
    yield put(deleteCustomerSuccess(response.data.data))
    NProgress.done()
    toast({ type: "success", message: "Xóa đối tác thành công" });
  } catch(err) {
    yield put(deleteCustomerFailure(err))
    toast({ type: "error", message: "Có gì đó sai sai"})  
  }
}
export function* exportCustomerExcelProcess() {
  try {
    const responsive = yield call(exportCustomerExcelApi);
   
    if(responsive.status === 200){
     
      const datetime = new Date();
      const fileName = `customer-excel-${datetime}`;
     
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const fileData = responsive.data.data;
      const ws = XLSX.utils.json_to_sheet(fileData);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + fileExtension);
   }
   
  } catch(err) {
   console.log(err)
  }
}
// function* filterCustomerProcess({payload}){
//       yield delay(500);
//       const {keyword} = payload
//       yield put(getCustomerProcess({
//         q:keyword
//     }))
// }

export function* onGetCustomerStart() {
  yield takeLatest(actionTypes.GET_CUSTOMER_START, getCustomerProcess)
}

export function* onCreateCustomerStart() {
  yield takeLatest(actionTypes.CREATE_CUSTOMER_START, createCustomerProcess)
}

export function* onUpdateCustomerStart() {
  yield takeLatest(actionTypes.UPDATE_CUSTOMER_START, updateCustomerProcess)
}

export function* onDeleteCustomerStart() {
  yield takeLatest(actionTypes.DELETE_CUSTOMER_START, deleteCustomerProcess)
}
export function* exportCustomerExcelSaga() {
  yield takeLatest(actionTypes.EXPORT_CUSTOMER_EXCEL, exportCustomerExcelProcess)
}
// export function* onfilterCustomerStart(){
//   yield takeLatest(actionTypes.FILTER_CUSTOMER_START, filterCustomerProcess)
// }
const sagas = [
  call(onGetCustomerStart),
  call(onCreateCustomerStart),
  call(onUpdateCustomerStart),
  call(onDeleteCustomerStart),
  call(exportCustomerExcelSaga),
  // call(onfilterCustomerStart),
]

export default sagas