import produce from "immer";
import { actionTypes } from "../actions/TypeParticipantActions";

const initialState = {
  participantdata: null,
  error: null,
};
//get Data
const successData = (draft: any, data: any) => {
  draft.participantdata = data.data;
};

//error
const failureData = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.LOAD_TYPE_PARTICIPANT_SUCCESS:
        successData(draft, action.payload);
        break;
      case actionTypes.LOAD_TYPE_PARTICIPANT_FAILURE:
        failureData(draft, action.payload);
        break;
    }
  });
};

export default reducer;
