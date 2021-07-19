export const actionTypes = {
    CHANGE_MENU: "CHANGE_MENU",
    CHANGE_MENU_CHILDRENT: "CHANGE_MENU_CHILDRENT",
    CHANGE_MENU_CHILDRENT_O: "CHANGE_MENU_CHILDRENT_O",
  };
  
  
  
  export function changeMenu(values: boolean) {
    return {
      type: actionTypes.CHANGE_MENU,
      payload: values
    };
  }

  export function changeMenuChild(values: boolean) {
    return {
      type: actionTypes.CHANGE_MENU_CHILDRENT,
      payload: values
    };
  }
  export function changeMenuChildO(values: boolean) {
    return {
      type: actionTypes.CHANGE_MENU_CHILDRENT_O,
      payload: values
    };
  }

