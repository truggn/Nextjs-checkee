import axios from 'axios';
import {NEWS} from '../index';

export default async function deleteNewsApi(value) {
    let data;
    let dataDelete = {
         id : value.values.row._id,
         deletedBy : value.values.deletedBy,
    }
    await axios.put(NEWS +'/id',dataDelete)
    .then(res => {
      if(res.status === 200) {
        data = res  
      }
    })
    .catch(err => {
      console.log("Failed: ", err)
      data = err
    })
    return data;
}