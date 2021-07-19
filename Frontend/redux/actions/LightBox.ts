export const actionTypes ={

    OPEN_LIGHT_BOX : "OPEN_LIGHT_BOX",
    CLOSE_LIGHT_BOX : "CLOSE_LIGHT_BOX",

    DATA_LIGHT_BOX: "DATA_LIGHT_BOX",
}

export function openLightBox() {
    return {
      type: actionTypes.OPEN_LIGHT_BOX,
    };
  }
  export function closeLightBox() {
    return {
      type: actionTypes.CLOSE_LIGHT_BOX,
    };
  }
  export function setDataLightBox(data) {
    return {
      type: actionTypes.DATA_LIGHT_BOX,
      payload:{
          data,
      }
    };
  }