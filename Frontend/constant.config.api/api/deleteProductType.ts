import axios from "axios";
import { PRODUCTTYPE } from "./../index";
import { IProductType } from "./../../redux/actions/ProductTypeActions";
//
async function deletedProductTye(values: IProductType) {
  let data;
  try {
    const res = await axios.put(PRODUCTTYPE, values);

    data = res;
  } catch (error) {
    data = error;
  }
  return data;
}

export default deletedProductTye;
