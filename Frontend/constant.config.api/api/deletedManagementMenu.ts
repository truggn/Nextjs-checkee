import axios from "axios";
import { MANAGEMENTMENU } from "./../index";
import { IMenu } from "./../../redux/actions/MangementMenuAction";
//
async function deletedManagementMenu(values: IMenu) {
  let data;
  let url = MANAGEMENTMENU + `/${values}`;
  await axios
    .delete(url)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default deletedManagementMenu;
