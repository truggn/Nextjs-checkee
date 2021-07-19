import axios from 'axios';
import { PARTICIPANT } from '../../index';
import { IListParticipant } from '../../../redux/actions/ParticipantActions'; 

async function addParticipant(value:IListParticipant) {

        let data;   
        let params = {
            "email": value.email,
            "participantName": value.participantName,
            "phone": value.phone,
            "participantType": value.participantType,
            "address": value.address,
            "code": value.code,
            "createBy": value.createBy,
            "organizationId": value.organizationId,
            "id": value._id,
            "icon": value.icon
        };
        await axios.post(
            PARTICIPANT, params, {
        })
            .then(function (response) {
                data = response;
            })
            .catch(function (err) {
                data = err.response;
            });
        return data;
}
export default addParticipant;


