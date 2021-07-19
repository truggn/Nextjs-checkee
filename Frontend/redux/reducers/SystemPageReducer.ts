import produce from "immer";
import { actionTypes } from "../actions/SystemPageActions";

const initialState = {
  systemPageList: [],
  systemPageData: null,
  systemPageByLevel: null,
  error: null,
};

/* GET ALL SYSTEM PAGE */

const successLoadData = (draft: any, { data }: any) => {
  draft.systemPageList = data;
};

const failureLoadData = (draft: any, { error }: any) => {
  draft.error = error;
};

/* ADD SYSTEM PAGE */

const successAddSystemPage = (draft: any, { data }: any) => {
  draft.systemPageList = data;
};

const failureAddSystemPage = (draft: any, { error }: any) => {
  draft.error = error;
};

/* UPDATE SYSTEM PAGE */

const successUpdateSystemPage = (draft: any, { data }: any) => {
  draft.systemPageData = data;
};

const failureUpdateSystemPage = (draft: any, { error }: any) => {
  draft.error = error;
};

/* DELETE SYSTEM PAGE */

const successDeleteSystemPage = (draft: any, { data }: any) => {
  draft.systemPageData = data;
};

const failureDeleteSystemPage = (draft: any, { error }: any) => {
  draft.error = error;
};

/* GET SYSTEM PAGE BY LEVEL*/

const successGetSystemPageByLevel = (draft: any, { data }: any) => {
  draft.systemPageByLevel = data;
};

const failureGetSystemPageByLevel = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      /* GET ALL SYSTEM PAGE */
      case actionTypes.LOAD_SYSTEMPAGE_SUCCESS:
        successLoadData(draft, action.payload);
        break;
      case actionTypes.LOAD_SYSTEMPAGE_FAILURE:
        failureLoadData(draft, action.payload);
        break;
      /* ADD SYSTEM PAGE */
      case actionTypes.ADD_SYSTEMPAGE_SUCCESS:
        // successAddSystemPage(draft, action.payload);
        let dataAdd: string[] = [...state.systemPageList];
        dataAdd.unshift(action.payload.data);
        return { 
          ...state,
          systemPageList : dataAdd
         };
        break;
      case actionTypes.ADD_SYSTEMPAGE_FAILURE:
        failureAddSystemPage(draft, action.payload);
        break;
      /* UPDATE SYSTEM PAGE */
      case actionTypes.UPDATE_SYSTEMPAGE_SUCCESS:
        // successUpdateSystemPage(draft, action.payload);
        let dataUpdate = [...state.systemPageList];
        let res = dataUpdate.map((obj: {_id:string}) => [action.payload.data].find(o => o._id === obj._id) || obj);
        return { 
          ...state,
          systemPageList : res
         };
        break;
      case actionTypes.UPDATE_SYSTEMPAGE_FAILURE:
        failureUpdateSystemPage(draft, action.payload);
        break;
      /* DELETE SYSTEM PAGE */
      case actionTypes.DELETE_SYSTEMPAGE_SUCCESS:
        // successDeleteSystemPage(draft, action.payload);
        // let dataDelete = [...state.systemPageList];
        // dataDelete.splice(action.index, 1);
        console.log(action.payload)
        const dataDelete = state.systemPageList.filter(
          (todo: {_id:string}) => todo._id !== action.payload.data._id
        );
        return { 
          ...state,
          systemPageList : dataDelete 
        };
        break;
      case actionTypes.DELETE_SYSTEMPAGE_FAILURE:
        failureDeleteSystemPage(draft, action.payload);
        break;
      /* GET SYSTEM PAGE BY LEVEL*/
      case actionTypes.GET_SYSTEMPAGE_BYLEVEL_SUCCESS:
        successGetSystemPageByLevel(draft, action.payload);
        break;
      case actionTypes.GET_SYSTEMPAGE_BYLEVEL_FAILURE:
        failureGetSystemPageByLevel(draft, action.payload);
        break;
    }
  });
};

export default reducer;
