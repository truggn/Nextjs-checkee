export const actionTypes = {
    LOAD_DATA: "LOAD_DATA",
    LOAD_DATA_SUCCESS: "LOAD_DATA_SUCCESS",
    LOAD_DATA_FAILURE: "LOAD_DATA_FAILURE"
  };

export interface IEmployee {
    id: number
    name: string,
    email: string,
    address: string,
    phone: number,
}
export interface EmployeeState {
  readonly data: IEmployee[]
}

  export function loadData() {
    return {
      type: actionTypes.LOAD_DATA
    };
  }
  
  export function loadDataSuccess(data: IEmployee[]) {
    return {
      type: actionTypes.LOAD_DATA_SUCCESS,
      payload: {
        data: data
      }
    };
  }
  
  export function loadDataFailure(error: any) {
    return {
      type: actionTypes.LOAD_DATA_FAILURE,
      payload: {
        error: error
      }
    };
  }
  