//phương thức action
export const actionTypes = {
  //get data
  LOAD_PROCESS_MANAGEUSER: "LOAD_PROCESS_MANAGEUSER",
  LOAD_PROCESS_MANAGEUSER_SUCCESS: "LOAD_PROCESS_MANAGEUSER_SUCCESS",
  LOAD_PROCESS_MANAGEUSER_FAILURE: "LOAD_PROCESS_MANAGEUSER_FAILURE",
  // /// delete data
  // DELETED_PARTICIPANT: "DELETED_PARTICIPANT",
  // DELETED_PARTICIPANT_SUCCESS: "DELETED_PARTICIPANT_SUCCESS",
  // DELETED_PARTICIPANT_FAILURE: "DELETED_PARTICIPANT_FAILURE",
  ///create data
  CREATE_PROCESS_MANAGEUSER: "CREATE_PROCESS_MANAGEUSER",
  CREATE_PROCESS_MANAGEUSER_SUCCSESS: "CREATE_PROCESS_MANAGEUSER_SUCCSESS",
  CREATE_PROCESS_MANAGEUSER_FAILURE: "CREATE_PROCESS_MANAGEUSER_FAILURE",
  // //update data
  // UPDATE_DATA_PARTICIPANT: "UPDATE_DATA_PARTICIPANT",
  // UPDATE_DATA_PARTICIPANT_SUCCESS: "UPDATE_DATA_PARTICIPANT_SUCCESS",
  // UPDATE_DATA_PARTICIPANT_FAILURE: "UPDATE_DATA_PARTICIPANT_FAILURE",
  GET_DETAIL_PROCESS_MANAGE: "GET_DETAIL_PROCESS_MANAGE",
};
export interface IListProcessManage {
  _id: string;
  code: string;
  name: string;
  organizationId: {
    name_customer: string;
  };
  productTypeId: {
    _id: string;
    name: string;
  };
  createdBy: string;
}

//
export function loadProcessManage(id) {
  return {
    type: actionTypes.LOAD_PROCESS_MANAGEUSER,
    payload: id,
  };
}

export function loadProcessManageSuccess(data: IListProcessManage[]) {
  return {
    type: actionTypes.LOAD_PROCESS_MANAGEUSER_SUCCESS,
    payload: {
      data: data,
    },
  };
}

export function loadProcessManageFailure(error: any) {
  return {
    type: actionTypes.LOAD_PROCESS_MANAGEUSER_FAILURE,
    payload: {
      error: error,
    },
  };
}
export function getDetailProcessManage(value: string) {
  return {
    type: actionTypes.GET_DETAIL_PROCESS_MANAGE,
    payload: {
      value,
    },
  };
}
//
//   export function deletedData(id: string) {
//     return {
//       type: actionTypes.DELETED_PARTICIPANT,
//       payload: {
//         id,
//       },
//     };
//   }

//   export function deletedDataSuccess(data: IListParticipant[], id: IListParticipant) {
//     return {
//       type: actionTypes.DELETED_PARTICIPANT_SUCCESS,
//       payload: {
//         data,
//         id,
//       },
//     };
//   }

//   export function deletedDataFailure(error: any) {
//     return {
//       type: actionTypes.LOAD_DATA_PARTICIPANT_FAILURE,
//       payload: {
//         error: error,
//       },
//     };
//   }
//   //
export function createProcessManage(values: IListProcessManage) {
  return {
    type: actionTypes.CREATE_PROCESS_MANAGEUSER,
    payload: values,
  };
}

export function createProcessManageSuccess(data: IListProcessManage[]) {
  return {
    type: actionTypes.CREATE_PROCESS_MANAGEUSER_SUCCSESS,
    payload: {
      data,
    },
  };
}

export function createProcessManageFailure(error: any) {
  return {
    type: actionTypes.CREATE_PROCESS_MANAGEUSER_FAILURE,
    payload: {
      error: error,
    },
  };
}
//   //
//   export function updateData(values: IListParticipant) {
//     return {
//       type: actionTypes.UPDATE_DATA_PARTICIPANT,
//       payload: {
//         values,
//       },
//     };
//   }

//   export function updateDataSuccess(data: IListParticipant[], id: string) {
//     return {
//       type: actionTypes.UPDATE_DATA_PARTICIPANT_SUCCESS,
//       payload: {
//         data: data,
//         id,
//       },
//     };
//   }

//   export function updateDataFailure(error: any) {
//     return {
//       type: actionTypes.UPDATE_DATA_PARTICIPANT_FAILURE,
//       payload: {
//         error: error,
//       },
//     };
//   }
