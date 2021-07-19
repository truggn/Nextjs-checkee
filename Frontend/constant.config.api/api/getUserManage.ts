import axios from "axios";
import { USERMANAGE } from "./../index";
//
async function getUserManage(value) {
  let data;
  await axios
    .get(USERMANAGE + "/getMembersOfOrganization" + `?organizationId=${value}`)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getUserManage;
