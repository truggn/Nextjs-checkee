import axios from "axios";
import { MANAGEMENTMENU } from "./../index";
import { IMenu } from "./../../redux/actions/MangementMenuAction";

//
async function createManagementMenu(values: IMenu) {
  let data;
  let param = {
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
    .post(MANAGEMENTMENU, param)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default createManagementMenu;
