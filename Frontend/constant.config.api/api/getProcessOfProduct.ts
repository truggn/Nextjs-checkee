import axios from "axios";
import { PRODUCTFLOW } from "./../index";
//
async function getProcessOfProduct(id) {
  let data;
  let param = PRODUCTFLOW + "/" + id;
  await axios
    .get(param)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getProcessOfProduct;
