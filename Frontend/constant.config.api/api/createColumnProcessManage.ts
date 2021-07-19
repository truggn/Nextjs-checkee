import axios from 'axios';
import { CREATESETTINGPARTICIPANT } from '../index';

async function createColumnProcessManage(value) {

    let data;
    let params =

    {
        "productFlowId": value.values.productFlowId,
        "participantId": value.values.participantId,
        "createdBy": value.values.createdBy
    }



    await axios.post(
        CREATESETTINGPARTICIPANT, params, {
    })
        .then(function (response) {
            data = response;
        })
        .catch(function (err) {
            data = err.response;
        });
    return data;
}
export default createColumnProcessManage;


