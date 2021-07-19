import axios from 'axios';
import { STATICCL } from '../index';

async function getStaticColumnApi(values) {
    let data;
    console.log(values);
    let param={
        startDate:values.timeStart,
        endDate:values.timeEnd,
        id:values.organizationId,
    }

    await axios.get(
        STATICCL ,{params:param}
    )
        .then(function (response) {
            data = response;
        })
        .catch(function (err) {
            data = err.response;
        }); 
    return data;
}

export default getStaticColumnApi;