import axios from 'axios';
import { SYSTEMPAGE } from '../index';
import { ISystemPage } from '../../redux/actions/SystemPageActions'; 

async function updateSystemPage(value: ISystemPage) {
    let data;
    let params = {
        "name": value.name,
        "controllerName": value.controllerName,
        "actionName": value.actionName,
        "url": value.url,
        "orderNo": Number(value.orderNo),
        "parentId": value.parentId,
        "icon": value.icon,
        "level": Number(value.level),
        "status" : 1
    }    

    await axios.put(
        SYSTEMPAGE + "/" + value._id, params
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

export default updateSystemPage;