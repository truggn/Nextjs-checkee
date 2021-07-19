import axios from 'axios';
import { STATICM } from '../index';

async function getStaticMonthApi(values) {
    let data;
    console.log(values);
    let param={
        startDate:values.timeStart,
        endDate:values.timeEnd,
        id:values.organizationId,
    }

    await axios.get(
        STATICM ,{params:param}
    )
        .then(function (response) {
            data = response;
        })
        .catch(function (err) {
            data = err.response;
        }); 
    return data;
}

export default getStaticMonthApi;