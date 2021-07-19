import { actionTypes } from "../actions/ProcessOfProductAction";
import produce from "immer";

const initialState = {
  dataProcessOfProduct: null,
  error: null,
};

//
const createDataProcessOfProduct = (draft: any, data: any) => {
  draft.dataProcessOfProduct = data;
};
const dataProcessOfProductFail = (draft: any, error: any) => {
  draft.error = error;
};

// update success
// const successUpdateData = (draft: any, data: any, state: any) => {
//   let newData = []
//   state.processproductdata.map((value) => {
//     value._id === data._id ? (value = data) : value
//     newData.push(value)
//   })
//   draft.processproductdata = newData;
// };

// update process of product
const updateProcessOfProduct = (draft: any, data: any, state: any) => {
  draft.dataProcessOfProduct = data;
};

//
const ProcessOfProductreducer = (state = initialState, action: any) => {

  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.CREATE_DATA_PROCESSOFPRODUCT_SUCCESS:
        createDataProcessOfProduct(draft, action.payload.data);
        break;
      case actionTypes.CREATE_DATA_PROCESSOFPRODUCT_FAIL:
        dataProcessOfProductFail(draft, action.payload);
        break;
      // action update success
      case actionTypes.UPDATE_PROCESSOFPRODUCT_SUCCESS:
        updateProcessOfProduct(draft, action.payload.data, state);
        break;
      default:
        break;
    }
  });
};
export default ProcessOfProductreducer;
