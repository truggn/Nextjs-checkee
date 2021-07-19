export const actionTypes = {
  // CREATE SETTING PARTICIPANT
  CREATE_SETTING_PROCESS_PARTICIPANT: "CREATE_SETTING_PROCESS_PARTICIPANT",
  CREATE_SETTING_PROCESS_PARTICIPANT_SUCCESS: "CREATE_SETTING_PROCESS_PARTICIPANT_SUCCESS",
  CREATE_SETTING_PROCESS_PARTICIPANT_FAILURE: "CREATE_SETTING_PROCESS_PARTICIPANT_FAILURE",
  // LOAD SETTING PARTICIPANT
  LOAD_SETTING_PROCESS_PARTICIPANT: "LOAD_SETTING_PROCESS_PARTICIPANT",
  LOAD_SETTING_PROCESS_PARTICIPANT_SUCCESS: "LOAD_SETTING_PROCESS_PARTICIPANT_SUCCESS",
  LOAD_SETTING_PROCESS_PARTICIPANT_FAILURE: "LOAD_SETTING_PROCESS_PARTICIPANT_FAILURE",
  // LOAD SETTING PROPS
  LOAD_SETTING_PROCESS_PROPS: "LOAD_SETTING_PROCESS_PROPS",
  LOAD_SETTING_PROCESS_PROPS_SUCCESS: "LOAD_SETTING_PROCESS_PROPS_SUCCESS",
  LOAD_SETTING_PROCESS_PROPS_FAILURE: "LOAD_SETTING_PROCESS_PROPS_FAILURE",
  // CREATE SETTING PROPS
  CREATE_SETTING_PROCESS_PROPS: "CREATE_SETTING_PROCESS_PROPS",
  CREATE_SETTING_PROCESS_PROPS_SUCCESS: "CREATE_SETTING_PROCESS_PROPS_SUCCESS",
  CREATE_SETTING_PROCESS_PROPS_FAILURE: "CREATE_SETTING_PROCESS_PROPS_FAILURE",
};
//
export interface ISetting {
  _id: string;
  email: string;
  participantName: string;
  phone: string;
  participantType: string;
  address: string;
  code: string;
  organizationId: string;
}


// CREATE SETTING PARTICIPANT
export function createSettingParticipant(values: any) {
  return {
    type: actionTypes.CREATE_SETTING_PROCESS_PARTICIPANT,
    payload: {
      values,
    },
  };
}
export function createSettingParticipantSuccess(data: ISetting[]) {
  return {
    type: actionTypes.CREATE_SETTING_PROCESS_PARTICIPANT_SUCCESS,
    payload: {
      data,
    },
  };
}
export function createSettingParticipantFailure(error) {
  return {
    type: actionTypes.CREATE_SETTING_PROCESS_PARTICIPANT_FAILURE,
    payload: {
      error,
    },
  };
}

// LOAD SETTING PARTICIPANT
export function loadSettingParticipant(id: string) {
  return {
    type: actionTypes.LOAD_SETTING_PROCESS_PARTICIPANT,
    payload: {
      id,
    },
  };
}

export function loadSettingParticipantSuccess(data: ISetting[]) {
  return {
    type: actionTypes.LOAD_SETTING_PROCESS_PARTICIPANT_SUCCESS,
    payload: {
      data,
    },
  };
}
export function loadSettingParticipantFailure(error) {
  return {
    type: actionTypes.LOAD_SETTING_PROCESS_PARTICIPANT_FAILURE,
    payload: {
      error,
    },
  };
}

// LOAD SETTING PROPS
export function loadSettingProps(id: string) {
  return {
    type: actionTypes.LOAD_SETTING_PROCESS_PROPS,
    payload: {
      id,
    },
  };
}

export function loadSettingPropsSuccess(data: ISetting[], id: string) {
  return {
    type: actionTypes.LOAD_SETTING_PROCESS_PROPS_SUCCESS,
    payload: {
      data,
      id
    },
  };
}
export function loadSettingPropsFailure(error) {
  return {
    type: actionTypes.LOAD_SETTING_PROCESS_PROPS_FAILURE,
    payload: {
      error,
    },
  };
}

// CREATE SETTING PARTICIPANT
export function createSettingProps(values: any) {
  return {
    type: actionTypes.CREATE_SETTING_PROCESS_PROPS,
    payload: {
      values,
    },
  };
}
export function createSettingPropsSuccess(data: ISetting[]) {
  return {
    type: actionTypes.CREATE_SETTING_PROCESS_PROPS_SUCCESS,
    payload: {
      data,
    },
  };
}
export function createSettingPropsFailure(error) {
  return {
    type: actionTypes.CREATE_SETTING_PROCESS_PROPS_FAILURE,
    payload: {
      error,
    },
  };
}