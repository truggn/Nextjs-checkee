import produce from "immer";
import { actionTypes } from "../actions/ProductTypeForProcessActions";
import { IProductForProcess } from "../actions/ProductTypeForProcessActions";

const initialState = {
  dataProductForProcess: [],
  loading: false,
  error: false,
};

const loadDataProductForProcessSuccess = (draft: any, data: any) => {
  draft.dataProductForProcess = data.data;
};

const loadDataProductForProcessFailed = (draft: any, { error }: any) => {
  draft.error = error;
};

const productTypeForProcessReducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.LOAD_PRODUCT_FOR_PROCESS_SUCCESS:
        loadDataProductForProcessSuccess(draft, action.payload.data);
        break;
      case actionTypes.LOAD_PRODUCT_FOR_PROCESS_FAILED:
        loadDataProductForProcessFailed(draft, action.payload);
        break;
      default:
        break;
    }
  });
};

export default productTypeForProcessReducer;
