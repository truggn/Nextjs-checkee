import axios from 'axios';
import { CHANGEFORGOTPASSWORD } from '../index';
import { IChangePassPreview } from '../../redux/actions/ChangePassActions'; 

    
async function changeForgotPassword(value:IChangePassPreview) {

        let data;   
        let params = {
            "new_password": value.new_password,
            "new_password_confirm": value.new_password_confirm
        };
        await axios.post(
            CHANGEFORGOTPASSWORD + "?token=" + `${value.token}` 
             , params, {
        })
            .then(function (response) {
                data = response;
            })
            .catch(function (err) {
                data = err.response;
            });
        return data;
}
export default changeForgotPassword;


