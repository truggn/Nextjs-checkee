import produce from "immer";
import { actionTypes } from "../actions/ListUserActions";
//
//tạo nơi lưu trữ list khi có dữ liệu
const initialState = {
  listUserdata: [],
  errorListUser: null,
  loading: false,
};
//
// const requestStart = (draft: any) => {
//   draft.loading = true;
// };
// const requestDone = (draft: any) => {
//   draft.loading = false;
// };
//phương thức khi load
const successLoadData = (draft: any, { data }: any) => {
  draft.listUserdata = data;
};

const failLoadData = (draft: any, { error }: any) => {
  draft.errorListUser = error;
};
//phương thức khi xóa
const failDeleteData = (draft: any, { error }: any) => {
  draft.errorListUser = error;
};
//phương thức khi tạo
const successCreateData = (draft: any, { data }: any) => {
  draft.listUserdata = data;
};
const failCreateData = (draft: any, { error }: any) => {
  draft.errorListUser = error;
};
//phương thức sửa
const successUpdateData = (draft: any, { data }: any) => {
  draft.listUserdata = data;
};
const failUpdateData = (draft: any, { error }: any) => {
  draft.errorListUser = error;
};
//sửa status
const successUpdateStatus = (draft: any, { data }: any) => {
  draft.listUserdata = data;
};
const failUpdateStatus = (draft: any, { error }: any) => {
  draft.errorListUser = error;
};
//
const successUpdateStatusNo = (draft: any, { data }: any) => {
  draft.listUserdata = data;
};
const failUpdateStatusNo = (draft: any, { error }: any) => {
  draft.errorListUser = error;
};
//
const Listreducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.LOAD_DATA_USER_SUCCESS:
        successLoadData(draft, action.payload);
        break;
      case actionTypes.LOAD_DATA_USER_FAILURE:
        failLoadData(draft, action.payload);
        break;
      //phuong thức xóa
      case actionTypes.DELETED_USER_FAILURE:
        failDeleteData(draft, action.payload);

        break;
      case actionTypes.DELETED_USER_SUCCESS:
        const newState = state.listUserdata.filter(
          (todo: {_id:string}) => todo._id !== action.payload.id
        );
        return { ...state, errorListUser: null, listUserdata: newState };
      //phuong thức tạo
      case actionTypes.CREATE_DATA_USER:
        return {
          ...state,
          loading: false,
        };
      case actionTypes.CREATE_DATA_USER_SUCCSESS:
        let newadd: string[] = state.listUserdata.slice();
        newadd.splice(0, 0, action.payload.data.data.data);
        return {
          ...state,
          errorListUser: null,
          listUserdata: newadd,
          loading: true,
        };
      case actionTypes.CREATE_DATA_USER_FAILURE:
        return {
          ...state,
          errorListUser: action.payload,
          loading: false,
        };
      //phuong thuc sửa
      case actionTypes.UPDATE_DATA_USER_SUCCESS:
        const a = state.listUserdata.map((todo: {_id:string}) =>
          todo._id === action.payload.id
            ? (todo = action.payload.data.data.data)
            : todo
        );
        // console.log("idsss", action);
        // console.log("idss", action.payload.id);
        // console.log("datass", action.payload.data);
        // console.log("a", a);
        // console.log("state", state.listUserdata);
        // requestDone(draft);
        return {
          errorListUser: null,
          listUserdata: a,
          loading: true,
        };
      case actionTypes.UPDATE_DATA_USER_FAILURE:
        return {
          errorListUser: action.payload,
          loading: true,
        };
      //sửa status
      case actionTypes.UPDATE_STATUS_USER_SUCCESS:
        const statusactive = state.listUserdata.map((todo: {_id:string}) =>
          todo._id === action.payload.id
            ? (todo = action.payload.data.data.data)
            : todo
        );
        return {
          errorListUser: null,
          listUserdata: statusactive,
        };
      case actionTypes.UPDATE_STATUS_USER_FAILURE:
        failUpdateStatus(draft, action.payload);
        break;
      //sửa status dont active
      case actionTypes.UPDATE_NO_STATUS_USER_SUCCESS:
        const statusnoactive = state.listUserdata.map((todo: {_id:string}) =>
          todo._id === action.payload.id
            ? (todo = action.payload.data.data.data)
            : todo
        );
        return {
          errorListUser: null,
          listUserdata: statusnoactive,
        };
      case actionTypes.UPDATE_NO_STATUS_USER_FAILURE:
        failUpdateStatusNo(draft, action.payload);
        break;
      default:
        return state;
      //
    }
  });
};

export default Listreducer;
