import produce from "immer";
import { actionTypes } from "../actions/CategoryProductActions";


    const initialState = {
    categoryProductData: [],
    listOfProductData : [],
    error : false , 
    errorListOfProduct : false,
    };

    const successLoadData = (draft: any, { data }: any) => {
        draft.categoryProductData = data;
    };

    const failureLoadData = (draft : any, { error }:any) => {
        draft.error = error;
    };

    const successLoadListOfProduct = (draft: any, { data }: any) => {
        draft.listOfProductData = data;
    };

    const failLoadListOfProduc = (draft : any, { error }:any) => {
        draft.errorListOfProduct = error;
    };

const reducer = (state = initialState, action: any) => {
    return produce(state, draft => {
    switch (action.type) {
        case actionTypes.LOAD_DATA_CATEGORYPRODUCT_SUCCESS : 
        successLoadData(draft, action.payload);
        break ;
        case actionTypes.LOAD_DATA_CATEGORYPRODUCT_FAILED : 
        failureLoadData(draft, action.payload);
        break;
        case actionTypes.LOAD_DATA_LISTOFPRODUCT_SUCCESS :
        successLoadListOfProduct(draft , action.payload);
        break ;
        case actionTypes.LOAD_DATA_LISTOFPRODUCT_FAILED : 
        failLoadListOfProduc(draft , action.payload);
        break;
        }
    });
};

export default reducer;