import axios from 'axios';
import { GETUSERLOGIN } from '../index';


async function getUserLogin() {

        let data;   
        
        await axios.get(
            GETUSERLOGIN, {
        })
            .then(function (response) {
                data = response;
            })
            .catch(function (err) {
                console.log(err)
                data = err.response;
            });
        return data;
}
export default getUserLogin;


