import produce from "immer";

import {actionTypes} from "../actions/DashBoardActions";


const initialState = {
    alldashboarddata : null,
    datacolumn:[],
    datapie:[],
    datamonth:[],
    dataday:[],
    datastatic:[],
    errorp:null,
    errorc:null,
    errorm:null,
    errord:null,
    errorStt:null
}

const successGetDataDashBoardPie =(draft:any,{data}:any)=>{
   draft.datapie = data
}
const successGetDataDashBoardColumn =(draft:any,{data}:any)=>{
    draft.datacolumn = data
 }
 const successGetDataDashBoardMonth =(draft:any,{data}:any)=>{
    draft.datamonth = data
 }
 const successGetDataDashBoardDay =(draft:any,{data}:any)=>{
    draft.dataday = data
 }
 const successGetDataDashBoard =(draft:any,{data}:any)=>{
    draft.datastatic = data
 }


const failureGetDataPie =(draft:any,{error}:any)=>{
    draft.errorp = error
}
const failureGetDataColumn =(draft:any,{error}:any)=>{
    draft.errorc = error
}
const failureGetDataMonth =(draft:any,{error}:any)=>{
    draft.errorm = error
}
const failureGetDataDay =(draft:any,{error}:any)=>{
    draft.errord = error
}
const failureGetData =(draft:any,{error}:any)=>{
    draft.errord = error
}

const reducer = (state = initialState, action:any)=>{
    return produce(state,draft=>{
        switch(action.type){
            case actionTypes.GET_DASHBOARD_PIE_SUCCESS:
                successGetDataDashBoardPie(draft,action.payload.data.data);
                // console.log(action.payload)
                break;
            case actionTypes.GET_DASHBOARD_PIE_FAILURE:
                failureGetDataPie(draft,action.payload);
                break;

            case actionTypes.GET_DASHBOARD_COLUMN_SUCCESS:
                successGetDataDashBoardColumn(draft,action.payload.data.data);
                // console.log(action.payload)
                break;
            case actionTypes.GET_DASHBOARD_COLUMN_FAILURE:
                failureGetDataColumn(draft,action.payload);
                break;
            case actionTypes.GET_DASHBOARD_MONTH_SUCCESS:
                successGetDataDashBoardMonth(draft,action.payload.data.data);
                // console.log(action.payload)
                break;
            case actionTypes.GET_DASHBOARD_MONTH_FAILURE:
                failureGetDataMonth(draft,action.payload);
                break;
            case actionTypes.GET_DASHBOARD_DAY_SUCCESS:
                successGetDataDashBoardDay(draft,action.payload.data.data);
                // console.log(action.payload)
                break;
            case actionTypes.GET_DASHBOARD_DAY_FAILURE:
                failureGetDataDay(draft,action.payload);
                break;
            case actionTypes.GET_DASHBOARD_SUCCESS:
                successGetDataDashBoard(draft,action.payload.data.data);
                // console.log(action.payload)
                break;
            case actionTypes.GET_DASHBOARD_FAILURE:
                failureGetData(draft,action.payload);
                break;
        }
    })
}
export default reducer;