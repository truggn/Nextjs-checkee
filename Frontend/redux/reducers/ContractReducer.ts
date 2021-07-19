import produce from "immer";
import { actionTypes } from "../actions/ContractActions";

const initialState = {
  ContractData: [],
  errorContract: null,
  loading: false,
};
const requestStart = (draft: any) => {
  draft.loading = true;
};
const requestDone = (draft: any) => {
  draft.loading = false;
};
const successLoadDataContract = (draft: any, { data }: any) => {
  draft.ContractData = data;
};

const failLoadDataContract = (draft: any, { error }: any) => {
  draft.errorContract = error;
};

const Contractreducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.LOAD_CONTRACT_SUCCESS:
        successLoadDataContract(draft, action.payload);
        break;
      case actionTypes.LOAD_CONTRACT_FAIL:
        failLoadDataContract(draft, action.payload);
        break;
      //
      case actionTypes.DELETED_CONTRACT_SUCCESS:
        let newContract = state.ContractData.filter(
          (todo:{_id:string}) => todo._id !== action.payload.id
        );
        return {
          ...state,
          errorContract: null,
          ContractData: newContract,
          loading: false,
        };
      case actionTypes.DELETED_CONTRACT_FAIL:
        return {
          ...state,
          errorContract: action.payload,
          ContractData: null,
          loading: false,
        };
      //
      case actionTypes.CREATE_CONTRACT_SUCCESS:
        let newaddContract: string[] = state.ContractData.slice();
        newaddContract.splice(0, 0, action.payload.data.data.data[0]);
        return {
          ...state,
          errorContract: null,
          ContractData: newaddContract,
          loading: false,
        };
      case actionTypes.CREATE_CONTRACT_FAIL:
        return {
          ...state,
          errorContract: action.payload,
          ContractData: null,
          loading: false,
        };
      //
      case actionTypes.UPDATE_CONTRACT_SUCCESS:
        let update = state.ContractData.map((todo: {_id:string}) =>
          todo._id === action.payload.id
            ? (todo = action.payload.data.data.data)
            : todo
        );
        return {
          ...state,
          errorContract: null,
          ContractData: update,
          loading: false,
        };
      case actionTypes.UPDATE_CONTRACT_FAIL:
        return {
          ...state,
          errorContract: action.payload,
          ContractData: null,
          loading: false,
        };
    }
  });
};

export default Contractreducer;
