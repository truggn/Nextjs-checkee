export const actionTypes = {
  CREATE_DATA_PROCESSOFPRODUCT: "CREATE_DATA_PROCESSOFPRODUCT",
  CREATE_DATA_PROCESSOFPRODUCT_SUCCESS: "CREATE_DATA_PROCESSOFPRODUCT_SUCCESS",
  CREATE_DATA_PROCESSOFPRODUCT_FAIL: "CREATE_DATA_PROCESSOFPRODUCT_FAIL",

  // type update 
  UPDATE_PROCESSOFPRODUCT: "UPDATE_PROCESSOFPRODUCT",
  UPDATE_PROCESSOFPRODUCT_SUCCESS: "UPDATE_PROCESSOFPRODUCT_SUCCESS",
  UPDATE_PROCESSOFPRODUCT_FAIL: "UPDATE_PROCESSOFPRODUCT_FAIL",

};

// interface product
export interface IProduct {
  code: string;
  name: string;
}

//
export function createProcessOfProduct(id: any, data: any) {
  return {
    type: actionTypes.CREATE_DATA_PROCESSOFPRODUCT,
    payload: {
      id,
      data,
    },
  };
}
export function createProcessOfProductSuccess(data: any) {
  return {
    type: actionTypes.CREATE_DATA_PROCESSOFPRODUCT_SUCCESS,
    payload: {
      data,
    },
  };
}
export function createProcessOfProductFail(error: any) {
  return {
    type: actionTypes.CREATE_DATA_PROCESSOFPRODUCT_FAIL,
    payload: {
      error,
    },
  };
}

// action update 
export function updateProcessOfProduct(values: IProduct[]) {
  return {
    type: actionTypes.UPDATE_PROCESSOFPRODUCT,
    payload: { values }
  }
}

export function updateProcessOfProductSuccess(data: IProduct[]) {
  return {
    type: actionTypes.UPDATE_PROCESSOFPRODUCT_SUCCESS,
    payload: {
      data: data,
    }
  }
}

export function updateProcessOfProductFail(error: any) {
  return {
    type: actionTypes.UPDATE_PROCESSOFPRODUCT_FAIL,
    payload: {
      error
    }
  }
}
