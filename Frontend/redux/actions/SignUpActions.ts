export const actionTypes = {
    ADD_SIGNUP: "ADD_SIGNUP",
    ADD_SIGNUP_SUCCESS: "ADD_SIGNUP_SUCCESS",
    ADD_SIGNUP_FAILURE: "ADD_SIGNUP_FAILURE"
  };

export interface ISignUp {
    lastName: string,
    firstName: string,
    email: string,
    password: string,
    phone: number,
    address: string,
}
export interface SignUpState {
  readonly data: ISignUp[],
  loading: boolean
}
  export function addSignUp(values: ISignUp) {
    return {
      type: actionTypes.ADD_SIGNUP,
      payload: values
    };
  }
  
  export function addSignUpSuccess(data: ISignUp[], loading: boolean) {
    return {
      type: actionTypes.ADD_SIGNUP_SUCCESS,
      payload: {
        data: data,
        loading: loading
      }
    };
  }
  
  export function addSignUpFailure(error: any) {
    return {
      type: actionTypes.ADD_SIGNUP_FAILURE,
      payload: {
        error: error
      }
    };
  }
  