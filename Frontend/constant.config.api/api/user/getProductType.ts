import axios from "axios";
import { PRODUCTTYPEUSER } from "./../../index";
//
async function getProductType(params) {
  let data;
  await axios
    .get(
      PRODUCTTYPEUSER +
        "/getProductTypeOfOrganization" +
        `?organizationId=${params}`
    )
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getProductType;
