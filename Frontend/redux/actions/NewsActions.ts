export const actionTypes = {
    LOAD_NEWS: "LOAD_NEWS",
    LOAD_NEWS_SUCCESS: "LOAD_NEWS_SUCCESS",
    LOAD_NEWS_FAILURE: "LOAD_NEWS_FAILURE",

    CREATE_NEWS: "CREATE_NEWS",
    CREATE_NEWS_SUCCESS: "CREATE_NEWS_SUCCESS",
    CREATE_NEWS_FAILURE: "CREATE_NEWS_FAILURE",

    DELETE_NEWS: "DELETE_NEWS",
    DELETE_NEWS_SUCCESS: "DELETE_NEWS_SUCCESS",
    DELETE_NEWS_FAILURE: "DELETE_NEWS_FAILURE",

    UPDATE_NEWS: "UPDATE_NEWS",
    UPDATE_NEWS_SUCCESS: "UPDATE_NEWS_SUCCESS",
    UPDATE_NEWS_FAILURE: "UPDATE_NEWS_FAILURE",

    RESET_DATA_NEWS: "RESET_DATA_NEWS",
}
export interface IListNewss {
  title: string;
  content: string;
  images: {
    url : string ;
  }
  createdBy:{
    firstName,
    lastName,
  };
  createdAt:string;
  
}
export interface IListNews {
    title: string;
    content: string;
    images: string;
    createdBy:string;
    // createdAt:string;
    
  }
  export interface IListNewsUpdate {
    title: string;
    content: string;
    images: string;
    updatedBy:string;
    id:string;
  }
  export interface Iuser{
    _id:string
  }
  export function loadNews(page:any){
    return{
      type:actionTypes.LOAD_NEWS,
      page,
    }
  }
  export function loadNewsSuccess(data:any){
    return{
      type:actionTypes.LOAD_NEWS_SUCCESS,
      payload: {
        data: data,
      }
    }
  }
  export function loadNewsFailure(error){
    return{
      type:actionTypes.LOAD_NEWS_SUCCESS,
      error,
    }
  }
  export function createNews(values: IListNews) {
    return {
      type: actionTypes.CREATE_NEWS,
      payload: {
        values:values
      }
    };
  }
  export function createNewsSuccess(data: IListNews[]) {
    return {
      type: actionTypes.CREATE_NEWS_SUCCESS,
      payload: {
       data,
      }
    };
  }
  export function createNewsFailure(error:any) {
    return {
      type: actionTypes.CREATE_NEWS_FAILURE,
      payload: {
       error,
      }
    };
  }

  export function deleteNews(values: IListNews) {
    return {
      type: actionTypes.DELETE_NEWS,
      payload: {
        values:values
      }
    };
  }
  export function deleteNewsSuccess(id:any) {
    return {
      type: actionTypes.DELETE_NEWS_SUCCESS,
      payload: {
       id,
      }
    };
  }
  export function deleteNewsFailure(error:any) {
    return {
      type: actionTypes.DELETE_NEWS_FAILURE,
      payload: {
       error,
      }
    };
  }

  export function updateNews(values: IListNews) {
    return {
      type: actionTypes.UPDATE_NEWS,
      payload: {
        values:values,
      }
    };
  }
  export function updateNewsSuccess(data:any) {
    return {
      type: actionTypes.UPDATE_NEWS_SUCCESS,
      payload: {
       data,
      }
    };
  }
  export function updateNewsFailure(error:any) {
    return {
      type: actionTypes.UPDATE_NEWS_FAILURE,
      payload: {
       error,
      }
    };
  }
  export function resetDataNews() {
    return {
      type: actionTypes.RESET_DATA_NEWS,
    };
  }