//phương thức action
export const actionTypes = {
  //load data
  LOAD_DATA_USER: "LOAD_DATA_USER",
  LOAD_DATA_USER_SUCCESS: "LOAD_DATA_USER_SUCCESS",
  LOAD_DATA_USER_FAILURE: "LOAD_DATA_USER_FAILURE",
  /// xóa data
  DELETED_USER: "DELETED_USER",
  DELETED_USER_SUCCESS: "DELETED_USER_SUCCESS",
  DELETED_USER_FAILURE: "DELETED_USER_FAILURE",
  ///tạo data
  CREATE_DATA_USER: "CREATE_DATA_USER",
  CREATE_DATA_USER_SUCCSESS: "CREATE_DATA_USER_SUCCSESS",
  CREATE_DATA_USER_FAILURE: "CREATE_DATA_USER_FAILURE",
  //sửa data
  UPDATE_DATA_USER: "UPDATE_DATA_USER",
  UPDATE_DATA_USER_SUCCESS: "UPDATE_DATA_USER_SUCCESS",
  UPDATE_DATA_USER_FAILURE: "UPDATE_DATA_USER_FAILURE",
  //thay đổi trạng thái status active
  UPDATE_STATUS_USER: "UPDATE_STATUS_USER",
  UPDATE_STATUS_USER_SUCCESS: "UPDATE_STATUS_USER_SUCCESS",
  UPDATE_STATUS_USER_FAILURE: "UPDATE_STATUS_USER_FAILURE",
  //
  UPDATE_NO_STATUS_USER: "UPDATE_NO_STATUS_USER",
  UPDATE_NO_STATUS_USER_SUCCESS: "UPDATE_NO_STATUS_USER_SUCCESS",
  UPDATE_NO_STATUS_USER_FAILURE: "UPDATE_NO_STATUS_USER_FAILURE",
};
// //
// export interface IListUserupdate {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   birthday: string;
//   email: string;
//   sex: number;
//   address: string;
//   userType: string;
//   userTypeId: string;
//   certificate_image: string;
// }
//nơi lưu trữ dữ liệu
export interface IListUser {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthday?: string;
  sex: number;
  status: number;
  address: string;
  passwordFailures: number;
  userType: string;
  userTypeId: string;
  password: string;
  userRole: string;
  passwordConfirm: string;
  certificate_image: string;
}
// gọi khi truyen danh sách dữ liệu
export interface ListUserState {
  readonly data: IListUser[];
  loading: boolean;
}
//tải dữ liệu
export function loadData() {
  return {
    type: actionTypes.LOAD_DATA_USER,
  };
}

export function loadDataSuccess(data: IListUser[]) {
  return {
    type: actionTypes.LOAD_DATA_USER_SUCCESS,
    payload: {
      data: data,
    },
  };
}

export function loadDataFailure(error: any) {
  return {
    type: actionTypes.LOAD_DATA_USER_FAILURE,
    payload: {
      error: error,
    },
  };
}
//xóa dữ liệu
export function deletedUser(id: IListUser) {
  return {
    type: actionTypes.DELETED_USER,
    payload: {
      id,
    },
  };
}

export function deletedUserSuccess(data: IListUser[], id: IListUser) {
  return {
    type: actionTypes.DELETED_USER_SUCCESS,
    payload: {
      data,
      id,
    },
  };
}

export function deletedUserFailure(error: any) {
  return {
    type: actionTypes.LOAD_DATA_USER_FAILURE,
    payload: {
      error: error,
    },
  };
}
//tạo dữ liệu
export function createData(values: IListUser) {
  return {
    type: actionTypes.CREATE_DATA_USER,
    payload: values,
  };
}

export function createDataSuccess(data: IListUser[]) {
  return {
    type: actionTypes.CREATE_DATA_USER_SUCCSESS,
    payload: {
      data,
    },
  };
}

export function createDataFail(error: any) {
  return {
    type: actionTypes.CREATE_DATA_USER_FAILURE,
    payload: {
      error: error,
    },
  };
}
//cập nhật dữ liệu
export function updateData(values: IListUser) {
  return {
    type: actionTypes.UPDATE_DATA_USER,
    payload: {
      values,
    },
  };
}
//cập nhật dữ liệu thành công
export function updateDataSuccess(data: IListUser[], id: string) {
  return {
    type: actionTypes.UPDATE_DATA_USER_SUCCESS,
    payload: {
      data: data,
      id,
    },
  };
}
//cập nhật dữ liệu thất bại
export function updateDataFail(error: any) {
  return {
    type: actionTypes.UPDATE_DATA_USER_FAILURE,
    payload: {
      error: error,
    },
  };
}
//cập nhật status hoạt động
export function updateStatus(values: IListUser) {
  return {
    type: actionTypes.UPDATE_STATUS_USER,
    payload: {
      values,
    },
  };
}

export function updateStatusSuccess(data: IListUser[], id: IListUser) {
  return {
    type: actionTypes.UPDATE_STATUS_USER_SUCCESS,
    payload: {
      data: data,
      id,
    },
  };
}

export function updateStatusFail(error: any) {
  return {
    type: actionTypes.UPDATE_STATUS_USER_FAILURE,
    payload: {
      error: error,
    },
  };
}
//cập nhật status không hoạt động
export function updateStatusNoActive(values: IListUser) {
  return {
    type: actionTypes.UPDATE_NO_STATUS_USER,
    payload: {
      values,
    },
  };
}

export function updateStatusNoActiveSuccess(data: IListUser[], id: string) {
  return {
    type: actionTypes.UPDATE_NO_STATUS_USER_SUCCESS,
    payload: {
      data: data,
      id,
    },
  };
}

export function updateStatusNoActiveFail(error: any) {
  return {
    type: actionTypes.UPDATE_NO_STATUS_USER_FAILURE,
    payload: {
      error: error,
    },
  };
}
