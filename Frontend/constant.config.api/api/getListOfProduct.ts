import axios from "axios";
import { LISTOFPRODUCT } from "../index";


async function ListOfProductAPI (id) {
    let data ;
    try {
        const res = await axios.get(LISTOFPRODUCT +`?categoryID=${id}`) ;
        data = res.data;
    } catch (error) {
        data = error;
    }
    return data;
}

export default ListOfProductAPI ;