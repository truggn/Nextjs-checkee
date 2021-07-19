import axios from 'axios';
import { PROCESSOFPRODUCT } from '../index';
import { IProduct } from '../../redux/actions/ProcessOfProductAction';

async function updatedProcessOfProduct(values: IProduct) {
    let data;
    let params = { products: values }
    try {
        const respone = await axios.post(PROCESSOFPRODUCT, params)
        data = respone

    } catch (error) {
        data = error
    }
    return data;
}

export default updatedProcessOfProduct;