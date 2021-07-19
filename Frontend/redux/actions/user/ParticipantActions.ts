//phương thức action
export const actionTypes = {
    //get data
    LOAD_DATA_PARTICIPANT_USER: "LOAD_DATA_PARTICIPANT_USER",
    LOAD_DATA_PARTICIPANT_USER_SUCCESS: "LOAD_DATA_PARTICIPANT_USER_SUCCESS",
    LOAD_DATA_PARTICIPANT_USER_FAILURE: "LOAD_DATA_PARTICIPANT_USER_FAILURE",
    /// delete data
    DELETED_PARTICIPANT_USER: "DELETED_PARTICIPANT_USER",
    DELETED_PARTICIPANT_USER_SUCCESS: "DELETED_PARTICIPANT_USER_SUCCESS",
    DELETED_PARTICIPANT_USER_FAILURE: "DELETED_PARTICIPANT_USER_FAILURE",
    ///create data
    CREATE_DATA_PARTICIPANT_USER: "CREATE_DATA_PARTICIPANT_USER",
    CREATE_DATA_PARTICIPANT_USER_SUCCSESS: "CREATE_DATA_PARTICIPANT_USER_SUCCSESS",
    CREATE_DATA_PARTICIPANT_USER_FAILURE: "CREATE_DATA_PARTICIPANT_USER_FAILURE",
    //update data
    UPDATE_DATA_PARTICIPANT_USER: "UPDATE_DATA_PARTICIPANT_USER",
    UPDATE_DATA_PARTICIPANT_USER_SUCCESS: "UPDATE_DATA_PARTICIPANT_USER_SUCCESS",
    UPDATE_DATA_PARTICIPANT_USER_FAILURE: "UPDATE_DATA_PARTICIPANT_USER_FAILURE",
  };
  export interface IListParticipant {
    _id: string,
    participantName: string,
    code: string,
    participantType: {
      description: string,
    },
    address: string,
    phone: number,
    email: string,
    createBy: string,
    confirm_password: string,
    organizationId: string,
    icon: string
  }
  
  //
  export function loadData(id) {
    return {
      type: actionTypes.LOAD_DATA_PARTICIPANT_USER,
      payload:{
        id
      }
    };
  }
  
  export function loadDataSuccess(data: IListParticipant[]) {
    return {
      type: actionTypes.LOAD_DATA_PARTICIPANT_USER_SUCCESS,
      payload: {
        data: data,
      },
    };
  }
  
  export function loadDataFailure(error: any) {
    return {
      type: actionTypes.LOAD_DATA_PARTICIPANT_USER_FAILURE,
      payload: {
        error: error,
      },
    };
  }
  //
  export function deletedData(id: string) {
    return {
      type: actionTypes.DELETED_PARTICIPANT_USER,
      payload: {
        id,
      },
    };
  }
  
  export function deletedDataSuccess(data: IListParticipant[], id: IListParticipant) {
    return {
      type: actionTypes.DELETED_PARTICIPANT_USER_SUCCESS,
      payload: {
        data,
        id,
      },
    };
  }
  
  export function deletedDataFailure(error: any) {
    return {
      type: actionTypes.LOAD_DATA_PARTICIPANT_USER_FAILURE,
      payload: {
        error: error,
      },
    };
  }
  //
  export function createData(values: IListParticipant) {
    return {
      type: actionTypes.CREATE_DATA_PARTICIPANT_USER,
      payload: values,
    };
  }
  
  export function createDataSuccess(data: IListParticipant[]) {
    return {
      type: actionTypes.CREATE_DATA_PARTICIPANT_USER_SUCCSESS,
      payload: {
        data,
      },
    };
  }
  
  export function createDataFailure(error: any) {
    return {
      type: actionTypes.CREATE_DATA_PARTICIPANT_USER_FAILURE,
      payload: {
        error: error,
      },
    };
  }
  //
  export function updateData(values: IListParticipant) {
    return {
      type: actionTypes.UPDATE_DATA_PARTICIPANT_USER,
      payload: {
        values,
      },
    };
  }

  export function updateDataSuccess(data: IListParticipant[], id: string) {
    return {
      type: actionTypes.UPDATE_DATA_PARTICIPANT_USER_SUCCESS,
      payload: {
        data: data,
        id,
      },
    };
  }

  export function updateDataFailure(error: any) {
    return {
      type: actionTypes.UPDATE_DATA_PARTICIPANT_USER_FAILURE,
      payload: {
        error: error,
      },
    };
  }
