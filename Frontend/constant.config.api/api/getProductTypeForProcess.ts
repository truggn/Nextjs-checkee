import axios from "axios";
import {
    DATAPRODUCTFORPROCESS
} from '../index'
import { IProductForProcess } from '../../redux/actions/ProductTypeForProcessActions'

async function getProductForProcessById(id: IProductForProcess) {
    let data;
    try {
        const dataProduct = await axios.get(DATAPRODUCTFORPROCESS + `/${id}`)
        data = dataProduct
    } catch (error) {
        data = error
    }
    return data
}
export default getProductForProcessById