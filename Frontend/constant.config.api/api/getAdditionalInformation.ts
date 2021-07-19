import axios from 'axios'
import { GETADDITIONALINFORMATION } from '../index'

export default async function getAdditionalInformation(id){
  let data:any = null; 

  await axios.get(GETADDITIONALINFORMATION + `?productTypeId=${id}`)
    .then(res => {
      data = res;
    })
    .catch(err => {
      data = err
    })

  return data;
}