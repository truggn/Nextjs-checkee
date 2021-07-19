import axios from "axios";
import { PRODUCTTYPE } from "./../index";
//
async function getProductTypeOfOrganization(value) {
  let data;
  await axios
    .get(PRODUCTTYPE + "/getProductTypeOfOrganization" + `?organizationId=${value}`)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getProductTypeOfOrganization;
