import { bool } from "yup";
import { boolean } from "yup/lib/locale";

export const actionTypes = {
    LOAD_SYSTEMPAGE: "LOAD_SYSTEMPAGE",
    LOAD_SYSTEMPAGE_SUCCESS: "LOAD_SYSTEMPAGE_SUCCESS",
    LOAD_SYSTEMPAGE_FAILURE: "LOAD_SYSTEMPAGE_FAILURE",

    ADD_SYSTEMPAGE: "ADD_SYSTEMPAGE",
    ADD_SYSTEMPAGE_SUCCESS: "ADD_SYSTEMPAGE_SUCCESS",
    ADD_SYSTEMPAGE_FAILURE: "ADD_SYSTEMPAGE_FAILURE",

    UPDATE_SYSTEMPAGE: "UPDATE_SYSTEMPAGE",
    UPDATE_SYSTEMPAGE_SUCCESS: "UPDATE_SYSTEMPAGE_SUCCESS",
    UPDATE_SYSTEMPAGE_FAILURE: "UPDATE_SYSTEMPAGE_FAILURE",

    DELETE_SYSTEMPAGE: "DELETE_SYSTEMPAGE",
    DELETE_SYSTEMPAGE_SUCCESS: "DELETE_SYSTEMPAGE_SUCCESS",
    DELETE_SYSTEMPAGE_FAILURE: "DELETE_SYSTEMPAGE_FAILURE",

    GET_SYSTEMPAGE_BYLEVEL: "GET_SYSTEMPAGE_BYLEVEL",
    GET_SYSTEMPAGE_BYLEVEL_SUCCESS: "GET_SYSTEMPAGE_BYLEVEL_SUCCESS",
    GET_SYSTEMPAGE_BYLEVEL_FAILURE: "GET_SYSTEMPAGE_BYLEVEL_FAILURE",
  };

export interface ISystemPage {
    _id: string;
    name: string;
    icon: string;
    controllerName: string;
    actionName: string;
    url: string;
    orderNo: number;
    parentId: string;
    level: number;
}
export interface SystemPageState {
  readonly data: ISystemPage[],
}

/* GET ALL SYSTEM PAGE */

  export function loadSystemPage() {
    return {
      type: actionTypes.LOAD_SYSTEMPAGE
    };
  }
  
  export function loadDataSuccess(data: ISystemPage[]) {
    return {
      type: actionTypes.LOAD_SYSTEMPAGE_SUCCESS,
      payload: {
        data: data
      }
    };
  }
  
  export function loadDataFailure(error: any) {
    return {
      type: actionTypes.LOAD_SYSTEMPAGE_FAILURE,
      payload: {
        error: error
      }
    };
  }

  /* ADD SYSTEM PAGE */

  export function addSystemPage(values: ISystemPage) {
    return {
      type: actionTypes.ADD_SYSTEMPAGE,
      payload: values
    };
  }

  export function addSystemPageSuccess(data: ISystemPage[]) {
    return {
      type: actionTypes.ADD_SYSTEMPAGE_SUCCESS,
      payload: {
        data: data,
      }
    };
  }
  
  export function addSystemPageFailure(error: any) {
    return {
      type: actionTypes.ADD_SYSTEMPAGE_FAILURE,
      payload: {
        error: error,
      }
    };
  }


  /* UPDATE SYSTEM PAGE */

  export function updateSystemPage(values: ISystemPage) {
    return {
      type: actionTypes.UPDATE_SYSTEMPAGE,
      payload: values
    };
  }

  export function updateSystemPageSuccess(data: ISystemPage[]) {
    return {
      type: actionTypes.UPDATE_SYSTEMPAGE_SUCCESS,
      payload: {
        data: data,
      }
    };
  }
  
  export function updateSystemPageFailure(error: any) {
    return {
      type: actionTypes.UPDATE_SYSTEMPAGE_FAILURE,
      payload: {
        error: error,
      }
    };
  }


  /* DELETE SYSTEM PAGE */

  export function deleteSystemPage(values: ISystemPage) {
    return {
      type: actionTypes.DELETE_SYSTEMPAGE,
      payload: values
    };
  }

  export function deleteSystemPageSuccess(data: ISystemPage[]) {
    return {
      type: actionTypes.DELETE_SYSTEMPAGE_SUCCESS,
      payload: {
        data: data,
      }
    };
  }
  
  export function deleteSystemPageFailure(error: any) {
    return {
      type: actionTypes.DELETE_SYSTEMPAGE_FAILURE,
      payload: {
        error: error,
      }
    };
  }

  /* GET SYSTEM PAGE BY LEVEL */

  export function getSystemPageByLevel(values: ISystemPage["level"]) {
    return {
      type: actionTypes.GET_SYSTEMPAGE_BYLEVEL,
      payload: values
    };
  }

  export function getSystemPageByLevelSuccess(data: ISystemPage[]) {
    return {
      type: actionTypes.GET_SYSTEMPAGE_BYLEVEL_SUCCESS,
      payload: {
        data: data,
      }
    };
  }
  
  export function getSystemPageByLevelFailure(error: any) {
    return {
      type: actionTypes.GET_SYSTEMPAGE_BYLEVEL_FAILURE,
      payload: {
        error: error,
      }
    };
  }
  