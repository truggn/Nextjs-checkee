import produce from "immer";
import { actionTypes } from "../actions/ChangePassActions";

const initialState = {
  changepassdata: {},
  error: "",
};

const successChangePass = (draft: any,  data : any) => {
  draft.changepassdata = data.data;
};

const failureChangePass = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.CHANGE_PASSWORD_SUCCESS:
        successChangePass(draft, action.payload);
        break;
      case actionTypes.CHANGE_PASSWORD_FAILURE:
        failureChangePass(draft, action.payload);
        break;
    }
  });
};

export default reducer;
