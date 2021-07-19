import axios from 'axios';
import { FORGOTPASS } from '../index';
import { IForgotPass } from '../../redux/actions/ForgotPassActions'; 

async function forgotPass(value:IForgotPass) {

        let data;   
        let params = {
            "email": value.email,
        };
        await axios.post(
            FORGOTPASS, params, {
        })
            .then(function (response) {
                data = response;
            })
            .catch(function (err) {
                data = err.response;
            });
        return data;
}
export default forgotPass;


