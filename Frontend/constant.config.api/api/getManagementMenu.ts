import axios from "axios";
import { MANAGEMENTMENU } from "./../index";
//
async function getManagementMenu() {
  let data;
  await axios
    .get(MANAGEMENTMENU)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getManagementMenu;
