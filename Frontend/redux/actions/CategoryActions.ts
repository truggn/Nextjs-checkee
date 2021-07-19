export const actionTypes = {
  // load
  LOAD_DATA_CATEGORY: "LOAD_DATA_CATEGORY",
  LOAD_DATA_CATEGORY_SUCCESS: "LOAD_DATA_CATEGORY_SUCCESS",
  LOAD_DATA_CATEGORY_FAILED: "LOAD_DATA_CATEGORY_FAILED",
  // add
  ADD_DATA_CATEGORY: "ADD_DATA_CATEGORY",
  ADD_DATA_CATEGORY_SUCCESS: "ADD_DATA_CATEGORY_SUCCESS",
  ADD_DATA_CATEGORY_FAILED: "ADD_DATA_CATEGORY_FAILED",
  // delete
  DELETE_DATA_CATEGORY: "DELETE_DATA_CATEGORY",
  DELETE_DATA_CATEGORY_SUCCESS: "DELETE_DATA_CATEGORY_SUCCESS",
  DELETE_DATA_CATEGORY_FAILED: "DELETE_DATA_CATEGORY_FAILED",
  // update
  UPDATE_DATA_CATEGORY: "UPDATE_DATA_CATEGORY",
  UPDATE_DATA_CATEGORY_SUCCESS: "UPDATE_DATA_CATEGORY_SUCCESS",
  UPDATE_DATA_CATEGORY_FAILED: "UPDATE_DATA_CATEGORY_FAILED",
};

// kiểu data
export interface ICategory {
  _id?: string;
  code: string;
  name: string;
  isHomeCategory: boolean;
  indexHomeCategory: number;
  description: string;
  createdBy?: string;
  level: number;
  parentsId: {
    idCategoryLevel_1?: string;
    idCategoryLevel_2?: string;
  };
  subcategoryId: string[];
}
// kiểu data delete
export interface IDeleteCategory {
  id: string;
  userId: string;
}
// kiểu data update
export interface IUpdateCategory {
  id: string;
  name: string;
  code: string;
  isHomeCategory: boolean;
  indexHomeCategory: number;
  description: string;
  updatedBy: string;
  level: string | number;
  icon: string;
}

/* ======================================== LOAD_CATEGORY ======================================== */
// load init
export function loadDataCategory() {
  return {
    type: actionTypes.LOAD_DATA_CATEGORY,
    payload: {},
  };
}
// load success
export function loadDataCategorySuccess(values: ICategory[]) {
  return {
    type: actionTypes.LOAD_DATA_CATEGORY_SUCCESS,
    payload: {
      data: values,
    },
  };
}
// load failed
export function loadDataCategoryFailed(error: any) {
  return {
    type: actionTypes.LOAD_DATA_CATEGORY_FAILED,
    payload: {
      error: error,
    },
  };
}

/* ======================================== ADD_CATEGORY ======================================== */
// add init
export function addDataCategory(values: ICategory) {
  return {
    type: actionTypes.ADD_DATA_CATEGORY,
    payload: {
      data: values,
    },
  };
}
// add success
export function addDataCategorySuccess(values: ICategory) {
  return {
    type: actionTypes.ADD_DATA_CATEGORY_SUCCESS,
    payload: {
      data: values,
    },
  };
}
// add failed
export function addDataCategoryFailed(error: any) {
  return {
    type: actionTypes.ADD_DATA_CATEGORY_FAILED,
    payload: {
      error: error,
    },
  };
}

/* ======================================== DELETE_CATEGORY ======================================== */
// delete init
export function deleteDataCategory(values: IDeleteCategory) {
  return {
    type: actionTypes.DELETE_DATA_CATEGORY,
    payload: {
      data: values,
    },
  };
}
// delete success
export function deleteDataCategorySuccess(values: ICategory) {
  return {
    type: actionTypes.DELETE_DATA_CATEGORY_SUCCESS,
    payload: {
      data: values,
    },
  };
}
// delete failed
export function deleteDataCategoryFailed(error: any) {
  return {
    type: actionTypes.DELETE_DATA_CATEGORY_FAILED,
    payload: {
      error: error,
    },
  };
}

/* ======================================== UPDATE_CATEGORY ======================================== */
// delete init
export function updateDataCategory(values: IUpdateCategory) {
  return {
    type: actionTypes.UPDATE_DATA_CATEGORY,
    payload: {
      data: values,
    },
  };
}
// delete success
export function updateDataCategorySuccess(values: ICategory) {
  return {
    type: actionTypes.UPDATE_DATA_CATEGORY_SUCCESS,
    payload: {
      data: values,
    },
  };
}
// delete failed
export function updateDataCategoryFailed(error: any) {
  return {
    type: actionTypes.UPDATE_DATA_CATEGORY_FAILED,
    payload: {
      error: error,
    },
  };
}
