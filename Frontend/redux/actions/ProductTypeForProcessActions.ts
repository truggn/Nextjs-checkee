export const actionTypes = {
  LOAD_PRODUCT_FOR_PROCESS: "LOAD_PRODUCT_FOR_PROCESS",
  LOAD_PRODUCT_FOR_PROCESS_SUCCESS: "LOAD_PRODUCT_FOR_PROCESS_SUCCESS",
  LOAD_PRODUCT_FOR_PROCESS_FAILED: "LOAD_PRODUCT_FOR_PROCESS_FAILED",
};

export interface IProductForProcess {
  _id: string;
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

export function loadDataProductForProcess(id: string) {
  return {
    type: actionTypes.LOAD_PRODUCT_FOR_PROCESS,
    payload: id,
  };
}
export function loadDataProductForProcessSuccess(values: IProductForProcess[]) {
  return {
    type: actionTypes.LOAD_PRODUCT_FOR_PROCESS_SUCCESS,
    payload: { data: values },
  };
}
export function loadDataProductForProcessFailed(error: any) {
  return {
    type: actionTypes.LOAD_PRODUCT_FOR_PROCESS_FAILED,
    payload: error,
  };
}
