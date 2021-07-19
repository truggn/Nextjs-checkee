import { bool } from "yup";
import { boolean } from "yup/lib/locale";

export const actionTypes = {
    LOAD_SYSTEMUSERTYPEPAGE: "LOAD_SYSTEMUSERTYPEPAGE",
    LOAD_SYSTEMUSERTYPEPAGE_SUCCESS: "LOAD_SYSTEMUSERTYPEPAGE_SUCCESS",
    LOAD_SYSTEMUSERTYPEPAGE_FAILURE: "LOAD_SYSTEMUSERTYPEPAGE_FAILURE",

    ADD_SYSTEMUSERTYPEPAGE: "ADD_SYSTEMUSERTYPEPAGE",
    ADD_SYSTEMUSERTYPEPAGE_SUCCESS: "ADD_SYSTEMUSERTYPEPAGE_SUCCESS",
    ADD_SYSTEMUSERTYPEPAGE_FAILURE: "ADD_SYSTEMUSERTYPEPAGE_FAILURE",

    UPDATE_SYSTEMUSERTYPEPAGE: "UPDATE_SYSTEMUSERTYPEPAGE",
    UPDATE_SYSTEMUSERTYPEPAGE_SUCCESS: "UPDATE_SYSTEMUSERTYPEPAGE_SUCCESS",
    UPDATE_SYSTEMUSERTYPEPAGE_FAILURE: "UPDATE_SYSTEMUSERTYPEPAGE_FAILURE",

    DELETE_SYSTEMUSERTYPEPAGE: "DELETE_SYSTEMUSERTYPEPAGE",
    DELETE_SYSTEMUSERTYPEPAGE_SUCCESS: "DELETE_SYSTEMUSERTYPEPAGE_SUCCESS",
    DELETE_SYSTEMUSERTYPEPAGE_FAILURE: "DELETE_SYSTEMUSERTYPEPAGE_FAILURE",

    GET_SYSTEMUSERTYPEPAGE_BYID: "GET_SYSTEMUSERTYPEPAGE_BYID",
    GET_SYSTEMUSERTYPEPAGE_BYID_SUCCESS: "GET_SYSTEMUSERTYPEPAGE_BYID_SUCCESS",
    GET_SYSTEMUSERTYPEPAGE_BYID_FAILURE: "GET_SYSTEMUSERTYPEPAGE_BYID_FAILURE",

    CHECK_ACCESSRIGHT: "CHECK_ACCESSRIGHT",
    CHECK_ACCESSRIGHT_SUCCESS: "CHECK_ACCESSRIGHT_SUCCESS",
    CHECK_ACCESSRIGHT_FAILURE: "CHECK_ACCESSRIGHT_FAILURE",
  };

export interface ISystemUserTypePage {
    _id: string;
    userTypeId: string;
    parentId: string;
    pageId: string;
}

export interface SystemUserTypePageState {
  readonly data: ISystemUserTypePage[],
}

export interface ISystemUserTypePageAccessRight {
  // _id:string;
  userId: any;
  controllerName: any;
  actionName: any;
}

/* GET ALL SYSTEM PAGE */

  export function loadSystemUserTypePage() {
    return {
      type: actionTypes.LOAD_SYSTEMUSERTYPEPAGE,
    };
  }
  
  export function loadDataSuccess(data: ISystemUserTypePage[]) {
    return {
      type: actionTypes.LOAD_SYSTEMUSERTYPEPAGE_SUCCESS,
      payload: {
        data: data,
      }
    };
  }
  
  export function loadDataFailure(error: any) {
    return {
      type: actionTypes.LOAD_SYSTEMUSERTYPEPAGE_FAILURE,
      payload: {
        error: error,
      }
    };
  }

  /* ADD SYSTEM PAGE */

  export function addSystemUserTypePage(values: ISystemUserTypePage) {
    return {
      type: actionTypes.ADD_SYSTEMUSERTYPEPAGE,
      payload: values
    };
  }

  export function addSystemUserTypePageSuccess(data: ISystemUserTypePage[]) {
    return {
      type: actionTypes.ADD_SYSTEMUSERTYPEPAGE_SUCCESS,
      payload: {
        data: data,
      }
    };
  }
  
  export function addSystemUserTypePageFailure(error: any) {
    return {
      type: actionTypes.ADD_SYSTEMUSERTYPEPAGE_FAILURE,
      payload: {
        error: error,
      }
    };
  }


  /* UPDATE SYSTEM PAGE */

  export function updateSystemUserTypePage(values: ISystemUserTypePage) {
    return {
      type: actionTypes.UPDATE_SYSTEMUSERTYPEPAGE,
      payload: values
    };
  }

  export function updateSystemUserTypePageSuccess(data: ISystemUserTypePage[]) {
    return {
      type: actionTypes.UPDATE_SYSTEMUSERTYPEPAGE_SUCCESS,
      payload: {
        data: data,
      }
    };
  }
  
  export function updateSystemUserTypePageFailure(error: any) {
    return {
      type: actionTypes.UPDATE_SYSTEMUSERTYPEPAGE_FAILURE,
      payload: {
        error: error,
      }
    };
  }


  /* DELETE SYSTEM PAGE */

  export function deleteSystemUserTypePage(values: ISystemUserTypePage) {
    return {
      type: actionTypes.DELETE_SYSTEMUSERTYPEPAGE,
      payload: values
    };
  }

  export function deleteSystemUserTypePageSuccess(data: ISystemUserTypePage[]) {
    return {
      type: actionTypes.DELETE_SYSTEMUSERTYPEPAGE_SUCCESS,
      payload: {
        data: data,
      }
    };
  }
  
  export function deleteSystemUserTypePageFailure(error: any) {
    return {
      type: actionTypes.DELETE_SYSTEMUSERTYPEPAGE_FAILURE,
      payload: {
        error: error,
      }
    };
  }

  /* GET SYSTEM USER TYPE PAGE BY ID */

  export function getSystemUserTypePageById(values: ISystemUserTypePage["_id"]) {
    return {
      type: actionTypes.GET_SYSTEMUSERTYPEPAGE_BYID,
      payload: values
    };
  }

  export function getSystemUserTypePageByIdSuccess(data: ISystemUserTypePage[]) {
    return {
      type: actionTypes.GET_SYSTEMUSERTYPEPAGE_BYID_SUCCESS,
      payload: {
        data: data,
      }
    };
  }
  
  export function getSystemUserTypePageByIdFailure(error: any) {
    return {
      type: actionTypes.GET_SYSTEMUSERTYPEPAGE_BYID_FAILURE,
      payload: {
        error: error,
      }
    };
  }

  /* CHECK ACCESS RIGHT */

  export function checkAccessRight(values: ISystemUserTypePageAccessRight) {
    return {
      type: actionTypes.CHECK_ACCESSRIGHT,
      payload: values
    };
  }

  export function checkAccessRightSuccess(data: ISystemUserTypePageAccessRight, accessRight: boolean, message:any) {
    return {
      type: actionTypes.CHECK_ACCESSRIGHT_SUCCESS,
      payload: {
        data: data,
        accessRight: accessRight,
        message: message
      }
    };
  }
  
  export function checkAccessRightFailure(error: any) {
    return {
      type: actionTypes.CHECK_ACCESSRIGHT_FAILURE,
      payload: {
        error: error,
      }
    };
  }
  