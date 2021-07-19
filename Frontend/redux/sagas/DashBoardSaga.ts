import {call,put,takeLatest} from "redux-saga/effects";

import {actionTypes, getDashBoardColumnFailure, getDashBoardColumnSuccess, getDashBoardDayFailure, getDashBoardDaySuccess, getDashBoardMonthFailure, getDashBoardMonthSuccess, getDashBoardPieFailure, getDashBoardPieSuccess, getDashBoardSuccess,} from "../actions/DashBoardActions";
import getStaticApi from "../../constant.config.api/api/getStaticApi";
import getStaticColumnApi from "Frontend/constant.config.api/api/getStaticColumnApi";
import getStaticMonthApi from "Frontend/constant.config.api/api/getStaticMonthApi";
import getStaticDayApi from "Frontend/constant.config.api/api/getStaticDayApi";
import getStaticAllApi from "Frontend/constant.config.api/api/getStaticAllApi";

import NProgress from 'nprogress'
import toast from "@/ShowToast/ShowToast";

function* loadDashBoardPieSaga(action){
    try{
        const {values} = action.payload;
        const resultPie = yield call(getStaticApi,values);
        if(resultPie.status === 200 || resultPie === 201){
            yield put(getDashBoardPieSuccess(resultPie));
            NProgress.done()
        }else{
            toast({ type: "error", message: resultPie.data.errors[0].message});
            NProgress.done()
        }
  
    }catch(error){
        yield put(getDashBoardPieFailure(error));
        NProgress.done()
    }
}
function* loadDashBoardColumnSaga(action){
    try{
        const {values} = action.payload;
        const resultColumn = yield call(getStaticColumnApi,values);
        
        if(resultColumn.status === 200 || resultColumn === 201){
            yield put(getDashBoardColumnSuccess(resultColumn));
            NProgress.done()
        }else{
            toast({ type: "error", message: resultColumn.data.errors[0].message});
            NProgress.done()
        }
       
  
    }catch(error){
        yield put(getDashBoardColumnFailure(error));
        NProgress.done()
    }
}
function* loadDashBoardMonthSaga(action){
    try{
        const {values} = action.payload;
         const resultMotnh = yield call(getStaticMonthApi,values);
       
        if(resultMotnh.status === 200 || resultMotnh === 201){
            yield put(getDashBoardMonthSuccess(resultMotnh));
            NProgress.done()
        }else{
            toast({ type: "error", message: resultMotnh.data.errors[0].message});
            NProgress.done()
        }
  
    }catch(error){
        yield put(getDashBoardMonthFailure(error));
        NProgress.done()
    }
}

function* loadDashBoardDaySaga(action){
    try{
        const {values} = action.payload;
         const resultDay = yield call(getStaticDayApi,values);
       
        if(resultDay.status === 200 || resultDay === 201){
            yield put(getDashBoardDaySuccess(resultDay));
            NProgress.done()
        }else{
            toast({ type: "error", message: resultDay.data.errors[0].message});
            NProgress.done()
        }
  
    }catch(error){
        yield put(getDashBoardDayFailure(error));
        NProgress.done()
    }
}

function* loadDashBoardSaga(action){
    try{
        const {values} = action.payload;
         const result = yield call(getStaticAllApi,values);
       
        if(result.status === 200 || result === 201){
            yield put(getDashBoardSuccess(result));
            NProgress.done()
        }else{
            toast({ type: "error", message: result.data.errors[0].message});
            NProgress.done()
        }
  
    }catch(error){
        yield put(getDashBoardDayFailure(error));
        NProgress.done()
    }
}
const sagas =[
    takeLatest(actionTypes.GET_DASHBOARD_PIE,loadDashBoardPieSaga),
    takeLatest(actionTypes.GET_DASHBOARD_COLUMN,loadDashBoardColumnSaga),
    takeLatest(actionTypes.GET_DASHBOARD_MONTH,loadDashBoardMonthSaga),
    takeLatest(actionTypes.GET_DASHBOARD_DAY,loadDashBoardDaySaga),
    takeLatest(actionTypes.GET_DASHBOARD,loadDashBoardSaga)
]
export default sagas;