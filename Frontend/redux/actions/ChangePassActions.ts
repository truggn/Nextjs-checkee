export const actionTypes = {
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_FAILURE: "CHANGE_PASSWORD_FAILURE",
  
  CHANGE_FORGOT_PASSWORD: "CHANGE_FORGOT_PASSWORD",
  CHANGE_FORGOT_PASSWORD_SUCCESS: "CHANGE_FORGOT_PASSWORD_SUCCESS",
  CHANGE_FORGOT_PASSWORD_FAILURE: "CHANGE_FORGOT_PASSWORD_FAILURE",
};

export interface IChangePass {
  email: string,
  password: string,
  new_password: string,
  new_password_confirm: string,

}
export interface IChangePassPreview {
  new_password: string,
  new_password_confirm: string,
  token: string
}


// Thay đổi mật khẩu
export function changePass(values: IChangePass) {
  return {
    type: actionTypes.CHANGE_PASSWORD,
    payload: values
  };
}

export function changePassSuccess(data: IChangePass[]) {
  return {
    type: actionTypes.CHANGE_PASSWORD_SUCCESS,
    payload: {
      data: data,
    }
  };
}

export function changePassFailure(error: any) {
  return {
    type: actionTypes.CHANGE_PASSWORD_FAILURE,
    payload: {
      error: error
    }
  };
}

//Quên mật khẩu

export function changeForgotPass(values: IChangePassPreview) {
  return {
    type: actionTypes.CHANGE_FORGOT_PASSWORD,
    payload: values
  };
}

export function changeForgotPassSuccess(data: IChangePass[]) {
  return {
    type: actionTypes.CHANGE_FORGOT_PASSWORD_SUCCESS,
    payload: {
      data: data,
    }
  };
}

export function changeForgotPassFailure(error: any) {
  return {
    type: actionTypes.CHANGE_FORGOT_PASSWORD_FAILURE,
    payload: {
      error: error
    }
  };
}