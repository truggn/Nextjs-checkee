import produce from "immer";
import { actionTypes } from "../actions/UserTypeActions";

const initialState = {
  userTypeList: [],
  userTypeData: [],
  error: null,
};

/* GET ALL SYSTEM PAGE */

const successLoadData = (draft: any, { data }: any) => {
  draft.userTypeList = data;
};

const failureLoadData = (draft: any, { error }: any) => {
  draft.error = error;
};

/* ADD SYSTEM PAGE */

const successAddUserType = (draft: any, { data }: any) => {
  draft.userTypeList = data;
};

const failureAddUserType = (draft: any, { error }: any) => {
  draft.error = error;
};

/* UPDATE SYSTEM PAGE */

const successUpdateUserType = (draft: any, { data }: any) => {
  draft.userTypeList = data;
};

const failureUpdateUserType = (draft: any, { error }: any) => {
  draft.error = error;
};

/* DELETE SYSTEM PAGE */

const successDeleteUserType = (draft: any, { data }: any) => {
  draft.userTypeList = data;
};

const failureDeleteUserType = (draft: any, { error }: any) => {
  draft.error = error;
};

/* GET SYSTEM PAGE BY LEVEL*/

const successGetUserTypeById = (draft: any, { data }: any) => {
  draft.userTypeData = data;
};

const failureGetUserTypeById = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      /* GET ALL SYSTEM PAGE */
      case actionTypes.LOAD_USERTYPE_SUCCESS:
        successLoadData(draft, action.payload);
        break;
      case actionTypes.LOAD_USERTYPE_FAILURE:
        failureLoadData(draft, action.payload);
        break;
      /* ADD SYSTEM PAGE */
      case actionTypes.ADD_USERTYPE_SUCCESS:
        // successAddUserType(draft, action.payload);
        let dataAdd: string[] = [...state.userTypeList];
        dataAdd.unshift(action.payload.data);
        return { 
          ...state,
          userTypeList : dataAdd
         };
        break;
      case actionTypes.ADD_USERTYPE_FAILURE:
        failureAddUserType(draft, action.payload);
        break;
      /* UPDATE SYSTEM PAGE */
      case actionTypes.UPDATE_USERTYPE_SUCCESS:
        // successUpdateUserType(draft, action.payload);
        let dataUpdate:any = [...state.userTypeList];
        let res = dataUpdate.map(obj => [action.payload.data].find(o => o._id === obj._id) || obj);
        return { 
          ...state,
          userTypeList : res
         };
        break;
      case actionTypes.UPDATE_USERTYPE_FAILURE:
        failureUpdateUserType(draft, action.payload);
        break;
      /* DELETE SYSTEM PAGE */
      case actionTypes.DELETE_USERTYPE_SUCCESS:
        // successDeleteUserType(draft, action.payload);
        // let dataDelete = [...state.userTypeList];
        // dataDelete.splice(action.index, 1);
        const dataDelete = state.userTypeList.filter(
          (todo:any) => todo._id !== action.payload.data._id
        );
        return { 
          ...state,
          userTypeList : dataDelete 
        };
        break;
      case actionTypes.DELETE_USERTYPE_FAILURE:
        failureDeleteUserType(draft, action.payload);
        break;
        /* GET SYSTEM PAGE BY LEVEL*/
      case actionTypes.GET_USERTYPE_BYID_SUCCESS:
        successGetUserTypeById(draft, action.payload);
        break;
      case actionTypes.GET_USERTYPE_BYID_FAILURE:
        failureGetUserTypeById(draft, action.payload);
        break;
    }
  });
};

export default reducer;
