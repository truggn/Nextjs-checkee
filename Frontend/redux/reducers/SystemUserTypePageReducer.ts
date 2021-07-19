import produce from "immer";
import { actionTypes } from "../actions/SystemUserTypePageActions";

const initialState = {
  systemUserTypePageList: [],
  systemUserTypePageData: null,
  systemUserTypePageById: null,
  accessRightData: [],
  error: null,
  isLoading: false,
};

/* GET ALL SYSTEM PAGE */

const getSystemPageData = (draft: any, isLoading: boolean) => {
  draft.isLoading = isLoading;
};

const successLoadData = (draft: any, { data }: any, isLoading: boolean) => {
  draft.systemUserTypePageList = data;
  draft.isLoading = isLoading;
};

const failureLoadData = (draft: any, { error }: any, isLoading: boolean) => {
  draft.error = error;
  draft.isLoading = isLoading;
};

/* ADD SYSTEM PAGE */

const addSystemUserTypePage = (draft: any, isLoading: boolean) => {
  draft.isLoading = isLoading;
};

const successAddSystemUserTypePage = (
  draft: any,
  { data }: any,
  isLoading: boolean
) => {
  draft.systemUserTypePageList = data;
  draft.isLoading = isLoading;
};

const failureAddSystemUserTypePage = (
  draft: any,
  { error }: any,
  isLoading: boolean
) => {
  draft.error = error;
  draft.isLoading = isLoading;
};

/* UPDATE SYSTEM PAGE */

const updateSystemUserTypePage = (draft: any, isLoading: boolean) => {
  draft.isLoading = isLoading;
};

const successUpdateSystemUserTypePage = (
  draft: any,
  { data }: any,
  isLoading: boolean
) => {
  draft.systemUserTypePageList = data;
  draft.isLoading = isLoading;
};

const failureUpdateSystemUserTypePage = (
  draft: any,
  { error }: any,
  isLoading: boolean
) => {
  draft.error = error;
  draft.isLoading = isLoading;
};

/* DELETE SYSTEM PAGE */

const deleteSystemUserTypePage = (draft: any, isLoading: boolean) => {
  draft.isLoading = isLoading;
};

const successDeleteSystemUserTypePage = (
  draft: any,
  { data }: any,
  isLoading: boolean
) => {
  draft.systemUserTypePageList = data;
  draft.isLoading = isLoading;
};

const failureDeleteSystemUserTypePage = (
  draft: any,
  { error }: any,
  isLoading: boolean
) => {
  draft.error = error;
  draft.isLoading = isLoading;
};

/* GET SYSTEM PAGE BY LEVEL*/

const successGetSystemUserTypePageById = (draft: any, { data }: any) => {
  draft.systemUserTypePageById = data;
};

const failureGetSystemUserTypePageById = (draft: any, { error }: any) => {
  draft.error = error;
};

/* CHECK ACCESS RIGHT */

const successCheckAccessRight = (draft: any, { data }: any) => {
  draft.accessRightData = data;
};

const failureCheckAccessRight = (draft: any, { error }: any) => {
  draft.error = error;
};

const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      /* GET ALL SYSTEM PAGE */
      case actionTypes.LOAD_SYSTEMUSERTYPEPAGE:
        getSystemPageData(draft, Boolean(false));
        break;
      case actionTypes.LOAD_SYSTEMUSERTYPEPAGE_SUCCESS:
        successLoadData(draft, action.payload, Boolean(false));
        break;
      case actionTypes.LOAD_SYSTEMUSERTYPEPAGE_FAILURE:
        failureLoadData(draft, action.payload, Boolean(false));
        break;

      /* ADD SYSTEM PAGE */
      case actionTypes.ADD_SYSTEMUSERTYPEPAGE:
        addSystemUserTypePage(draft, true);
        break;
      case actionTypes.ADD_SYSTEMUSERTYPEPAGE_SUCCESS:
        let dataAdd: string[] = [...state.systemUserTypePageList];
        dataAdd.unshift(action.payload.data);
        return {
          ...state,
          systemUserTypePageList: dataAdd,
          isLoading: false,
        };
        break;
      case actionTypes.ADD_SYSTEMUSERTYPEPAGE_FAILURE:
        failureAddSystemUserTypePage(draft, action.payload, false);
        break;

      /* UPDATE SYSTEM PAGE */
      case actionTypes.UPDATE_SYSTEMUSERTYPEPAGE:
        updateSystemUserTypePage(draft, true);
        break;
      case actionTypes.UPDATE_SYSTEMUSERTYPEPAGE_SUCCESS:
        let dataUpdate = [...state.systemUserTypePageList];
        let res = dataUpdate.map(
          (obj: { _id: string }) =>
            [action.payload.data].find((o) => o._id === obj._id) || obj
        );
        return {
          ...state,
          systemUserTypePageList: res,
        };
        break;
      case actionTypes.UPDATE_SYSTEMUSERTYPEPAGE_FAILURE:
        failureUpdateSystemUserTypePage(draft, action.payload, false);
        break;

      /* DELETE SYSTEM PAGE */
      case actionTypes.DELETE_SYSTEMUSERTYPEPAGE:
        deleteSystemUserTypePage(draft, true);
        break;
      case actionTypes.DELETE_SYSTEMUSERTYPEPAGE_SUCCESS:
        // let dataDelete = [...state.systemUserTypePageList];
        // dataDelete.splice(action.index, 1);
        const dataDelete = state.systemUserTypePageList.filter(
          (todo: { _id: string }) => todo._id !== action.payload.data._id
        );
        return {
          ...state,
          systemUserTypePageList: dataDelete,
          isLoading: false,
        };
        break;
      case actionTypes.DELETE_SYSTEMUSERTYPEPAGE_FAILURE:
        failureDeleteSystemUserTypePage(draft, action.payload, false);
        break;

      /* GET SYSTEM PAGE BY LEVEL*/
      case actionTypes.GET_SYSTEMUSERTYPEPAGE_BYID_SUCCESS:
        successGetSystemUserTypePageById(draft, action.payload);
        break;
      case actionTypes.GET_SYSTEMUSERTYPEPAGE_BYID_FAILURE:
        failureGetSystemUserTypePageById(draft, action.payload);
        break;
      /* CHECK ACCESS RIGHT */
      case actionTypes.CHECK_ACCESSRIGHT_SUCCESS:
        // successCheckAccessRight(draft, action.payload);
        let dataCheckAR: any = [...state.accessRightData];

        let object = {
          actionName: action.payload.data.actionName,
          controllerName: action.payload.data.controllerName,
          checkAccessRight: action.payload.accessRight,
        };

        const i = dataCheckAR.findIndex(
          (_item: { actionName: string }) =>
            _item.actionName === object.actionName
        );
        if (i > -1) dataCheckAR[i] = object;
        else dataCheckAR.push(object);
        return {
          ...state,
          accessRightData: dataCheckAR,
        };
        break;
      case actionTypes.CHECK_ACCESSRIGHT_FAILURE:
        failureCheckAccessRight(draft, action.payload);
        break;
    }
  });
};

export default reducer;
