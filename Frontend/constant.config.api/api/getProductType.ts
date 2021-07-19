import axios from "axios";
import { PRODUCTTYPE } from "./../index";
//
async function getProductType() {
  let data;
  await axios
    .get(PRODUCTTYPE)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getProductType;
