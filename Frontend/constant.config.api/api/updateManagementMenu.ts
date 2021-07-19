import axios from "axios";
import { MANAGEMENTMENU } from "./../index";
import { IMenu } from "./../../redux/actions/MangementMenuAction";
//
async function updateManagementMenu(values: IMenu) {
  let data;
  let url = MANAGEMENTMENU + `/${values._id}`;
  let body = {
    clas: values.clas,
    pageId: values.pageId,
    name: values.name,
    orderNo: values.orderNo,
    url: values.url,
    isDashBoard: values.isDashBoard,
    isVisible: values.isVisible,
    parentId: values.parentId,
  };
  await axios
    .put(url, body)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default updateManagementMenu;
