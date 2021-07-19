import produce from "immer";
import { actionTypes } from "../../actions/user/ParticipantActions";

const initialState = {
  participantdata: null,
  error: null,
};
//get Data
const successData = (draft: any, data: any) => {
  draft.participantdata = data.data;
};
//add Data
const successCreateData = (draft: any, data: any, state: any) => {
  draft.participantdata = [...data.data, ...state.participantdata];
};
//delete Data
const successDeleteData = (draft: any, data: any, state: any) => {
  let newData = state.participantdata.filter((v) => v._id !== data);
  draft.participantdata = newData;
};
//update Data
const successUpdateData = (draft: any, data: any, state: any) => {
  let newData: string[] = [];
  state.participantdata.map((value) => {
    value._id === data._id ? (value = data) : value;
    newData.push(value);
  });
  draft.participantdata = newData;
};

//error
const failureData = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.LOAD_DATA_PARTICIPANT_USER_SUCCESS:
        successData(draft, action.payload);
        break;
      case actionTypes.CREATE_DATA_PARTICIPANT_USER_SUCCSESS:
        successCreateData(draft, action.payload, state);
        break;
      case actionTypes.DELETED_PARTICIPANT_USER_SUCCESS:
        successDeleteData(draft, action.payload.id.id, state);
        break;
      case actionTypes.UPDATE_DATA_PARTICIPANT_USER_SUCCESS:
        successUpdateData(draft, action.payload.data, state);
        break;
      case actionTypes.LOAD_DATA_PARTICIPANT_USER_FAILURE ||
        actionTypes.CREATE_DATA_PARTICIPANT_USER_FAILURE ||
        actionTypes.DELETED_PARTICIPANT_USER_FAILURE ||
        actionTypes.UPDATE_DATA_PARTICIPANT_USER_FAILURE:
        failureData(draft, action.payload);
        break;
    }
  });
};

export default reducer;
