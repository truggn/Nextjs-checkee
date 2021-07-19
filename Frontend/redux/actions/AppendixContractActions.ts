export const actionTypes = {
  GET_APPENDIX_CONTRACT_START: "GET_APPENDIX_CONTRACT_START",
  GET_APPENDIX_CONTRACT_SUCCESS: "GET_APPENDIX_CONTRACT_SUCCESS",
  GET_APPENDIX_CONTRACT_FAILURE: "GET_APPENDIX_CONTRACT_FAILURE",

  CREATE_APPENDIX_CONTRACT_START: "CREATE_APPENDIX_CONTRACT_START",
  CREATE_APPENDIX_CONTRACT_SUCCESS: "CREATE_APPENDIX_CONTRACT_SUCCESS",
  CREATE_APPENDIX_CONTRACT_FAILURE: "CREATE_APPENDIX_CONTRACT_FAILURE",

  UPDATE_APPENDIX_CONTRACT_START: "UPDATE_APPENDIX_CONTRACT_START",
  UPDATE_APPENDIX_CONTRACT_SUCCESS: "UPDATE_APPENDIX_CONTRACT_SUCCESS",
  UPDATE_APPENDIX_CONTRACT_FAILURE: "UPDATE_APPENDIX_CONTRACT_FAILURE",

  DELETE_APPENDIX_CONTRACT_START: "DELETE_APPENDIX_CONTRACT_START",
  DELETE_APPENDIX_CONTRACT_SUCCESS: "DELETE_APPENDIX_CONTRACT_SUCCESS",
  DELETE_APPENDIX_CONTRACT_FAILURE: "DELETE_APPENDIX_CONTRACT_FAILURE",
};

export interface IAppendixContract {
  _id: String;
  numberAppendixContract: String;
  date: string;
  durationPay: Date;
  nameContract: String;
  packageBuy: String;
  contractValue: number;
  vat: number;
  vatPrice: number;
  publicKey: String;
  fileDoc: String;
  privateKey: String;
  startDay: Date;
  endDay: Date;
  customerId: String;
}
export interface AppendixContractState {
  readonly data: IAppendixContract[];
}

/* GET ALL APPENDIX_CONTRACT */

export function getAppendixContractStart() {
  return {
    type: actionTypes.GET_APPENDIX_CONTRACT_START,
  };
}

export function getAppendixContractSuccess(data: IAppendixContract[]) {
  return {
    type: actionTypes.GET_APPENDIX_CONTRACT_SUCCESS,
    payload: {
      data: data,
    },
  };
}

export function getAppendixContractFailure(error: any) {
  return {
    type: actionTypes.GET_APPENDIX_CONTRACT_FAILURE,
    payload: {
      error: error,
    },
  };
}

/* ADD APPENDIX_CONTRACT */

export function createAppendixContractStart(values: IAppendixContract) {
  return {
    type: actionTypes.CREATE_APPENDIX_CONTRACT_START,
    payload: values,
  };
}

export function createAppendixContractSuccess(data: IAppendixContract[]) {
  return {
    type: actionTypes.CREATE_APPENDIX_CONTRACT_SUCCESS,
    payload: {
      data: data,
    },
  };
}

export function createAppendixContractFailure(error: any) {
  return {
    type: actionTypes.CREATE_APPENDIX_CONTRACT_FAILURE,
    payload: {
      error: error,
    },
  };
}

/* UPDATE APPENDIX_CONTRACT */

export function updateAppendixContractStart(updates: IAppendixContract) {
  return {
    type: actionTypes.UPDATE_APPENDIX_CONTRACT_START,
    payload: updates,
  };
}

export function updateAppendixContractSuccess(data: IAppendixContract[]) {
  return {
    type: actionTypes.UPDATE_APPENDIX_CONTRACT_SUCCESS,
    payload: {
      data: data,
    },
  };
}

export function updateAppendixContractFailure(error: any) {
  return {
    type: actionTypes.UPDATE_APPENDIX_CONTRACT_FAILURE,
    payload: {
      error: error,
    },
  };
}

/* DELETE APPENDIX_CONTRACT */

export function deleteAppendixContractStart(id: IAppendixContract) {
  return {
    type: actionTypes.DELETE_APPENDIX_CONTRACT_START,
    payload: {
      id,
    },
  };
}

export function deleteAppendixContractSuccess(
  data: IAppendixContract[],
  id: IAppendixContract
) {
  return {
    type: actionTypes.DELETE_APPENDIX_CONTRACT_SUCCESS,
    payload: {
      data: data,
      id,
    },
  };
}

export function deleteAppendixContractFailure(error: any) {
  return {
    type: actionTypes.DELETE_APPENDIX_CONTRACT_FAILURE,
    payload: {
      error: error,
    },
  };
}
