import axios from 'axios';
import { USERTYPE } from '../index';
import { IUserType } from '../../redux/actions/UserTypeActions'; 
import { IUserProfile } from '../../redux/actions/LoginActions';

async function addUserType(value : IUserType) {
    let data;
    let params = {
        "name": value.name,
        "orderNo": value.orderNo,
        "note": value.note,
        "objectId" : value.objectId
    };

    await axios.post(
        USERTYPE, params
        // {
        //     headers: {
        //         "Authorization": "Bearer " + user_cookies.token
        //         /*"Authorization": "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZTY4NjcyNDliYzY2OTZlY2VlNzMwZSIsInB3aCI6NzQ4NDYyMjc2LCJpYXQiOjE1NDE4Mzc1MzUsImV4cCI6MTU0MTkyMzkzNX0.gkD_Ym2uk17YcQydIuQ8q0Vm5a8SmF1KygrdnVX-4l0'*/
        //     }
        // }
    )
        .then(function (response) {
            data = response;
        })
        .catch(function (err) {
            data = err.response;
        }); 
    return data;
}

export default addUserType;