export const actionTypes = {
  LOAD_DATA_PRODUCTATTRIBUTES: "LOAD_DATA_PRODUCTATTRIBUTES",
  LOAD_DATA_PRODUCTATTRIBUTES_SUCCESS: "LOAD_DATA_PRODUCTATTRIBUTES_SUCCESS",
  LOAD_DATA_PRODUCTATTRIBUTES_FAIL: "LOAD_DATA_PRODUCTATTRIBUTES_FAIL",
  //
  DELETE_DATA_PRODUCTATTRIBUTES: "DELETE_DATA_PRODUCTATTRIBUTES",
  DELETE_DATA_PRODUCTATTRIBUTES_SUCCESS:
    "DELETE_DATA_PRODUCTATTRIBUTES_SUCCESS",
  DELETE_DATA_PRODUCTATTRIBUTES_FAIL: "DELETE_DATA_PRODUCTATTRIBUTES_FAIL",
  //
  CREATE_DATA_PRODUCTATTRIBUTES: "CREATE_DATA_PRODUCTATTRIBUTES",
  CREATE_DATA_PRODUCTATTRIBUTES_SUCCESS:
    "CREATE_DATA_PRODUCTATTRIBUTES_SUCCESS",
  CREATE_DATA_PRODUCTATTRIBUTES_FAIL: "CREATE_DATA_PRODUCTATTRIBUTES_FAIL",
  //
  UPDATE_DATA_PRODUCTATTRIBUTES: "UPDATE_DATA_PRODUCTATTRIBUTES",
  UPDATE_DATA_PRODUCTATTRIBUTES_SUCCESS:
    "UPDATE_DATA_PRODUCTATTRIBUTES_SUCCESS",
  UPDATE_DATA_PRODUCTATTRIBUTES_FAIL: "UPDATE_DATA_PRODUCTATTRIBUTES_FAIL",
};
export interface IProductAttributes {
  _id: string;
  key: string;
  type: string;
  code: string;
  productTypeId: {
    code: string;
    name: string;
    _id: string;
  };
  createBy: string;
  organizationId: {
    name_customer: string;
    _id: string;
  };
}
//load data
export function loadDataProductAttributes() {
  return {
    type: actionTypes.LOAD_DATA_PRODUCTATTRIBUTES,
  };
}
export function loadDataProductAttributesSuccess(data: IProductAttributes[]) {
  return {
    type: actionTypes.LOAD_DATA_PRODUCTATTRIBUTES_SUCCESS,
    payload: {
      data,
    },
  };
}
export function loadDataProductAttributesFail(error: any) {
  return {
    type: actionTypes.LOAD_DATA_PRODUCTATTRIBUTES_FAIL,
    payload: {
      error,
    },
  };
}
//delete data
export function deleteDataProductAttributes(id: string) {
  return {
    type: actionTypes.DELETE_DATA_PRODUCTATTRIBUTES,
    payload: {
      id,
    },
  };
}
export function deleteDataProductAttributesSuccess(
  data: IProductAttributes[],
  id: IProductAttributes
) {
  return {
    type: actionTypes.DELETE_DATA_PRODUCTATTRIBUTES_SUCCESS,
    payload: {
      data,
      id,
    },
  };
}
export function deleteDataProductAttributesFail(error: any) {
  return {
    type: actionTypes.DELETE_DATA_PRODUCTATTRIBUTES_FAIL,
    payload: {
      error,
    },
  };
}
//create data
export function createDataProductAttributes(value: IProductAttributes) {
  return {
    type: actionTypes.CREATE_DATA_PRODUCTATTRIBUTES,
    payload: {
      value,
    },
  };
}
export function createDataProductAttributesSuccess(data: IProductAttributes[]) {
  return {
    type: actionTypes.CREATE_DATA_PRODUCTATTRIBUTES_SUCCESS,
    payload: {
      data,
    },
  };
}
export function createDataProductAttributesFail(error) {
  return {
    type: actionTypes.CREATE_DATA_PRODUCTATTRIBUTES_FAIL,
    payload: {
      error,
    },
  };
}
//update data
export function updateDataProductAttributes(value: IProductAttributes) {
  return {
    type: actionTypes.UPDATE_DATA_PRODUCTATTRIBUTES,
    payload: {
      value,
    },
  };
}
export function updateDataProductAttributesSuccess(data: IProductAttributes[]) {
  return {
    type: actionTypes.UPDATE_DATA_PRODUCTATTRIBUTES_SUCCESS,
    payload: {
      data,
    },
  };
}
export function updateDataProductAttributesFail(error: any) {
  return {
    type: actionTypes.UPDATE_DATA_PRODUCTATTRIBUTES_FAIL,
    payload: {
      error,
    },
  };
}
