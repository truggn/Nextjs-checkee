import produce from "immer";
import { actionTypes } from "../actions/SignUpActions";

const initialState = {
  signupdata: {},
  error: "",
  loading: false
};

const successAddSignUp = (draft: any,  data : any) => {
  draft.signupdata = data.data;
  draft.loading = data.loading
};

const failureAddSignUp = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.ADD_SIGNUP_SUCCESS:
        successAddSignUp(draft, action.payload);
        break;
      case actionTypes.ADD_SIGNUP_FAILURE:
        failureAddSignUp(draft, action.payload);
        break;
    }
  });
};

export default reducer;
