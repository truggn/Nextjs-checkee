import axios from "axios";
import { CREATE_PRODUCTUSER_REPAIR } from "../../index";
//
async function getProduct(params) {
  let data;
  await axios
    .get(CREATE_PRODUCTUSER_REPAIR + `/getByOrganization?id=${params}`)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getProduct;
