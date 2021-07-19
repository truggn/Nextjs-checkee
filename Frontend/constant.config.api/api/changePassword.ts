import axios from 'axios';
import { CHANGEPASSWORD } from '../index';
import { IChangePass } from '../../redux/actions/ChangePassActions'; 

async function changePassword(value:IChangePass) {

        let data;   
        let params = {
            "email": value.email,
            "password": value.password,
            "new_password": value.new_password,
            "new_password_confirm": value.new_password_confirm
        };
        await axios.post(
            CHANGEPASSWORD, params, {
        })
            .then(function (response) {
                data = response;
            })
            .catch(function (err) {
                data = err.response;
            });
        return data;
}
export default changePassword;


