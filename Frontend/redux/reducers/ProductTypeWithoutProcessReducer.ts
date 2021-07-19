import produce from "immer";
import { actionTypes } from "../actions/ProductTypeWithoutProcessActions";

const initialState = {
  dataProductWithoutProcess: [],
  loading: false,
  error: false,
};

const loadDataProductWithoutProcessSuccess = (draft: any, data: any) => {
  draft.dataProductWithoutProcess = data.data;
};

const loadDataProductWithoutProcessFailed = (draft: any, { error }: any) => {
  draft.error = error;
};

//add
const addDataProductWithoutProcessSuccess = (draft: any, state, data: any) => {
  //trả về data có id khác với id product đã thêm vào process
  const loadData = state.dataProductWithoutProcess.filter(
    (item) => !data.includes(item.productId)
  );
  draft.dataProductWithoutProcess = loadData;
};

const addDataProductWithoutProcessFailed = (draft: any, { error }: any) => {
  draft.error = error;
};

const productTypeWithoutProcessReducer = (
  state = initialState,
  action: any
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.LOAD_PRODUCT_WITHOUT_PROCESS_SUCCESS:
        loadDataProductWithoutProcessSuccess(draft, action.payload.data);
        break;
      case actionTypes.LOAD_PRODUCT_WITHOUT_PROCESS_FAILED:
        loadDataProductWithoutProcessFailed(draft, action.payload);
        break;
      case actionTypes.ADD_PRODUCT_WITHOUT_PROCESS_SUCCESS: {
        addDataProductWithoutProcessSuccess(
          draft,
          state,
          action.payload.values
        );
        break;
      }
      case actionTypes.LOAD_PRODUCT_WITHOUT_PROCESS_FAILED:
        addDataProductWithoutProcessFailed(draft, action.payload);
        break;
      default:
        break;
    }
  });
};

export default productTypeWithoutProcessReducer;
