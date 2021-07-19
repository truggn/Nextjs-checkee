import axios from "axios";
import { PROCESSMANAGEUSER } from "../../index";
//
async function getProcessManage(params) {
  let data;
  await axios
    .get(
      PROCESSMANAGEUSER +
        "/getProductFlowOfOrganization?organizationId=" +
        params
    )
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getProcessManage;
