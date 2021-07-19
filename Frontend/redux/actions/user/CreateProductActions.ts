export const actionTypes = {
  GET_PRODUCTUSER: "GET_PRODUCTUSER",
  GET_PRODUCTUSER_SUCCESS: "GET_PRODUCTUSER_SUCCESS",
  GET_PRODUCTUSER_FAILURE: "GET_PRODUCTUSER_FAILURE",

  CREATE_PRODUCTUSER: "CREATE_PRODUCTUSER",
  CREATE_PRODUCTUSER_SUCCESS: "CREATE_PRODUCTUSER_SUCCESS",
  CREATE_PRODUCTUSER_FAILURE: "CREATE_PRODUCTUSER_FAILURE",

  UPDATE_PRODUCT: "UPDATE_PRODUCT",
  UPDATE_PRODUCT_SUCCESS: "UPDATE_PRODUCT_SUCCESS",
  UPDATE_PRODUCT_FAILURE: "UPDATE_PRODUCT_FAILURE",

  DETAIL_PRODUCT: "DETAIL_PRODUCT",
  DETAIL_PRODUCT_SUCCESS: "DETAIL_PRODUCT_SUCCESS",
  DETAIL_PRODUCT_FAILURE: "DETAIL_PRODUCT_FAILURE",
  // DELETE_CUSTOMER_START: "DELETE_CUSTOMER_START",
  // DELETE_CUSTOMER_SUCCESS: "DELETE_CUSTOMER_SUCCESS",
  // DELETE_CUSTOMER_FAILURE: "DELETE_CUSTOMER_FAILURE",
};

export interface Iproduct {
  code: string;
  name: string;
}

export interface organization {
  code: string;
  _id: string;
  name_customer: string;
}
export interface productType {
  code: string;
  _id: string;
  name: string;
}
export interface createdBy {
  _id: string;
  email: string;
}
export interface IProduct {
  _id: string;
  organizationId: organization;
  productTypeId: productType;
  status: string;
  filename: string;
  products: Iproduct[];
  createdBy: createdBy;
}

export interface RequestProduct {
  organizationId: string;
  productTypeId: string;
  createdBy: string;
  filename: string;
  products: Iproduct[];
}

export interface IUpdateProduct {
  _id: string;
}

interface IProductS {
  _id: string;
  code: string;
  name: string;
}

export interface IDetailProduct {
  _id: string;
  status: string;
  filename: number;
  products: IProductS[];
  productTypeId: string;
  organizationId: string;
  createdAt?: string;
}
/* GET PRODUCT */

export function getProduct(id) {
  return {
    type: actionTypes.GET_PRODUCTUSER,
    payload: id,
  };
}

export function getProductSuccess(data: IProduct[]) {
  return {
    type: actionTypes.GET_PRODUCTUSER_SUCCESS,
    payload: {
      data: data,
    },
  };
}

export function getProductFailure(error: any) {
  return {
    type: actionTypes.GET_PRODUCTUSER_FAILURE,
    payload: {
      error: error,
    },
  };
}

/* ADD PRODUCT */

export function createProduct(values: RequestProduct) {
  return {
    type: actionTypes.CREATE_PRODUCTUSER,
    payload: values,
  };
}

export function createProductSuccess(data: IProduct[]) {
  return {
    type: actionTypes.CREATE_PRODUCTUSER_SUCCESS,
    payload: {
      data: data,
    },
  };
}

export function createProductFailure(error: any) {
  return {
    type: actionTypes.CREATE_PRODUCTUSER_FAILURE,
    payload: {
      error: error,
    },
  };
}

/* CONFIRM PRODUCT */

export function updateProduct(updates: any) {
  return {
    type: actionTypes.UPDATE_PRODUCT,
    payload: updates,
  };
}

export function updateProductSuccess(data: IUpdateProduct[]) {
  return {
    type: actionTypes.UPDATE_PRODUCT_SUCCESS,
    payload: {
      data: data,
    },
  };
}

export function updateProductFailure(error: any) {
  return {
    type: actionTypes.UPDATE_PRODUCT_FAILURE,
    payload: {
      error: error,
    },
  };
}

/* DETAIL PRODUCT*/

export function detailProduct(id: string) {
  return {
    type: actionTypes.DETAIL_PRODUCT,
    payload: { id },
  };
}

export function detailProductSuccess(data: IDetailProduct) {
  return {
    type: actionTypes.DETAIL_PRODUCT_SUCCESS,
    payload: {
      data: data,
    },
  };
}

export function detailProductFailure(error: any) {
  return {
    type: actionTypes.DETAIL_PRODUCT_FAILURE,
    payload: {
      error: error,
    },
  };
}
//   /* DELETE CUSTOMER */

//   export function deleteCustomerStart(updates: ICustomer) {
//     return {
//       type: actionTypes.DELETE_CUSTOMER_START,
//       payload: updates
//     };
//   }

//   export function deleteCustomerSuccess(data: ICustomer[]) {
//     return {
//       type: actionTypes.DELETE_CUSTOMER_SUCCESS,
//       payload: {
//         data: data,
//       }
//     };
//   }

//   export function deleteCustomerFailure(error: any) {
//     return {
//       type: actionTypes.DELETE_CUSTOMER_FAILURE,
//       payload: {
//         error: error,
//       }
//     };
//   }
