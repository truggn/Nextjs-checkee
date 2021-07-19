import produce from "immer";
import { actionTypes } from "../actions/ChangeMenuActions";

let initialState = {
  changemenudata: false,
  changemenuchild:false,
  changemenuchildO:false,
};
const changeMenu = (draft: any, data) => {
  draft.changemenudata = data;
};
const changeMenuChild = (draft: any, data) => {
  draft.changemenuchild = data;
};
const changeMenuChildO = (draft: any, data) => {
  draft.changemenuchildO = data;
};
const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.CHANGE_MENU:
        changeMenu(draft, action.payload);
        break;
      case actionTypes.CHANGE_MENU_CHILDRENT:
        changeMenuChild(draft, action.payload);
        break;
      case actionTypes.CHANGE_MENU_CHILDRENT_O:
        changeMenuChildO(draft, action.payload);
        break;
    }
  });
};

export default reducer;
