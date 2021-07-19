export const actionTypes = {
  LOAD_PRODUCT_WITHOUT_PROCESS: "LOAD_PRODUCT_WITHOUT_PROCESS",
  LOAD_PRODUCT_WITHOUT_PROCESS_SUCCESS: "LOAD_PRODUCT_WITHOUT_PROCESS_SUCCESS",
  LOAD_PRODUCT_WITHOUT_PROCESS_FAILED: "LOAD_PRODUCT_WITHOUT_PROCESS_FAILED",
  ADD_PRODUCT_WITHOUT_PROCESS: "ADD_PRODUCT_WITHOUT_PROCESS",
  ADD_PRODUCT_WITHOUT_PROCESS_SUCCESS: "ADD_PRODUCT_WITHOUT_PROCESS_SUCCESS",
  ADD_PRODUCT_WITHOUT_PROCESS_FAILED: "ADD_PRODUCT_WITHOUT_PROCESS_FAILED",
};

export interface IProductWithoutProcess {
  _id: string;
  productId: string;
  productTypeId: {
    name: string;
  };
  organizationId: {
    name_customer: string;
  };
  productFlowId: string;
  code: string;
  name: string;
}
//get
export function loadDataProductWithoutProcess() {
  return {
    type: actionTypes.LOAD_PRODUCT_WITHOUT_PROCESS,
  };
}
export function loadDataProductWithoutProcessSuccess(
  values: IProductWithoutProcess
) {
  return {
    type: actionTypes.LOAD_PRODUCT_WITHOUT_PROCESS_SUCCESS,
    payload: { data: values },
  };
}
export function loadDataProductWithoutProcessFailed(error: any) {
  return {
    type: actionTypes.LOAD_PRODUCT_WITHOUT_PROCESS_FAILED,
    payload: error,
  };
}
//add
export function addDataProductWithoutProcess(id, values) {
  return {
    type: actionTypes.ADD_PRODUCT_WITHOUT_PROCESS,
    payload: { id: id, values: values },
  };
}
export function addDataProductWithoutProcessSuccess(values: string) {
  return {
    type: actionTypes.ADD_PRODUCT_WITHOUT_PROCESS_SUCCESS,
    payload: { values: values },
  };
}
export function addDataProductWithoutProcessFailed(error: any) {
  return {
    type: actionTypes.ADD_PRODUCT_WITHOUT_PROCESS_FAILED,
    payload: error,
  };
}
