import { ICategory, actionTypes } from "../actions/CategoryActions";
import produce from "immer";

// kiểu data
interface IInitialState {
  dataCategory: ICategory[];
  error: boolean;
  loading: boolean;
}

// init state
const initialState: IInitialState = {
  dataCategory: [],
  error: false,
  loading: true,
};

/* ======================================== LOAD_CATEGORY ======================================== */
const loadDataCategory = (draft: any) => {
  draft.dataCategory = [];
  draft.error = false;
  draft.loading = true;
};
const loadDataCategorySuccess = (draft: any, data: ICategory[]) => {
  draft.dataCategory = data;
  draft.error = false;
  draft.loading = false;
};
const loadDataCategoryError = (draft: any, error: any) => {
  draft.dataCategory = [];
  draft.error = true;
  draft.loading = false;
};

/* ======================================== ADD_CATEGORY ======================================== */
const adddDataCategorySuccess = (draft: any, data: ICategory[], state) => {
  const dataNew = [...state.dataCategory];
  dataNew.unshift(data);
  draft.dataCategory = dataNew;
  draft.error = false;
  draft.loading = false;
};
const addDataCategoryError = (draft: any, error: any) => {
  draft.error = true;
  draft.loading = false;
};

/* ======================================== DELETE_CATEGORY ======================================== */
const deleteDataCategorySuccess = (draft: any, data: ICategory, state) => {
  const dataState: ICategory[] = [...state.dataCategory];
  const dataStateNew: ICategory[] = dataState.filter(
    (item) => item._id !== data._id
  );
  draft.dataCategory = dataStateNew;
  draft.error = false;
  draft.loading = false;
};
const deleteDataCategoryError = (draft: any, error: any) => {
  draft.error = true;
  draft.loading = false;
};

/* ======================================== UPDATE_CATEGORY ======================================== */
const updateDataCategorySuccess = (draft: any, data: ICategory, state) => {
  const dataState: ICategory[] = [...state.dataCategory];
  const pos = dataState.findIndex((item) => item._id === data._id);
  dataState[pos] = data;
  draft.dataCategory = dataState;
  draft.error = false;
  draft.loading = false;
};
const updateDataCategoryError = (draft: any, error: any) => {
  draft.error = true;
  draft.loading = false;
};

/* ======================================== FUNCTION_HANDLE ======================================== */
const reducerCategory = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.LOAD_DATA_CATEGORY: {
        loadDataCategory(draft);
        break;
      }
      case actionTypes.LOAD_DATA_CATEGORY_SUCCESS: {
        loadDataCategorySuccess(draft, action.payload.data);
        break;
      }
      case actionTypes.LOAD_DATA_CATEGORY_FAILED: {
        loadDataCategoryError(draft, action.payload.error);
        break;
      }
      case actionTypes.ADD_DATA_CATEGORY_SUCCESS: {
        adddDataCategorySuccess(draft, action.payload.data, state);
        break;
      }
      case actionTypes.ADD_DATA_CATEGORY_FAILED: {
        addDataCategoryError(draft, action.payload.error);
        break;
      }
      case actionTypes.DELETE_DATA_CATEGORY_SUCCESS: {
        deleteDataCategorySuccess(draft, action.payload.data, state);
        break;
      }
      case actionTypes.DELETE_DATA_CATEGORY_FAILED: {
        deleteDataCategoryError(draft, action.payload.error);
        break;
      }
      case actionTypes.UPDATE_DATA_CATEGORY_SUCCESS: {
        updateDataCategorySuccess(draft, action.payload.data, state);
        break;
      }
      case actionTypes.UPDATE_DATA_CATEGORY_FAILED: {
        updateDataCategoryError(draft, action.payload.error);
        break;
      }
    }
  });
};

export default reducerCategory;
