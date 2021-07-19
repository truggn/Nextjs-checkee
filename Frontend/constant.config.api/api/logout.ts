import axios from 'axios';
import { LOGOUT } from '../index';


async function logout() {

        let data;   
        
        await axios.post(
            LOGOUT, {
        })
            .then(function (response) {
                data = response;
            })
            .catch(function (err) {
                data = err.response;
            });
        return data;
}
export default logout;


