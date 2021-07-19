import produce from "immer";
import { actionTypes } from "../actions/RetrieveProductInformationActions";

const initialState = {
  productData: null,
  reviewData: [],
  errorProduct: false,
  loading: false,
};
//load data product
const successLoadDataProduct = (draft: any, { data }: any) => {
  draft.productData = data;
  draft.errorProduct = false;
};

const failLoadDataProduct = (draft: any, error: any) => {
  draft.errorProduct = true;
};

//load list review
const successLoadReviewProduct = (draft: any, data: any) => {
  draft.reviewData = data;
};

//add review
const addReviewSuccess = (draft: any, state, data: any) => {
  const _reviewData = state.reviewData;

  const _data = [data];

  const mergeData = [..._data, ..._reviewData];

  draft.reviewData = mergeData;
};
const addReviewFailed = (draft: any, state, error: any) => {
  draft.error = error;
};

const Productreducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.LOAD_DATA_PRODUCT_SUCCESS:
        successLoadDataProduct(draft, action.payload);
        break;
      case actionTypes.LOAD_DATA_PRODUCT_FAIL:
        failLoadDataProduct(draft, action.payload);
      case actionTypes.LOAD_REVIEW_PRODUCT_SUCCESS:
        successLoadReviewProduct(draft, action.payload.data);
        break;
      case actionTypes.ADD_REVIEW_PRODUCT_SUCCESS:
        addReviewSuccess(draft, state, action.payload.data);
        break;
      case actionTypes.ADD_REVIEW_PRODUCT_FAILED:
        addReviewFailed(draft, state, action.payload.error);
        break;
    }
  });
};

export default Productreducer;
