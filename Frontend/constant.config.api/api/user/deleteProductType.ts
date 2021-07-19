import axios from "axios";
import { PRODUCTTYPEUSER } from "../../index";
import { IProductType } from "../../../redux/actions/user/ProductTypeActions";
//
async function deletedProductTye(values: IProductType) {
  let data;
  try {
    const res = await axios.put(PRODUCTTYPEUSER, values);

    data = res;
  } catch (error) {
    data = error;
  }
  return data;
}

export default deletedProductTye;
