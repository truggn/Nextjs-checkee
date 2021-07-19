import produce from "immer";
import { actionTypes } from "../actions/SearchProductActions";

const initialState = {
  SearchProductData: null,
  errorProduct: null,
  loading: false,
};
const successLoadDataProduct = (draft: any, data : any) => {
  draft.SearchProductData = data.data.data.data;
};


const SearchProductreducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.SEARCH_PRODUCT_SUCCESS:
        successLoadDataProduct(draft,action.payload);
        break;
    }
  });
};

export default SearchProductreducer;
