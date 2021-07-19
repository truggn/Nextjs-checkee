//phương thức action
export const actionTypes = {
    //get data
    LOAD_USER_MANAGE: "LOAD_USER_MANAGE",
    LOAD_USER_MANAGE_SUCCESS: "LOAD_USER_MANAGE_SUCCESS",
    LOAD_USER_MANAGE_FAILURE: "LOAD_USER_MANAGE_FAILURE",
    // /// delete data
    // DELETED_PARTICIPANT: "DELETED_PARTICIPANT",
    // DELETED_PARTICIPANT_SUCCESS: "DELETED_PARTICIPANT_SUCCESS",
    // DELETED_PARTICIPANT_FAILURE: "DELETED_PARTICIPANT_FAILURE",
    ///create data
    CREATE_USER_MANAGE: "CREATE_USER_MANAGE",
    CREATE_USER_MANAGE_SUCCSESS: "CREATE_USER_MANAGE_SUCCSESS",
    CREATE_USER_MANAGE_FAILURE: "CREATE_USER_MANAGE_FAILURE",
    // //update data
    // UPDATE_DATA_PARTICIPANT: "UPDATE_DATA_PARTICIPANT",
    // UPDATE_DATA_PARTICIPANT_SUCCESS: "UPDATE_DATA_PARTICIPANT_SUCCESS",
    // UPDATE_DATA_PARTICIPANT_FAILURE: "UPDATE_DATA_PARTICIPANT_FAILURE",
};
export interface IListUserManage {
  name:string;
    _id: string,
    userId: {
        email: string,
    },  
    updatedAt: Date,
    createdAt: Date
}
export interface ICreateUserManage {
    userId: string,
    organizationId: string
}
//
export function loadUserManage(value: string) {
    return {
        type: actionTypes.LOAD_USER_MANAGE,
        payload: {
            value,
        },
    };
}

export function loadUserManageSuccess(data: IListUserManage[]) {
    return {
        type: actionTypes.LOAD_USER_MANAGE_SUCCESS,
        payload: {
            data: data,
        },
    };
}

export function loadUserManageFailure(error: any) {
    return {
        type: actionTypes.LOAD_USER_MANAGE_FAILURE,
        payload: {
            error: error,
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
  export function createUserManage(values: ICreateUserManage) {
    return {
      type: actionTypes.CREATE_USER_MANAGE,
      payload: values,
    };
  }

  export function createUserManageSuccess(data: ICreateUserManage[]) {
    return {
      type: actionTypes.CREATE_USER_MANAGE_SUCCSESS,
      payload: {
        data,
      },
    };
  }

  export function createUserManageFailure(error: any) {
    return {
      type: actionTypes.CREATE_USER_MANAGE_FAILURE,
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
