import { string } from "yup/lib/locale";

export const actionTypes = {
  LOAD_DATA_PRODUCTTYPE: "LOAD_DATA_PRODUCTTYPE",
  LOAD_DATA_PRODUCTTYPE_SUCCESS: "LOAD_DATA_PRODUCTTYPE_SUCCESS",
  LOAD_DATA_PRODUCTTYPE_FAIL: "LOAD_DATA_PRODUCTTYPE_FAIL",
  //
  DELETE_DATA_PRODUCTTYPE: "DELETE_DATA_PRODUCTTYPE",
  DELETE_DATA_PRODUCTTYPE_SUCCESS: "DELETE_DATA_PRODUCTTYPE_SUCCESS",
  DELETE_DATA_PRODUCTTYPE_FAIL: "DELETE_DATA_PRODUCTTYPE_FAIL",
  //
  CREATE_DATA_PRODUCTTYPE: "CREATE_DATA_PRODUCTTYPE",
  CREATE_DATA_PRODUCTTYPE_SUCCESS: "CREATE_DATA_PRODUCTTYPE_SUCCESS",
  CREATE_DATA_PRODUCTTYPE_FAIL: "CREATE_DATA_PRODUCTTYPE_FAIL",
  //
  UPDATE_DATA_PRODUCTTYPE: "UPDATE_DATA_PRODUCTTYPE",
  UPDATE_DATA_PRODUCTTYPE_SUCCESS: "UPDATE_DATA_PRODUCTTYPE_SUCCESS",
  UPDATE_DATA_PRODUCTTYPE_FAIL: "UPDATE_DATA_PRODUCTTYPE_FAIL",
  //
  VERIFIED_DATA_PRODUCTTYPE: "VERIFIED_DATA_PRODUCTTYPE",
  VERIFIED_DATA_PRODUCTTYPE_SUCCESS: "VERIFIED_DATA_PRODUCTTYPE_SUCCESS",
  VERIFIED_DATA_PRODUCTTYPE_FAIL: "VERIFIED_DATA_PRODUCTTYPE_FAIL",
  //
  LOAD_ALLCATEGORY: "LOAD_ALLCATEGORY",
  LOAD_ALLCATEGORY_SUCCESS: "LOAD_ALLCATEGORY_SUCCESS",
  LOAD_ALLCATEGORY_FAILED: "LOAD_ALLCATEGORY_FAILED",
};
interface IOrganization {
  _id: string;
  name: string;
}
export interface IProductType {
  _id: string;
  code: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  productRepresentation: string;
  countryOfOrigin: {
    name: string;
    "alpha-2": string;
    "country-code": string;
  };
  createdBy?: string;
  organizationId: string;
  verified?: boolean;
  updatedBy?: string;
  categoryId: {
    _id: string;
    name: string;
  };
}
export interface IProductTypeState {
  readonly data: IProductType[];
  loading: boolean;
}

interface IDeleteProductType {
  id: string;
  deletedBy: string;
}

//load data
export function loadDataProductType() {
  return {
    type: actionTypes.LOAD_DATA_PRODUCTTYPE,
  };
}
export function loadDataProductTypeSuccess(data: IProductType[]) {
  return {
    type: actionTypes.LOAD_DATA_PRODUCTTYPE_SUCCESS,
    payload: {
      data: data,
    },
  };
}
export function loadDataProductTypeFail(error: any) {
  return {
    type: actionTypes.LOAD_DATA_PRODUCTTYPE_FAIL,
    payload: {
      error,
    },
  };
}
//delete data
export function deleteDataProductType(values: IDeleteProductType) {
  return {
    type: actionTypes.DELETE_DATA_PRODUCTTYPE,
    payload: {
      data: values,
    },
  };
}

export function deleteDataProductTypeSuccess(values) {
  return {
    type: actionTypes.DELETE_DATA_PRODUCTTYPE_SUCCESS,
    payload: {
      data: values,
    },
  };
}
export function deleteDataProductTypeFail(error: any) {
  return {
    type: actionTypes.DELETE_DATA_PRODUCTTYPE_FAIL,
    payload: {
      error,
    },
  };
}
//create data
export function createDataProductType(value: IProductType) {
  return {
    type: actionTypes.CREATE_DATA_PRODUCTTYPE,
    payload: {
      value,
    },
  };
}
export function createDataProductTypeSuccess(data: IProductType[]) {
  return {
    type: actionTypes.CREATE_DATA_PRODUCTTYPE_SUCCESS,
    payload: {
      data,
    },
  };
}
export function createDataProductTypeFail(error: any) {
  return {
    type: actionTypes.CREATE_DATA_PRODUCTTYPE_FAIL,
    payload: {
      error,
    },
  };
}
//update data
export function updateDataProductType(value: IProductType) {
  return {
    type: actionTypes.UPDATE_DATA_PRODUCTTYPE,
    payload: {
      value,
    },
  };
}
export function updateDataProductTypeSuccess(
  data: IProductType[],
  id: IProductType
) {
  return {
    type: actionTypes.UPDATE_DATA_PRODUCTTYPE_SUCCESS,
    payload: {
      data,
      id,
    },
  };
}
export function updateDataProductTypeFail(error) {
  return {
    type: actionTypes.UPDATE_DATA_PRODUCTTYPE_FAIL,
    payload: {
      error: error,
    },
  };
}
//verified data
export function verifiedDataProductType(value: object) {
  return {
    type: actionTypes.VERIFIED_DATA_PRODUCTTYPE,
    payload: {
      data: value,
    },
  };
}
export function verifiedDataProductTypeSuccess(value) {
  return {
    type: actionTypes.VERIFIED_DATA_PRODUCTTYPE_SUCCESS,
    payload: {
      data: value,
    },
  };
}
export function verifiedDataProductTypeFail(error) {
  return {
    type: actionTypes.VERIFIED_DATA_PRODUCTTYPE_FAIL,
    payload: {
      error: error,
    },
  };
}
// get category
export function loadAllCate() {
  return {
    type: actionTypes.LOAD_ALLCATEGORY,
  };
}
export function loadAllCateSuccess(values) {
  return {
    type: actionTypes.LOAD_ALLCATEGORY_SUCCESS,
    payload: { data: values },
  };
}
export function loadAllCateFailed(error) {
  return {
    type: actionTypes.LOAD_ALLCATEGORY_FAILED,
    payload: { error },
  };
}
