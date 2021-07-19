import axios from 'axios';
import { PARTICIPANT } from '../../index';
import { IListParticipant } from '../../../redux/actions/ParticipantActions';

async function updatedParticipant(value: IListParticipant) {
    let data;
    let params = {
        "update": {
            "participantName": value.participantName,
            "participantType": value.participantType,
            "address": value.address,
            "phone": value.phone,
            "code": value.code,
            "organizationId": value.organizationId,
            "createBy": value.createBy,
            "icon": value.icon
        },
        "userID": value._id
    }
    await axios.put(
        PARTICIPANT, params
    )
        .then(function (response) {
            data = response;
        })
        .catch(function (err) {
            data = err.response;
        });

    return data;
}

export default updatedParticipant;