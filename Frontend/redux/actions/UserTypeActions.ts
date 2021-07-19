import { bool } from "yup";
import { boolean } from "yup/lib/locale";

export const actionTypes = {
    LOAD_USERTYPE: "LOAD_USERTYPE",
    LOAD_USERTYPE_SUCCESS: "LOAD_USERTYPE_SUCCESS",
    LOAD_USERTYPE_FAILURE: "LOAD_USERTYPE_FAILURE",

    ADD_USERTYPE: "ADD_USERTYPE",
    ADD_USERTYPE_SUCCESS: "ADD_USERTYPE_SUCCESS",
    ADD_USERTYPE_FAILURE: "ADD_USERTYPE_FAILURE",

    UPDATE_USERTYPE: "UPDATE_USERTYPE",
    UPDATE_USERTYPE_SUCCESS: "UPDATE_USERTYPE_SUCCESS",
    UPDATE_USERTYPE_FAILURE: "UPDATE_USERTYPE_FAILURE",

    DELETE_USERTYPE: "DELETE_USERTYPE",
    DELETE_USERTYPE_SUCCESS: "DELETE_USERTYPE_SUCCESS",
    DELETE_USERTYPE_FAILURE: "DELETE_USERTYPE_FAILURE",

    GET_USERTYPE_BYID: "GET_USERTYPE_BYID",
    GET_USERTYPE_BYID_SUCCESS: "GET_USERTYPE_BYID_SUCCESS",
    GET_USERTYPE_BYID_FAILURE: "GET_USERTYPE_BYID_FAILURE",
  };

export interface IUserType {
    _id: string;
    name: string;
    orderNo: String;
    note: String;
    objectId: String;
}
export interface UserTypeState {
  readonly data: IUserType[],
}

/* GET ALL SYSTEM PAGE */

  export function loadUserType() {
    return {
      type: actionTypes.LOAD_USERTYPE
    };
  }
  
  export function loadDataSuccess(data: IUserType[]) {
    return {
      type: actionTypes.LOAD_USERTYPE_SUCCESS,
      payload: {
        data: data
      }
    };
  }
  
  export function loadDataFailure(error: any) {
    return {
      type: actionTypes.LOAD_USERTYPE_FAILURE,
      payload: {
        error: error
      }
    };
  }

  /* ADD SYSTEM PAGE */

  export function addUserType(values: IUserType) {
    return {
      type: actionTypes.ADD_USERTYPE,
      payload: values
    };
  }

  export function addUserTypeSuccess(data: IUserType[]) {
    return {
      type: actionTypes.ADD_USERTYPE_SUCCESS,
      payload: {
        data: data,
      }
    };
  }
  
  export function addUserTypeFailure(error: any) {
    return {
      type: actionTypes.ADD_USERTYPE_FAILURE,
      payload: {
        error: error,
      }
    };
  }


  /* UPDATE SYSTEM PAGE */

  export function updateUserType(values: IUserType) {
    return {
      type: actionTypes.UPDATE_USERTYPE,
      payload: values
    };
  }

  export function updateUserTypeSuccess(data: IUserType[]) {
    return {
      type: actionTypes.UPDATE_USERTYPE_SUCCESS,
      payload: {
        data: data,
      }
    };
  }
  
  export function updateUserTypeFailure(error: any) {
    return {
      type: actionTypes.UPDATE_USERTYPE_FAILURE,
      payload: {
        error: error,
      }
    };
  }


  /* DELETE SYSTEM PAGE */

  export function deleteUserType(values: IUserType) {
    return {
      type: actionTypes.DELETE_USERTYPE,
      payload: values
    };
  }

  export function deleteUserTypeSuccess(data: IUserType[]) {
    return {
      type: actionTypes.DELETE_USERTYPE_SUCCESS,
      payload: {
        data: data,
      }
    };
  }
  
  export function deleteUserTypeFailure(error: any) {
    return {
      type: actionTypes.DELETE_USERTYPE_FAILURE,
      payload: {
        error: error,
      }
    };
  }

  /* GET SYSTEM PAGE BY LEVEL */

  export function getUserTypeById(values: IUserType["_id"]) {
    return {
      type: actionTypes.GET_USERTYPE_BYID,
      payload: values
    };
  }

  export function getUserTypeByIdSuccess(data: IUserType[]) {
    return {
      type: actionTypes.GET_USERTYPE_BYID_SUCCESS,
      payload: {
        data: data,
      }
    };
  }
  
  export function getUserTypeByIdFailure(error: any) {
    return {
      type: actionTypes.GET_USERTYPE_BYID_FAILURE,
      payload: {
        error: error,
      }
    };
  }
  