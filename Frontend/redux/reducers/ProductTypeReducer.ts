import produce from "immer";
import { actionTypes } from "../actions/ProductTypeActions";

//
const initialState = {
  productTypeData: [],
  allCateData: [],
  error: null,
  loading: true,
};
//
const successLoadDataProductType = (draft: any, { data }: any) => {
  draft.productTypeData = data;
};

const failLoadDataProductType = (draft: any, { error }: any) => {
  draft.error = error;
};
//
const loadAllCateSuccess = (draft: any, { data }: any) => {
  draft.allCateData = data;
};

const loadAllCateFailed = (draft: any, { error }: any) => {
  draft.error = error;
};
//
const Productreducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      //action get data
      case actionTypes.LOAD_DATA_PRODUCTTYPE_SUCCESS:
        successLoadDataProductType(draft, action.payload);
        break;
      case actionTypes.LOAD_DATA_PRODUCTTYPE_FAIL:
        failLoadDataProductType(draft, action.payload);
        break;
      //action delete
      case actionTypes.DELETE_DATA_PRODUCTTYPE_SUCCESS:
        const newData = state.productTypeData.filter(
          (todo: { _id: string }) => todo._id !== action.payload.data.id
        );
        return {
          ...state,
          productTypeData: newData,
          error: null,
        };
      case actionTypes.DELETE_DATA_PRODUCTTYPE_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      //action create
      case actionTypes.CREATE_DATA_PRODUCTTYPE:
        return {
          ...state,
          loading: false,
        };
      case actionTypes.CREATE_DATA_PRODUCTTYPE_SUCCESS:
        const data_ = [
          ...action.payload.data.data.data,
          ...state.productTypeData,
        ];
        return {
          ...state,
          productTypeData: data_,
          error: null,
          loading: false,
        };
      case actionTypes.CREATE_DATA_PRODUCTTYPE_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      //action update
      case actionTypes.UPDATE_DATA_PRODUCTTYPE:
        return {
          ...state,
          loading: false,
        };
      case actionTypes.UPDATE_DATA_PRODUCTTYPE_SUCCESS:
        const dataNew: any = [...state.productTypeData];
        const index = dataNew.findIndex(
          (item) => item._id === action.payload.data.data.data._id
        );
        dataNew[index] = action.payload.data.data.data;
        return {
          ...state,
          productTypeData: dataNew,
          error: null,
          loading: false,
        };
      case actionTypes.UPDATE_DATA_PRODUCTTYPE_FAIL:
        return {
          ...state,
          error: action.payload.error,
          loading: false,
        };
      case actionTypes.VERIFIED_DATA_PRODUCTTYPE_SUCCESS:
        const productTypeData_: any = [...state.productTypeData];

        const verifiedData = action.payload.data;

        const index_ = productTypeData_.findIndex(
          (item) => item._id === verifiedData[0]._id
        );
        const object: any = productTypeData_[index_];

        const newData__ = { ...object, verified: verifiedData[0].verified };

        productTypeData_[index_] = newData__;
        return {
          ...state,
          productTypeData: productTypeData_,
          error: null,
          loading: false,
        };
      case actionTypes.VERIFIED_DATA_PRODUCTTYPE_FAIL:
        return {
          ...state,
          error: action.payload.error,
          loading: false,
        };
      case actionTypes.LOAD_ALLCATEGORY_SUCCESS: {
        loadAllCateSuccess(draft, action.payload);
        break;
      }
      case actionTypes.LOAD_ALLCATEGORY_FAILED: {
        loadAllCateFailed(draft, action.payload);
        break;
      }
    }
  });
};

export default Productreducer;
