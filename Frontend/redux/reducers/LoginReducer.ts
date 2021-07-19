import produce from "immer";
import { actionTypes } from "../actions/LoginActions";


let initialState = {
  error: "",
  loading: false,
  getuserlogindata: {},
  logindata: {}
};
// Đăng nhập
const successLogin = (draft: any, data: any) => {
  draft.getuserlogindata = data.dataUser
  draft.logindata = data.data
};

const failureLogin = (draft: any, { error }: any) => {
  draft.error = error;
};
// Cập nhật thông tin user
const successUpdateUser = (draft: any, data: any) => {
  draft.getuserlogindata = data.data
};

const failureUpdateUser = (draft: any, { error }: any) => {
  draft.error = error;
};
const reducer = (state = initialState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOGIN_SUCCESS:
        successLogin(draft, action.payload);
        break;
      case actionTypes.LOGIN_FAILURE:
        failureLogin(draft, action.payload);
        break;
      case actionTypes.UPDATE_USER_SUCCESS:
        successUpdateUser(draft, action.payload);
        break;
      case actionTypes.UPDATE_USER_FAILURE:
        failureUpdateUser(draft, action.payload);
        break;
    }
  });
};

export default reducer;
