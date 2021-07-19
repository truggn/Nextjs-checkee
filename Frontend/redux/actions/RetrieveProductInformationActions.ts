export const actionTypes = {
  LOAD_DATA_PRODUCT: "LOAD_DATA_PRODUCT",
  LOAD_DATA_PRODUCT_SUCCESS: "LOAD_DATA_PRODUCT_SUCCESS",
  LOAD_DATA_PRODUCT_FAIL: "LOAD_DATA_PRODUCT_FAIL",

  LOAD_REVIEW_PRODUCT: "LOAD_REVIEW_PRODUCT",
  LOAD_REVIEW_PRODUCT_SUCCESS: "LOAD_REVIEW_PRODUCT_SUCCESS",
  LOAD_REVIEW_PRODUCT_FAILED: "LOAD_REVIEW_PRODUCT_FAILED",

  ADD_REVIEW_PRODUCT: "ADD_REVIEW_PRODUCT",
  ADD_REVIEW_PRODUCT_SUCCESS: "ADD_REVIEW_PRODUCT_SUCCESS",
  ADD_REVIEW_PRODUCT_FAILED: "ADD_REVIEW_PRODUCT_FAILED",
};
// interface IParticipant {
//   participant: {
//     name: string;
//     icon: string;
//   };
//   attributes: [
//     {
//       key: string;
//       name: string;
//       value: string;
//     }
//   ]
// }

// export interface IProduct {
//   _id: string;
//   code: string;
//   name: string;
//   information: IParticipant[]
// }
export interface IProduct {
  _id: string;
  code: string;
  name: string;
  information: [
    {
      participant: {
        name: string;
        icon: string;
      };
      attributes: [
        {
          key: string;
          name: string;
          value: string;
        }
      ];
    }
  ];
  id: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface IReviewProduct {
  _id: string;
  quality: number;
  worththemoney: number;
  effectiveuse: number;
  reuse: number;
  sharefriend: number;
  userId: IUser;
  firstName: string;
  lastName: string;
  comment: string;
  productTypeId: string;
  star: number;
  image: string[];
  createdAt: string;
  updatedAt: string;
}

//load data
export function loadDataProduct(value: string) {
  return {
    type: actionTypes.LOAD_DATA_PRODUCT,
    payload: {
      value,
    },
  };
}
export function loadDataProductSuccess(data: IProduct) {
  return {
    type: actionTypes.LOAD_DATA_PRODUCT_SUCCESS,
    payload: {
      data: data,
    },
  };
}
export function loadDataProductFail(error: any) {
  return {
    type: actionTypes.LOAD_DATA_PRODUCT_FAIL,
    payload: {
      error,
    },
  };
}

export function loadReviewProduct(data: string) {
  return {
    type: actionTypes.LOAD_REVIEW_PRODUCT,
    payload: {
      data: data,
    },
  };
}

export function loadReviewProductSuccess(data: IReviewProduct[]) {
  return {
    type: actionTypes.LOAD_REVIEW_PRODUCT_SUCCESS,
    payload: {
      data: data,
    },
  };
}
export function loadReviewProductFailed(error) {
  return {
    type: actionTypes.LOAD_REVIEW_PRODUCT_FAILED,
    payload: {
      error: error,
    },
  };
}

export function addReviewProduct(data: any) {
  return {
    type: actionTypes.ADD_REVIEW_PRODUCT,
    payload: {
      data: data,
    },
  };
}

export function addReviewProductSuccess(data: IReviewProduct) {
  return {
    type: actionTypes.ADD_REVIEW_PRODUCT_SUCCESS,
    payload: {
      data: data,
    },
  };
}
export function addReviewProductFailed(error) {
  return {
    type: actionTypes.ADD_REVIEW_PRODUCT_FAILED,
    payload: {
      error: error,
    },
  };
}
