import axios from 'axios';
import { STATICD } from '../index';

async function getStaticDayApi(values) {
    let data;
    let param={
        startDate:values.timeStart,
        endDate:values.timeEnd,
        id:values.organizationId,
    }

    await axios.get(
        STATICD ,{params:param}
    )
        .then(function (response) {
            data = response;
        })
        .catch(function (err) {
            data = err.response;
        }); 
    return data;
}

export default getStaticDayApi;