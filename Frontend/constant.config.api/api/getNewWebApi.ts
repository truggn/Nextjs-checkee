import axios from 'axios';
import { NEWS } from '../index';

export default async function getNewsApi(pagea:any) {
    let data;
    let pagePage ={
        page:pagea
    }

    await axios.get(
        NEWS,{
            params:pagePage
          }
    )
        .then(function (response) {
            data = response;
        })
        .catch(function (err) {
            data = err.response;
        });

    return data;
}