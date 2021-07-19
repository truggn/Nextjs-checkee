import axios from 'axios'
import { APPENDIXCONTRACT } from '../index'

export default async function getContract(){
  let data:any = null; 

  await axios.get(APPENDIXCONTRACT)
    .then(res => {
      data = res;
    })
    .catch(err => {
      data = err
    })

  return data;
}