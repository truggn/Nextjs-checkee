import produce from 'immer';
import { actionTypes } from '../actions/ChooseOranizationActions';

const initialState = {
    chooseoranization: null,
    error: "",
  };
  
  const successChooseOranization = (draft: any,  data : any) => {
    draft.chooseoranization = data.data;
  };
  
  const failureChangePass = (draft: any, { error }: any) => {
    draft.error = error;
  };
  
  const reducer = (state = initialState, action: any) => {
    return produce(state, draft => {
      switch (action.type) {
        case actionTypes.CHOOSE_ORANIZATION:
            console.log(action.payload)
          successChooseOranization(draft, action.payload);
          break;
      }
    });
  };
  
  export default reducer;