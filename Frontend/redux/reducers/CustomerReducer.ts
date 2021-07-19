import produce from "immer";
import { actionTypes as customerActionTypes } from "../actions/CustomerActions";

const initialState = {
  customerData: [],
  error: null,
  isWorking: false,
};

const requestStart = (draft: any) => {
  draft.isWorking = true;
};

const requestDone = (draft: any) => {
  draft.isWorking = false;
};

/* GET ALL CUSTOMTER REDUCERS */
const getCustomerSuccess = (draft: any, { data }: any) => {
  draft.customerData = data;
  draft.error = null;
};

const getCustomerFailure = (draft: any, { error }: any) => {
  draft.error = error;
};

/* CREATE NEW CUSTOMER */
const createCustomerSuccess = (draft: any, { data }: any) => {
  draft.customerData = [...draft.customerData, data];
  draft.error = null;
};
const createCustomerFailure = (draft: any, { error }: any) => {
  draft.error = error;
};

/* UPDATE CUSTOMER */
const updateCustomerSuccess = (draft: any, { data }: any) => {
  draft.customerData[
    draft.customerData.findIndex((customer) => customer._id === data._id)
  ] = data;
  draft.error = null;
};
const updateCustomerFailure = (draft: any, { error }: any) => {
  draft.error = error;
};

/* DELETE CUSTOMER */
const deleteCustomerSuccess = (draft: any, { data }: any) => {
  draft.customerData = draft.customerData.filter(
    (customer) => customer._id !== data.id
  );
  draft.error = null;
};
const deleteCustomerFailure = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case customerActionTypes.CREATE_CUSTOMER_START:
      case customerActionTypes.DELETE_CUSTOMER_START:
      case customerActionTypes.UPDATE_CUSTOMER_START:
        requestStart(draft);
        break;
      case customerActionTypes.GET_CUSTOMER_SUCCESS:
        getCustomerSuccess(draft, action.payload);
        break;
      case customerActionTypes.GET_CUSTOMER_FAILURE:
        getCustomerFailure(draft, action.payload);
        break;
      case customerActionTypes.CREATE_CUSTOMER_SUCCESS:
        let newadd = [...action.payload.data,...state.customerData]
        return {
          ...state,
          error: null,
          customerData: newadd,
          isWorking: false,
        };
      case customerActionTypes.CREATE_CUSTOMER_FAILURE:
        createCustomerFailure(draft, action.payload);
        requestDone(draft);
        break;
      case customerActionTypes.UPDATE_CUSTOMER_SUCCESS:
        updateCustomerSuccess(draft, action.payload);
        requestDone(draft);
        break;
      case customerActionTypes.UPDATE_CUSTOMER_FAILURE:
        updateCustomerFailure(draft, action.payload);
        requestDone(draft);
        break;
      case customerActionTypes.DELETE_CUSTOMER_SUCCESS:
        deleteCustomerSuccess(draft, action.payload);
        requestDone(draft);
        break;
      case customerActionTypes.DELETE_CUSTOMER_FAILURE:
        deleteCustomerFailure(draft, action.payload);
        requestDone(draft);
        break;
    }
  });
};

export default reducer;
