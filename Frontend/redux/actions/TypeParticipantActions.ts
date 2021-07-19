//phương thức action
export const actionTypes = {
    //get data
    LOAD_TYPE_PARTICIPANT: "LOAD_TYPE_PARTICIPANT",
    LOAD_TYPE_PARTICIPANT_SUCCESS: "LOAD_TYPE_PARTICIPANT_SUCCESS",
    LOAD_TYPE_PARTICIPANT_FAILURE: "LOAD_TYPE_PARTICIPANT_FAILURE",
  };
  export interface ITypeParticipant {
    _id: string,
    name: string,
    code: string,
    description: string
  }
  
  //
  export function loadTypeParticipant() {
    return {
      type: actionTypes.LOAD_TYPE_PARTICIPANT,
    };
  }
  
  export function loadTypeParticipantSuccess(data: ITypeParticipant[]) {
    return {
      type: actionTypes.LOAD_TYPE_PARTICIPANT_SUCCESS,
      payload: {
        data: data,
      },
    };
  }
  
  export function loadTypeParticipantFailure(error: any) {
    return {
      type: actionTypes.LOAD_TYPE_PARTICIPANT_FAILURE,
      payload: {
        error: error,
      },
    };
  }
  //

