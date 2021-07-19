import axios from "axios";
import { CATEGORY } from "..";
 
async function categoryProductAPI () {
    let data ;
    try {
    const dataProduct = await axios.get(CATEGORY + "/home-category");
    data = dataProduct ; 
    } catch (error) {
    data = error ;    
    }
    return data ;
}

export default categoryProductAPI ;
