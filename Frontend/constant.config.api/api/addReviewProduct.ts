import axios from "axios";
import { REVIEWPRODUCT } from "../index";
async function addReviewProduct(param: any) {
  let data;
  try {
    const res = await axios.post(REVIEWPRODUCT, param);
    data = res;
  } catch (error) {
    data = error;
  }
  return data;
}
export default addReviewProduct;
