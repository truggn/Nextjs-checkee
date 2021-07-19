import produce from "immer";
import { actionTypes } from "../actions/SettingProcessAction";

//
let initialState = {
  setting_participant_data: null,
  setting_props_data: null,
  id_props:null,
  error: null,
};
//

const createSettingParticipant = (draft: any, data: any, state: any) => {
  draft.setting_participant_data = state.setting_participant_data.concat([data.data]);
};

const loadSettingParticipant = (draft: any, data: any) => {
  draft.setting_participant_data = data.data.flow
}
//
const createSettingProps = (draft: any, data: any, state: any) => {
  draft.setting_props_data = state.setting_props_data.concat([data.data]);;
};
const loadSettingProps = (draft: any, data: any) => {
  draft.setting_props_data = data.data
  draft.id_props = data.id
}
//
const SettingFailure = (draft: any, error: any) => {
  draft.error = error;
};
const SettingProcessReducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.CREATE_SETTING_PROCESS_PARTICIPANT_SUCCESS:
        createSettingParticipant(draft, action.payload, state);
        break;
      case actionTypes.LOAD_SETTING_PROCESS_PARTICIPANT_SUCCESS:
        loadSettingParticipant(draft, action.payload)
        break;
      case actionTypes.LOAD_SETTING_PROCESS_PROPS_SUCCESS:
        loadSettingProps(draft, action.payload)
        break;
      case actionTypes.CREATE_SETTING_PROCESS_PROPS_SUCCESS:
        createSettingProps(draft, action.payload, state)
        break;
      case actionTypes.CREATE_SETTING_PROCESS_PARTICIPANT_FAILURE ||
        actionTypes.LOAD_SETTING_PROCESS_PARTICIPANT_FAILURE ||
        actionTypes.LOAD_SETTING_PROCESS_PROPS_FAILURE ||
        actionTypes.CREATE_SETTING_PROCESS_PROPS_FAILURE:
        SettingFailure(draft, action.payload);
        break;
    }
  });
};
export default SettingProcessReducer;
