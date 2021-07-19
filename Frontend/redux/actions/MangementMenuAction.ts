export const actionTypes = {
  LOAD_DATA_MANAGEMENT: "LOAD_DATA_MANAGEMENT",
  LOAD_DATA_MANAGEMENT_SUCCESS: "LOAD_DATA_MANAGEMENT_SUCCESS",
  LOAD_DATA_MANAGEMENT_FAIL: "LOAD_DATA_MANAGEMENT_FAIL",
  //
  DELETED_DATA_MANAGEMENT: "DELETED_DATA_MANAGEMENT",
  DELETED_DATA_MANAGEMENT_SUCCESS: "DELETED_DATA_MANAGEMENT_SUCCESS",
  DELETED_DATA_MANAGEMENT_FAIL: "DELETED_DATA_MANAGEMENT_FAIL",
  //
  CREATE_DATA_MANAGEMENT: "CREATE_DATA_MANAGEMENT",
  CREATE_DATA_MANAGEMENT_SUCCESS: "CREATE_DATA_MANAGEMENT_SUCCESS",
  CREATE_DATA_MANAGEMENT_FAIL: "CREATE_DATA_MANAGEMENT_FAIL",
  //
  UPDATE_DATA_MANAGEMENT: "UPDATE_DATA_MANAGEMENT",
  UPDATE_DATA_MANAGEMENT_SUCCESS: "UPDATE_DATA_MANAGEMENT_SUCCESS",
  UPDATE_DATA_MANAGEMENT_FAIL: "UPDATE_DATA_MANAGEMENT_FAIL",
};
//
export interface IMenu {
  _id: string;
  clas: string;
  pageId: string;
  name: string;
  orderNo: number;
  url: string;
  isDashBoard: boolean;
  isVisible: boolean;
  parentId: string;
}
export interface IMenuState {
  readonly data: IMenu[];
}
//tai du lieu
export function loadData() {
  return {
    type: actionTypes.LOAD_DATA_MANAGEMENT,
  };
}
export function loadDataSuccess(data: IMenu[]) {
  return {
    type: actionTypes.LOAD_DATA_MANAGEMENT_SUCCESS,
    payload: {
      data,
    },
  };
}
export function loadDataFail(error: any) {
  return {
    type: actionTypes.LOAD_DATA_MANAGEMENT_FAIL,
    payload: {
      error,
    },
  };
}
// xoa du lieu
export function deletedData(id: IMenu) {
  return {
    type: actionTypes.DELETED_DATA_MANAGEMENT,
    payload: {
      id,
    },
  };
}
export function deletedDataSuccess(data: IMenu[], id: IMenu) {
  return {
    type: actionTypes.DELETED_DATA_MANAGEMENT_SUCCESS,
    payload: {
      data,
      id,
    },
  };
}
export function deletedDataFail(error: any) {
  return {
    type: actionTypes.DELETED_DATA_MANAGEMENT_FAIL,
    payload: {
      error,
    },
  };
}
//tao du lieu
export function createData(values: IMenu) {
  return {
    type: actionTypes.CREATE_DATA_MANAGEMENT,
    payload: {
      values,
    },
  };
}
export function createDataSuccess(data: IMenu[]) {
  return {
    type: actionTypes.CREATE_DATA_MANAGEMENT_SUCCESS,
    payload: {
      data,
    },
  };
}
export function createDataFail(error: any) {
  return {
    type: actionTypes.CREATE_DATA_MANAGEMENT_FAIL,
    payload: {
      error,
    },
  };
}
//sua du lieu
export function updateData(values: IMenu) {
  return {
    type: actionTypes.UPDATE_DATA_MANAGEMENT,
    payload: {
      values,
    },
  };
}
export function updateDataSuccess(data: IMenu[], id: IMenu) {
  return {
    type: actionTypes.UPDATE_DATA_MANAGEMENT_SUCCESS,
    payload: {
      data,
      id,
    },
  };
}
export function updateDataFail(error: any) {
  return {
    type: actionTypes.UPDATE_DATA_MANAGEMENT_FAIL,
    payload: {
      error,
    },
  };
}
