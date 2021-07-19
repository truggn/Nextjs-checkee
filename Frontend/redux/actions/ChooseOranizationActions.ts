export const actionTypes ={
    CHOOSE_ORANIZATION : " CHOOSE_ORANIZATION",
}
export function chooseOranization(data){
   return{
    type:actionTypes.CHOOSE_ORANIZATION,
    payload:{
        data,
    }
   }
}