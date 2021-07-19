import produce from "immer";
import { actionTypes } from "../actions/ProductAttributesActions";

const initialState = {
  ProductAttributesData: null,
  ErrorData: null,
  loading: false,
};
// function
const loadingtrue = (draft: any) => {
  draft.loading = true;
};
const loadingfail = (draft: any) => {
  draft.loading = false;
};
//--get-Data--//
const getdataSuccess = (draft: any, data: any) => {
  draft.ProductAttributesData = data.data;
};
//==delete-data==//
const deleteDatasuccess = (draft: any, data: any, state: any) => {
  let deleteData = state.ProductAttributesData.filter(
    (todo) => todo._id !== data
  );
  draft.ProductAttributesData = deleteData;
};
//==create-data==//
const createDataSuccess = (draft: any, data: any) => {
  draft.ProductAttributesData = data;
};
//==update-data==//
const updateDataSuccess = (draft: any, data: any, state: any) => {
  let updateData = state.ProductAttributesData.map((todo) =>
    todo._id === data._id ? (todo = data) : todo
  );
  draft.ProductAttributesData = updateData;
};
//error
const dataError = (draft: any, error: any) => {
  draft.ErrorData = error;
};
//
const ProductAttributesreducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.LOAD_DATA_PRODUCTATTRIBUTES_SUCCESS:
        getdataSuccess(draft, action.payload);
        break;
      case actionTypes.DELETE_DATA_PRODUCTATTRIBUTES_SUCCESS:
        deleteDatasuccess(draft, action.payload.id, state);
        break;
      case actionTypes.CREATE_DATA_PRODUCTATTRIBUTES:
        loadingfail(draft);
        break;
      case actionTypes.CREATE_DATA_PRODUCTATTRIBUTES_SUCCESS:
        createDataSuccess(draft, action.payload.data.data.data);
        loadingtrue(draft);
        break;
      case actionTypes.UPDATE_DATA_PRODUCTATTRIBUTES:
        loadingfail(draft);
        break;
      case actionTypes.UPDATE_DATA_PRODUCTATTRIBUTES_SUCCESS:
        updateDataSuccess(draft, action.payload.data.data.data[0], state);
        loadingtrue(draft);
        break;
      case actionTypes.LOAD_DATA_PRODUCTATTRIBUTES_FAIL:
      case actionTypes.DELETE_DATA_PRODUCTATTRIBUTES_FAIL:
      case actionTypes.CREATE_DATA_PRODUCTATTRIBUTES_FAIL:
      case actionTypes.UPDATE_DATA_PRODUCTATTRIBUTES_FAIL:
        dataError(draft, action.payload);
        loadingfail(draft);
        break;
    }
  });
};
export default ProductAttributesreducer;
