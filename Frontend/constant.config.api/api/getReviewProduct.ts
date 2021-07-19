import axios from "axios";
import { REVIEWPRODUCT } from "../index";
async function getReviewProduct(id) {
  let data;
  try {
    const res = await axios.get(REVIEWPRODUCT + `/list?id=${id}`);
    data = res.data;
  } catch (error) {
    data = error;
  }
  return data;
}

export default getReviewProduct;
