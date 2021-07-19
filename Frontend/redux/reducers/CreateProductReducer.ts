import produce from "immer";
import { actionTypes } from "../actions/CreateProductActions";

const initialState = {
  create_product_data: [],
  detail_product_data: [],
  error: null,
};

const successGetData = (draft: any, { data }: any) => {
  draft.create_product_data = data;
  draft.error = null;
};
const successCreateData = (draft: any, { data }: any) => {
  draft.create_product_data.push(data);
  draft.error = null;
};
const successUpdateData = (draft: any, data: any, state: any) => {
  let newData: any = [];
  state.create_product_data.map((value: { _id: string }) => {
    value._id === data._id ? (value = data) : value;
    newData.push(value);
  });
  draft.create_product_data = newData;
};
const successDetailData = (draft: any, data: any) => {
  draft.detail_product_data = data;
  draft.error = null;
};
const failureData = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.CREATE_PRODUCT_SUCCESS:
        successCreateData(draft, action.payload);
        break;
      case actionTypes.CREATE_PRODUCT_FAILURE:
        failureData(draft, action.payload);
        break;
      case actionTypes.GET_PRODUCT_SUCCESS:
        successGetData(draft, action.payload);
        break;
      case actionTypes.GET_PRODUCT_FAILURE:
        failureData(draft, action.payload);
        break;
      case actionTypes.UPDATE_PRODUCT_SUCCESS:
        successUpdateData(draft, action.payload.data, state);
        break;
      case actionTypes.UPDATE_PRODUCT_FAILURE:
        failureData(draft, action.payload);
        break;
      case actionTypes.DETAIL_PRODUCT_SUCCESS:
        successDetailData(draft, action.payload.data);
        break;
      case actionTypes.DETAIL_PRODUCT_FAILURE:
        failureData(draft, action.payload);
        break;
    }
  });
};

export default reducer;
