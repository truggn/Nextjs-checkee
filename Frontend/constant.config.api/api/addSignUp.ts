import axios from 'axios';
import { SIGNUP } from '../index';
import { ISignUp } from '../../redux/actions/SignUpActions'; 

async function addSignUp(value:ISignUp) {

        let data;   
        let params = {
            "email": value.email,
            "firstName": value.firstName,
            "lastName": value.lastName,
            "password": value.password
        };
        await axios.post(
            SIGNUP, params, {
        })
            .then(function (response) {
                data = response;
            })
            .catch(function (err) {
                data = err.response;
            });
        return data;
}
export default addSignUp;


