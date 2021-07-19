export const actionTypes = {
    SEARCH_PRODUCT: "SEARCH_PRODUCT",
    SEARCH_PRODUCT_SUCCESS: "SEARCH_PRODUCT_SUCCESS",
    SEARCH_PRODUCT_FAIL: "SEARCH_PRODUCT_FAIL",
  };
  export interface ISearchProduct {
    _id: string;
    orderNo: Number;
    code: String;
    name: String;
    weight: Number;
    color: String;
    date: Date;
  }
  export interface SearchProductState {
    readonly data: ISearchProduct[];
  } 
  //search data
  export function searchDataProduct(value: string) {
    return {
      type: actionTypes.SEARCH_PRODUCT,
      payload: {
        value,
      },
    };
  }
  export function searchDataProductSuccess(data: ISearchProduct[]) {
    return {
      type: actionTypes.SEARCH_PRODUCT_SUCCESS,
      payload: {
        data,
      },
    };
  }
  export function searchDataProductFail(error: any) {
    return {
      type: actionTypes.SEARCH_PRODUCT_FAIL,
      payload: {
        error,
      },
    };
  }
  