import axios from 'axios'
import { CUSTOMER } from '../index'

export default async function updateCustomer({ id, ...rest}){
  let data:any = null; 
  await axios.put(CUSTOMER + '/' + id, {
      update : {
        ...rest
      }
    })
    .then(res => {
      data = res;
    })
    .catch(err => {
      data = err
    })

  return data;
}