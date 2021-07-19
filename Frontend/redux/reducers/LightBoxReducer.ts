import produce from "immer";
import { actionTypes} from "../actions/LightBox";

const initialState = {
    lightBoxData: [],
    isOpen: false,
  };
  const createDataLightBox = (draft: any, { data }: any) => {
    draft.lightBoxData = data;
  };
  const openLightBox = (draft)=>{
    draft.isOpen = true
  }
  const closeLightBox = (draft)=>{
    draft.isOpen = false
  }
  const Listreducer = (state = initialState, action: any) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.OPEN_LIGHT_BOX:
                openLightBox(draft)
                break;
            case actionTypes.CLOSE_LIGHT_BOX:
                closeLightBox(draft)
                break;
            case actionTypes.DATA_LIGHT_BOX:
                createDataLightBox(draft,action.payload)
            break;
        }
    });
}
  export default Listreducer;