export const actionTypes = {
  LOAD_CONTRACT: "LOAD_CONTRACT",
  LOAD_CONTRACT_SUCCESS: "LOAD_CONTRACT_SUCCESS",
  LOAD_CONTRACT_FAIL: "LOAD_CONTRACT_FAIL",
  //
  DELETED_CONTRACT: "DELETED_CONTRACT",
  DELETED_CONTRACT_SUCCESS: "DELETED_CONTRACT_SUCCESS",
  DELETED_CONTRACT_FAIL: "DELETED_CONTRACT_FAIL",
  //
  CREATE_CONTRACT: "CREATE_CONTRACT",
  CREATE_CONTRACT_SUCCESS: "CREATE_CONTRACT_SUCCESS",
  CREATE_CONTRACT_FAIL: "CREATE_CONTRACT_FAIL",
  //
  UPDATE_CONTRACT: "UPDATE_CONTRACT",
  UPDATE_CONTRACT_SUCCESS: "UPDATE_CONTRACT_SUCCESS",
  UPDATE_CONTRACT_FAIL: "UPDATE_CONTRACT_FAIL",
};
export interface IContract {
  _id: string;
  orderNo: number;
  customerId: String;
  numberContract: String;
  nameContract: String;
  date: Date; // ngày ký
  startDay: Date; // ngày có hiệu lực
  endDay: Date; // ngày hết hiệu lực
  durationPay: Date;
  packageBuy: string;
  contractValue: string;
  vat: number; // 0 -> 1
  vatPrice: number; // tính toán từ contractValue * vat,
  publicKey: string;
  privateKey: string;
  status: number;
  fileDoc: {
    name: string;
    chunk: string;
  };
}
export interface ContractState {
  readonly data: IContract[];
}
//load data
export function loadDataContract() {
  return {
    type: actionTypes.LOAD_CONTRACT,
  };
}
export function loadDataContractSuccess(data: IContract[]) {
  return {
    type: actionTypes.LOAD_CONTRACT_SUCCESS,
    payload: {
      data,
    },
  };
}
export function loadDataContractFail(error: any) {
  return {
    type: actionTypes.LOAD_CONTRACT_FAIL,
    payload: {
      error,
    },
  };
}
//deleted data
export function deletedDataContract(id: IContract) {
  return {
    type: actionTypes.DELETED_CONTRACT,
    payload: {
      id,
    },
  };
}
export function deletedDataContractSuccess(data: IContract[], id: IContract) {
  return {
    type: actionTypes.DELETED_CONTRACT_SUCCESS,
    payload: {
      data,
      id,
    },
  };
}
export function deletedDataContractFail(error: any) {
  return {
    type: actionTypes.DELETED_CONTRACT_SUCCESS,
    payload: {
      error,
    },
  };
}
//create data
export function createDataContract(values: IContract) {
  return {
    type: actionTypes.CREATE_CONTRACT,
    payload: {
      values,
    },
  };
}
export function createDataContractSuccess(data: IContract[]) {
  return {
    type: actionTypes.CREATE_CONTRACT_SUCCESS,
    payload: {
      data,
    },
  };
}
export function createDataContractFail(error: any) {
  return {
    type: actionTypes.CREATE_CONTRACT_FAIL,
    payload: {
      error,
    },
  };
}
//update data
export function updateDataContract(values: IContract) {
  return {
    type: actionTypes.UPDATE_CONTRACT,
    payload: {
      values,
    },
  };
}
export function updateDataContractSuccess(data: IContract[], id: IContract) {
  return {
    type: actionTypes.UPDATE_CONTRACT_SUCCESS,
    payload: {
      data,
      id,
    },
  };
}
export function updateDataContractFail(error: any) {
  return {
    type: actionTypes.UPDATE_CONTRACT_FAIL,
    payload: {
      error,
    },
  };
}
