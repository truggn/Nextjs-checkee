import produce from "immer";
import { actionTypes } from "../actions/LogoutActions";

const initialState = {
  logoutdata: {},
  error: "",
  loading: false
};

const successLogout = (draft: any,  data : any) => {
  draft.logoutdata = data.data;
  draft.loading = data.loading
};

const failureLogout = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOGOUT_SUCCESS:
        successLogout(draft, action.payload);
        break;
      case actionTypes.LOGOUT_FAILURE:
        failureLogout(draft, action.payload);
        break;
    }
  });
};

export default reducer;
