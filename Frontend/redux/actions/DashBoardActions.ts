export const actionTypes={
    GET_DASHBOARD_PIE : "GET_DASHBOARD_PIE",
    GET_DASHBOARD_PIE_SUCCESS : "GET_DASHBOARD_PIE_SUCCESS",
    GET_DASHBOARD_PIE_FAILURE : "GET_DASHBOARD_PIE_FAILURE",

    GET_DASHBOARD_COLUMN : "GET_DASHBOARD_COLUMN",
    GET_DASHBOARD_COLUMN_SUCCESS : "GET_DASHBOARD_COLUMN_SUCCESS",
    GET_DASHBOARD_COLUMN_FAILURE : "GET_DASHBOARD_COLUMN_FAILURE",

    GET_DASHBOARD_MONTH : "GET_DASHBOARD_MONTH",
    GET_DASHBOARD_MONTH_SUCCESS : "GET_DASHBOARD_MONTH_SUCCESS",
    GET_DASHBOARD_MONTH_FAILURE : "GET_DASHBOARD_MONTH_FAILURE",

    GET_DASHBOARD_DAY : "GET_DASHBOARD_DAY",
    GET_DASHBOARD_DAY_SUCCESS : "GET_DASHBOARD_DAY_SUCCESS",
    GET_DASHBOARD_DAY_FAILURE : "GET_DASHBOARD_DAY_FAILURE",
    
    GET_DASHBOARD : "GET_DASHBOARD",
    GET_DASHBOARD_SUCCESS : "GET_DASHBOARD_SUCCESS",
    GET_DASHBOARD_FAILURE : "GET_DASHBOARD_FAILURE",
}

export function getDashBoardPie(values){
    return{
        type:actionTypes.GET_DASHBOARD_PIE,
        payload:{
            values,
        }
    };
}
export function getDashBoardPieSuccess(data){
    return{
        type:actionTypes.GET_DASHBOARD_PIE_SUCCESS,
        payload:{
            data,
        }
    };
}
export function getDashBoardPieFailure(error){
    return{
        type:actionTypes.GET_DASHBOARD_PIE_FAILURE,
        payload:{
            error,
        }
    };
}

export function getDashBoardColumn(values){
    return{
        type:actionTypes.GET_DASHBOARD_COLUMN,
        payload:{
            values,
        }
    };
}
export function getDashBoardColumnSuccess(data){
    return{
        type:actionTypes.GET_DASHBOARD_COLUMN_SUCCESS,
        payload:{
            data,
        }
    };
}
export function getDashBoardColumnFailure(error){
    return{
        type:actionTypes.GET_DASHBOARD_COLUMN_FAILURE,
        payload:{
            error,
        }
    };
}

export function getDashBoardMonth(values){
    return{
        type:actionTypes.GET_DASHBOARD_MONTH,
        payload:{
            values,
        }
    };
}
export function getDashBoardMonthSuccess(data){
    return{
        type:actionTypes.GET_DASHBOARD_MONTH_SUCCESS,
        payload:{
            data,
        }
    };
}
export function getDashBoardMonthFailure(error){
    return{
        type:actionTypes.GET_DASHBOARD_MONTH_FAILURE,
        payload:{
            error,
        }
    };
}

export function getDashBoardDay(values){
    return{
        type:actionTypes.GET_DASHBOARD_DAY,
        payload:{
            values,
        }
    };
}
export function getDashBoardDaySuccess(data){
    return{
        type:actionTypes.GET_DASHBOARD_DAY_SUCCESS,
        payload:{
            data,
        }
    };
}
export function getDashBoardDayFailure(error){
    return{
        type:actionTypes.GET_DASHBOARD_DAY_FAILURE,
        payload:{
            error,
        }
    };
}

export function getDashBoard(values){
    return{
        type:actionTypes.GET_DASHBOARD,
        payload:{
            values,
        }
    };
}
export function getDashBoardSuccess(data){
    return{
        type:actionTypes.GET_DASHBOARD_SUCCESS,
        payload:{
            data,
        }
    };
}
export function getDashBoardFailure(error){
    return{
        type:actionTypes.GET_DASHBOARD_FAILURE,
        payload:{
            error,
        }
    };
}