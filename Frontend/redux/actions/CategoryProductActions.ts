export const actionTypes = {
  LOAD_DATA_CATEGORYPRODUCT: "LOAD_DATA_CATEGORYPRODUCT",
  LOAD_DATA_CATEGORYPRODUCT_SUCCESS: "LOAD_DATA_CATEGORYPRODUCT_SUCCESS",
  LOAD_DATA_CATEGORYPRODUCT_FAILED: "LOAD_DATA_CATEGORYPRODUCT_FAILED",

  LOAD_DATA_LISTOFPRODUCT: "LOAD_DATA_LISTOFPRODUCT",
  LOAD_DATA_LISTOFPRODUCT_SUCCESS: "LOAD_DATA_LISTOFPRODUCT_SUCCESS",
  LOAD_DATA_LISTOFPRODUCT_FAILED: "LOAD_DATA_LISTOFPRODUCT_FAILED",

};

export interface CategoryProductState {
  _id : string ;
  name : string ;
  icon : string; 
} 

export interface ListOfProductState {
_id : string ;
categoryID: {
  _id : string;
  code : string;
  name : string ;
  icon : string;
}
productTypeID: string ;
createdBy : string ;
createdAt : string ;
updatedAt : string ;
__v : number ;
}


/* ======================================== LOAD_CATEGORY ======================================== */

export function loadDataCategory() {
  return {
      type : actionTypes.LOAD_DATA_CATEGORYPRODUCT,
      payload: {},
  };
}

export function loadDataCategorySuccess(values : CategoryProductState[]) {
  return {
      type: actionTypes.LOAD_DATA_CATEGORYPRODUCT_SUCCESS,
      payload: {
        data: values,
      },
  }
}


export function loadDataCategoryFailed(error: any) {
  return {
    type: actionTypes.LOAD_DATA_CATEGORYPRODUCT_FAILED,
    payload: {
      error: error,
    },
  };
}

/* ==================================== LOAD_LISTOFPRODUCT ======================================== */


export function loadListOfProduct (data :string) {
  return {
    type : actionTypes.LOAD_DATA_LISTOFPRODUCT ,
    payload: {
      data : data,
    },
  };
}

export function loadListOfProductSuccess (data : ListOfProductState[]) {
  return {
    type : actionTypes.LOAD_DATA_LISTOFPRODUCT_SUCCESS,
    payload : {
      data : data,
    },
  };
}

export function loadListOfProductFailed (error ) {
  return {
    type : actionTypes.LOAD_DATA_LISTOFPRODUCT_FAILED,
    payload : {
      error : error ,
    },
  };
}