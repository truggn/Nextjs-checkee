import axios from "axios";
import { DATAPRODUCTFORPROCESS } from "../index";

async function getProductWithoutProcessById() {
  let data;
  try {
    const dataProduct = await axios.get(DATAPRODUCTFORPROCESS);
    data = dataProduct;
  } catch (error) {
    data = error;
  }
  return data;
}
export default getProductWithoutProcessById;
