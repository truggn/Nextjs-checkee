import produce from "immer";
import { actionTypes } from "../../actions/user/ProcessManageActions";

const initialState = {
  processmanagedata: null,
  error: null,
  detailprocessmanage: null,
};
//get Data
const successData = (draft: any, data: any) => {
  draft.processmanagedata = data.data;
};
//add Data
const successCreateData = (draft: any, data: any, state: any) => {
  draft.processmanagedata = state.processmanagedata.concat(data.data);
};
const successGetDetail = (draft: any, data: any) => {
  draft.detailprocessmanage = data;
};
// //delete Data
// const successDeleteData = (draft: any, data: any, state: any) => {
//   let newData = state.participantdata.filter(
//     (v) => v._id !== data
//   );
//   draft.participantdata = newData;
// };
// //update Data
// const successUpdateData = (draft: any, data: any, state: any) => {
//   let newData = []
//   state.participantdata.map((value)=>{
//     value._id === data._id ? (value = data) : value
//     newData.push(value)
//   })
//   draft.participantdata = newData;
// };

//error
const failureData = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.LOAD_PROCESS_MANAGEUSER_SUCCESS:
        successData(draft, action.payload);
        break;
      case actionTypes.CREATE_PROCESS_MANAGEUSER_SUCCSESS:
        successCreateData(draft, action.payload, state);
        break;
      case actionTypes.GET_DETAIL_PROCESS_MANAGE:
        successGetDetail(draft, action.payload.value);
        break;
      //   case actionTypes.DELETED_PARTICIPANT_SUCCESS:
      //     successDeleteData(draft, action.payload.id.id, state);
      //     break;
      //   case actionTypes.UPDATE_DATA_PARTICIPANT_SUCCESS:
      //     successUpdateData(draft, action.payload.data, state);
      //     break;
      case actionTypes.LOAD_PROCESS_MANAGEUSER_FAILURE ||
        actionTypes.CREATE_PROCESS_MANAGEUSER_FAILURE:
        // actionTypes.DELETED_PARTICIPANT_FAILURE ||
        // actionTypes.UPDATE_DATA_PARTICIPANT_FAILURE:
        failureData(draft, action.payload);
        break;
    }
  });
};

export default reducer;
