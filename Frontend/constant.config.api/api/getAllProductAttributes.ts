import axios from "axios";
import { PRODUCTATTRIBUTES } from "./../index";
//
async function getProductAttributes() {
  let data;
  await axios
    .get(PRODUCTATTRIBUTES)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getProductAttributes;
