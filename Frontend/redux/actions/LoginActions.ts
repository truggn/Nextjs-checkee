export const actionTypes = {
  //Đăng nhập
  LOGIN: "LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  //Cập nhật thông tin user
  UPDATE_USER: "UPDATE_USER",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILURE: "UPDATE_USER_FAILURE"
};

export interface ILogin {
  email: string,
  password: string,
}

export interface IMemberOfOrganizations {
  organizationId:string
  organizationName:string
}

export interface IUserProfile {
  email: string,
  _id: string,
  // allowReport: boolean,
  // createdAt: string,
  firstName: string,
  // isDeleted: boolean,
  lastName: string,
  // locked: boolean,
  
  // role: string,
  // status: number,
  // updatedAt: string,
  userRole: string,
  // userType: string,
  address: string,
  phone: number,
  birthday: Date,
  certificate_image: "string",
  image_url:string,
  memberOfOrganizations: IMemberOfOrganizations[], 
}
export interface LoginState {
  readonly data: ILogin[],
  loading: boolean
}

export function login(values: ILogin) {
  return {
    type: actionTypes.LOGIN,
    payload: values
  };
}

export function loginSuccess(data: ILogin[], dataUser: IUserProfile, loading: boolean) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      data: data,
      dataUser: dataUser,
      loading: loading
    }
  };
}

export function loginFailure(error: any) {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: {
      error: error
    }
  };
}

export function updateUser(values: IUserProfile) {
  return {
    type: actionTypes.UPDATE_USER,
    payload: values
  };
}

export function updateUserSuccess(data: IUserProfile[]) {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    payload: {
      data: data,
    }
  };
}

export function updateUserFailure(error: any) {
  return {
    type: actionTypes.UPDATE_USER_FAILURE,
    payload: {
      error: error
    }
  };
}