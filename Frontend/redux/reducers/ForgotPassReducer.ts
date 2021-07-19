import produce from "immer";
import { actionTypes } from "../actions/ForgotPassActions";

const initialState = {
  forgotpassdata: {},
  error: "",
  loading: false
};

const successForgotPass = (draft: any,  data : any) => {
  draft.forgotpassdata = data.data;
  draft.loading = data.loading
};

const failureForgotPass = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.FORGOT_PASSWORD_SUCCESS:
        successForgotPass(draft, action.payload);
        break;
      case actionTypes.FORGOT_PASSWORD_FAILURE:
        failureForgotPass(draft, action.payload);
        break;
    }
  });
};

export default reducer;
