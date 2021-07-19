import axios from "axios";
import { CREATE_PRODUCT_REPAIR } from "./../index";
//
async function getProduct() {
  let data;
  await axios
    .get(CREATE_PRODUCT_REPAIR)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getProduct;
