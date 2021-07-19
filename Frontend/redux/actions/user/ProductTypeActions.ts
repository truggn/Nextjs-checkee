export const actionTypes = {
  LOAD_DATA_PRODUCTTYPEUSER: "LOAD_DATA_PRODUCTTYPEUSER",
  LOAD_DATA_PRODUCTTYPEUSER_SUCCESS: "LOAD_DATA_PRODUCTTYPEUSER_SUCCESS",
  LOAD_DATA_PRODUCTTYPEUSER_FAIL: "LOAD_DATA_PRODUCTTYPEUSER_FAIL",
  //
  DELETE_DATA_PRODUCTTYPEUSER: "DELETE_DATA_PRODUCTTYPEUSER",
  DELETE_DATA_PRODUCTTYPEUSER_SUCCESS: "DELETE_DATA_PRODUCTTYPEUSER_SUCCESS",
  DELETE_DATA_PRODUCTTYPEUSER_FAIL: "DELETE_DATA_PRODUCTTYPEUSER_FAIL",
  //
  CREATE_DATA_PRODUCTTYPEUSER: "CREATE_DATA_PRODUCTTYPEUSER",
  CREATE_DATA_PRODUCTTYPEUSER_SUCCESS: "CREATE_DATA_PRODUCTTYPEUSER_SUCCESS",
  CREATE_DATA_PRODUCTTYPEUSER_FAIL: "CREATE_DATA_PRODUCTTYPEUSER_FAIL",
  //
  UPDATE_DATA_PRODUCTTYPEUSER: "UPDATE_DATA_PRODUCTTYPEUSER",
  UPDATE_DATA_PRODUCTTYPEUSER_SUCCESS: "UPDATE_DATA_PRODUCTTYPEUSER_SUCCESS",
  UPDATE_DATA_PRODUCTTYPEUSER_FAIL: "UPDATE_DATA_PRODUCTTYPEUSER_FAIL",
  //
  VERIFIED_DATA_PRODUCTTYPEUSER: "VERIFIED_DATA_PRODUCTTYPEUSER",
  VERIFIED_DATA_PRODUCTTYPEUSER_SUCCESS:
    "VERIFIED_DATA_PRODUCTTYPEUSER_SUCCESS",
  VERIFIED_DATA_PRODUCTTYPEUSER_FAIL: "VERIFIED_DATA_PRODUCTTYPEUSER_FAIL",
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
export function loadDataProductType(organizationId) {
  return {
    type: actionTypes.LOAD_DATA_PRODUCTTYPEUSER,
    payload: {
      organizationId,
    },
  };
}
export function loadDataProductTypeSuccess(data: IProductType[]) {
  return {
    type: actionTypes.LOAD_DATA_PRODUCTTYPEUSER_SUCCESS,
    payload: {
      data: data,
    },
  };
}
export function loadDataProductTypeFail(error: any) {
  return {
    type: actionTypes.LOAD_DATA_PRODUCTTYPEUSER_FAIL,
    payload: {
      error,
    },
  };
}
//delete data
export function deleteDataProductType(values: IDeleteProductType) {
  return {
    type: actionTypes.DELETE_DATA_PRODUCTTYPEUSER,
    payload: {
      data: values,
    },
  };
}

export function deleteDataProductTypeSuccess(values) {
  return {
    type: actionTypes.DELETE_DATA_PRODUCTTYPEUSER_SUCCESS,
    payload: {
      data: values,
    },
  };
}
export function deleteDataProductTypeFail(error: any) {
  return {
    type: actionTypes.DELETE_DATA_PRODUCTTYPEUSER_FAIL,
    payload: {
      error,
    },
  };
}
//create data
export function createDataProductType(value: IProductType) {
  return {
    type: actionTypes.CREATE_DATA_PRODUCTTYPEUSER,
    payload: {
      value,
    },
  };
}
export function createDataProductTypeSuccess(data: IProductType[]) {
  return {
    type: actionTypes.CREATE_DATA_PRODUCTTYPEUSER_SUCCESS,
    payload: {
      data,
    },
  };
}
export function createDataProductTypeFail(error: any) {
  return {
    type: actionTypes.CREATE_DATA_PRODUCTTYPEUSER_FAIL,
    payload: {
      error,
    },
  };
}
//update data
export function updateDataProductType(value: IProductType) {
  return {
    type: actionTypes.UPDATE_DATA_PRODUCTTYPEUSER,
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
    type: actionTypes.UPDATE_DATA_PRODUCTTYPEUSER_SUCCESS,
    payload: {
      data,
      id,
    },
  };
}
export function updateDataProductTypeFail(error) {
  return {
    type: actionTypes.UPDATE_DATA_PRODUCTTYPEUSER_FAIL,
    payload: {
      error: error,
    },
  };
}
//verified data
export function verifiedDataProductType(value: object) {
  return {
    type: actionTypes.VERIFIED_DATA_PRODUCTTYPEUSER,
    payload: {
      data: value,
    },
  };
}
export function verifiedDataProductTypeSuccess(value) {
  return {
    type: actionTypes.VERIFIED_DATA_PRODUCTTYPEUSER_SUCCESS,
    payload: {
      data: value,
    },
  };
}
export function verifiedDataProductTypeFail(error) {
  return {
    type: actionTypes.VERIFIED_DATA_PRODUCTTYPEUSER_FAIL,
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
