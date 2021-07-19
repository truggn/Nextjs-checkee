import axios from 'axios';
import { CHECKACCESSRIGHT } from '../index';
import { ISystemUserTypePageAccessRight } from '../../redux/actions/SystemUserTypePageActions'; 

async function checkAccessRight(value: ISystemUserTypePageAccessRight) {
    let data;
    let params = {
        "userId" : value.userId,
        "controllerName" : value.controllerName,
        "actionName" : value.actionName
    }

    await axios.post(
        CHECKACCESSRIGHT, params
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

export default checkAccessRight;