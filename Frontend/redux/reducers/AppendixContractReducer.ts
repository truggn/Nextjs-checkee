import produce from "immer";
import { actionTypes as appendixContractActionTypes } from "../actions/AppendixContractActions";

const initialState = {
  appendixContractData: [],
  error: null,
  isWorking: false,
};

const requestStart = (draft: any) => {
  draft.isWorking = true;
};

const requestDone = (draft: any) => {
  draft.isWorking = false;
};

/* GET ALL APPENDIX_CONTRACT REDUCERS */
const getAppendixContractSuccess = (draft: any, { data }: any) => {
  draft.appendixContractData = data;
  draft.error = null;
};

const getAppendixContractFailure = (draft: any, { error }: any) => {
  draft.error = error;
};

/* CREATE NEW APPENDIX_CONTRACT */
const createAppendixContractSuccess = (draft: any, { data }: any) => {
  draft.appendixContractData = [...draft.appendixContractData, data];
  draft.error = null;
};
const createAppendixContractFailure = (draft: any, { error }: any) => {
  draft.error = error;
};

/* UPDATE APPENDIX_CONTRACT */
const updateAppendixContractSuccess = (draft: any, { data }: any) => {
  draft.appendixContractData[
    draft.appendixContractData.findIndex(
      (appendixAppendixContract) => appendixAppendixContract._id === data._id
    )
  ] = data;
  draft.error = null;
};
const updateAppendixContractFailure = (draft: any, { error }: any) => {
  draft.error = error;
};

/* DELETE APPENDIX_CONTRACT */
// const deleteAppendixContractSuccess = (draft: any, { data }: any) => {
//   draft.appendixContractData = draft.appendixContractData.filter(
//     (appendixAppendixContract) => appendixAppendixContract._id !== data.id
//   );
//   draft.error = null;
// };
const deleteAppendixContractFailure = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case appendixContractActionTypes.CREATE_APPENDIX_CONTRACT_START:
      case appendixContractActionTypes.DELETE_APPENDIX_CONTRACT_START:
      case appendixContractActionTypes.UPDATE_APPENDIX_CONTRACT_START:
        requestStart(draft);
        break;
      case appendixContractActionTypes.GET_APPENDIX_CONTRACT_SUCCESS:
        getAppendixContractSuccess(draft, action.payload);
        break;
      case appendixContractActionTypes.GET_APPENDIX_CONTRACT_FAILURE:
        getAppendixContractFailure(draft, action.payload);
        break;
      case appendixContractActionTypes.CREATE_APPENDIX_CONTRACT_SUCCESS:
        let newadd:string[] = state.appendixContractData.slice();
        newadd.splice(0, 0, action.payload.data.data.data[0]);
        return {
          ...state,
          error: null,
          appendixContractData: newadd,
          isWorking: false,
        };
      case appendixContractActionTypes.CREATE_APPENDIX_CONTRACT_FAILURE:
        createAppendixContractFailure(draft, action.payload);
        requestDone(draft);
        break;
      //
      case appendixContractActionTypes.UPDATE_APPENDIX_CONTRACT_SUCCESS:
        updateAppendixContractSuccess(draft, action.payload);
        requestDone(draft);
        break;
      case appendixContractActionTypes.UPDATE_APPENDIX_CONTRACT_FAILURE:
        updateAppendixContractFailure(draft, action.payload);
        requestDone(draft);
        break;
      //
      case appendixContractActionTypes.DELETE_APPENDIX_CONTRACT_SUCCESS:
        let newAppendixContract = state.appendixContractData.filter(
          (todo: {_id:string}) => todo._id !== action.payload.id
        );
        return {
          ...state,
          error: null,
          appendixContractData: newAppendixContract,
          isWorking: false,
        };
      case appendixContractActionTypes.DELETE_APPENDIX_CONTRACT_FAILURE:
        deleteAppendixContractFailure(draft, action.payload);
        requestDone(draft);
        break;
    }
  });
};

export default reducer;
