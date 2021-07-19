//phương thức action
export const actionTypes = {
    //get data
    LOAD_DATA_PARTICIPANT: "LOAD_DATA_PARTICIPANT",
    LOAD_DATA_PARTICIPANT_SUCCESS: "LOAD_DATA_PARTICIPANT_SUCCESS",
    LOAD_DATA_PARTICIPANT_FAILURE: "LOAD_DATA_PARTICIPANT_FAILURE",
    /// delete data
    DELETED_PARTICIPANT: "DELETED_PARTICIPANT",
    DELETED_PARTICIPANT_SUCCESS: "DELETED_PARTICIPANT_SUCCESS",
    DELETED_PARTICIPANT_FAILURE: "DELETED_PARTICIPANT_FAILURE",
    ///create data
    CREATE_DATA_PARTICIPANT: "CREATE_DATA_PARTICIPANT",
    CREATE_DATA_PARTICIPANT_SUCCSESS: "CREATE_DATA_PARTICIPANT_SUCCSESS",
    CREATE_DATA_PARTICIPANT_FAILURE: "CREATE_DATA_PARTICIPANT_FAILURE",
    //update data
    UPDATE_DATA_PARTICIPANT: "UPDATE_DATA_PARTICIPANT",
    UPDATE_DATA_PARTICIPANT_SUCCESS: "UPDATE_DATA_PARTICIPANT_SUCCESS",
    UPDATE_DATA_PARTICIPANT_FAILURE: "UPDATE_DATA_PARTICIPANT_FAILURE",
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
  export function loadData() {
    return {
      type: actionTypes.LOAD_DATA_PARTICIPANT,
    };
  }
  
  export function loadDataSuccess(data: IListParticipant[]) {
    return {
      type: actionTypes.LOAD_DATA_PARTICIPANT_SUCCESS,
      payload: {
        data: data,
      },
    };
  }
  
  export function loadDataFailure(error: any) {
    return {
      type: actionTypes.LOAD_DATA_PARTICIPANT_FAILURE,
      payload: {
        error: error,
      },
    };
  }
  //
  export function deletedData(id: string) {
    return {
      type: actionTypes.DELETED_PARTICIPANT,
      payload: {
        id,
      },
    };
  }
  
  export function deletedDataSuccess(data: IListParticipant[], id: IListParticipant) {
    return {
      type: actionTypes.DELETED_PARTICIPANT_SUCCESS,
      payload: {
        data,
        id,
      },
    };
  }
  
  export function deletedDataFailure(error: any) {
    return {
      type: actionTypes.LOAD_DATA_PARTICIPANT_FAILURE,
      payload: {
        error: error,
      },
    };
  }
  //
  export function createData(values: IListParticipant) {
    return {
      type: actionTypes.CREATE_DATA_PARTICIPANT,
      payload: values,
    };
  }
  
  export function createDataSuccess(data: IListParticipant[]) {
    return {
      type: actionTypes.CREATE_DATA_PARTICIPANT_SUCCSESS,
      payload: {
        data,
      },
    };
  }
  
  export function createDataFailure(error: any) {
    return {
      type: actionTypes.CREATE_DATA_PARTICIPANT_FAILURE,
      payload: {
        error: error,
      },
    };
  }
  //
  export function updateData(values: IListParticipant) {
    return {
      type: actionTypes.UPDATE_DATA_PARTICIPANT,
      payload: {
        values,
      },
    };
  }

  export function updateDataSuccess(data: IListParticipant[], id: string) {
    return {
      type: actionTypes.UPDATE_DATA_PARTICIPANT_SUCCESS,
      payload: {
        data: data,
        id,
      },
    };
  }

  export function updateDataFailure(error: any) {
    return {
      type: actionTypes.UPDATE_DATA_PARTICIPANT_FAILURE,
      payload: {
        error: error,
      },
    };
  }
