export const actionTypes = {
    FORGOT_PASSWORD: "FORGOT_PASSWORD",
    FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
    FORGOT_PASSWORD_FAILURE: "FORGOT_PASSWORD_FAILURE"
  };

export interface IForgotPass {
    email: string
}
export interface ForgotPassState {
  readonly data: IForgotPass[],
  loading: boolean
}
  export function forgotPass(values: IForgotPass) {
    return {
      type: actionTypes.FORGOT_PASSWORD,
      payload: values
    };
  }
  
  export function forgotPassSuccess(data: IForgotPass[], loading: boolean) {
    return {
      type: actionTypes.FORGOT_PASSWORD_SUCCESS,
      payload: {
        data: data,
        loading: loading
      }
    };
  }
  
  export function forgotPassFailure(error: any) {
    return {
      type: actionTypes.FORGOT_PASSWORD_FAILURE,
      payload: {
        error: error
      }
    };
  }
  