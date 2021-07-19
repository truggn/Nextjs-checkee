import axios from 'axios';
import { STATICALL } from '../index';

async function getStaticAllApi(values) {
    let data;
    console.log(values);
    let param={
        startDate:values.timeStart,
        endDate:values.timeEnd,
    }

    await axios.get(
        STATICALL ,{params:param}
    )
        .then(function (response) {
            data = response;
        })
        .catch(function (err) {
            data = err.response;
        }); 
    return data;
}

export default getStaticAllApi;