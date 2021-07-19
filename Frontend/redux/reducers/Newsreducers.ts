import produce from "immer";
import { actionTypes as newsActions, loadNewsFailure } from "../actions/NewsActions";

// var data = JSON.parse(localStorage.getItem('markdown'));
const initialState = {
  newsData:[],
  error: null,
  isWorking: false,
  
};
// console.log(dataNewss);
const requestStart = (draft: any) => {
  draft.isWorking = true;
};

const requestDone = (draft: any) => {
  draft.isWorking = false;
};

/* GET ALL CUSTOMTER REDUCERS */
// const successLoadData = (draft: any, { data }: any) => {
//   draft.newsData = draft.newsData.concat(data);
//   draft.error = null;
// };

const newsFailure = (draft: any, { error }: any) => {
  draft.error = error;
};

/* CREATE NEW CUSTOMER */
// const createCustomerSuccess = (draft: any,  {data} : any) => {
//   let newadd = drap;
//         newadd.unshift(data);
//         console.log(data);
//   draft.customerData = newadd;
//   draft.error = null;
// };
const createNewsSuccess = (draft: any, { data }: any) => {
  draft.newsData.unshift(data);
};
const updateNewsSuccess = (draft: any, { data }: any) => {
  draft.newsData[
    draft.newsData.findIndex((md) => md._id === data._id)
  ] = data;
  draft.error = null;
};
const deleteNewsSuccess = (draft: any, { id }: any) => {
  // console.log("hello",draft.draft.newData,id);
  draft.newsData=draft. newsData.filter((data)=>data._id !== id)
  draft.error = null;
};
const FailureloadNews = (draft:any, {error}:any)=>{
  draft.error = error;
}
const FailureCreateNews = (draft:any, {error}:any)=>{
  draft.error = error;
}
const FailureUpdateNews = (draft:any, {error}:any)=>{
  draft.error = error;
}
const FailureDeleteNews = (draft:any, {error}:any)=>{
  draft.error = error;
}

const reducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
    //   case customerActionTypes.GET_CUSTOMER_SUCCESS:
    //     getCustomerSuccess(draft, action.payload);
    //     break;
    //   case customerActionTypes.GET_CUSTOMER_FAILURE:
    //     getCustomerFailure(draft, action.payload);
    //     break;
      case newsActions.LOAD_NEWS_SUCCESS:
        let dataNewss = [...state.newsData];
        let dataN = action.payload.data;
        const stateNewsUpdate = dataNewss.concat(dataN);
        return{
          ...state,
          newsData: stateNewsUpdate
        };
      // successLoadData(draft,action.payload);
      break;
      case newsActions.LOAD_NEWS_FAILURE:
        FailureloadNews(draft,action.payload);
        break;
      case newsActions.CREATE_NEWS_SUCCESS:
        // let dataNews:any = [...state.newsData];
        // let dataNew:any = action.payload.data;
        // dataNews.unshift(dataNew);
        // return{
        //   ...state,
        //   newsData: dataNews
        // };
        createNewsSuccess(draft,action.payload);
        break;
      case newsActions.CREATE_NEWS_FAILURE:
        FailureCreateNews(draft,action.payload);
        break;
      case newsActions.DELETE_NEWS_SUCCESS:
        // let datanews1 = [...state.newsData];
        // let idNew = action.payload.id;
        // let newDatanews = datanews1.filter((data)=>data._id !== idNew);
        // return{
        //   ...state,
        //   newsData:newDatanews,
        // }
        deleteNewsSuccess(draft,action.payload);
        break;
      case newsActions.DELETE_NEWS_FAILURE:
        FailureDeleteNews(draft,action.payload);
        break;
      case newsActions.UPDATE_NEWS_SUCCESS:
        updateNewsSuccess(draft, action.payload);
        break;
      case newsActions.UPDATE_NEWS_FAILURE:
        FailureUpdateNews(draft,action.payload);
        break;
      case newsActions.RESET_DATA_NEWS:
        return{
          ...state,
          newsData:[],
        }

    }
  });
};

export default reducer;
