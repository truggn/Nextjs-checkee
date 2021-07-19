import axios from 'axios'
import { CUSTOMER } from '../index'

export default async function deleteCustomer({ _id, ...rest}){
  let data:any = null
  const id = _id
  await axios.delete(CUSTOMER + '/' + id)
    .then(res => {
      if(res.status === 200) {
        data = {
          data: {
            data: {
              id
            }
          }
        }
      }
    })
    .catch(err => {
      console.log("Failed: ", err)
      data = err
    })

  return data;
}