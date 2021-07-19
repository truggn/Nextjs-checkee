export const actionTypes = {
    LOGOUT: "LOGOUT",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_FAILURE: "LOGOUT_FAILURE"
  };

export interface ILogout {
    
}
export interface LogoutState {
  readonly data: ILogout[],
  loading: boolean
}
  export function logout() {
    return {
      type: actionTypes.LOGOUT,
    };
  }
  
  export function logoutSuccess(data: ILogout[], loading: boolean) {
    return {
      type: actionTypes.LOGOUT_SUCCESS,
      payload: {
        data: data,
        loading: loading
      }
    };
  }
  
  export function logoutFailure(error: any) {
    return {
      type: actionTypes.LOGOUT_FAILURE,
      payload: {
        error: error
      }
    };
  }
  