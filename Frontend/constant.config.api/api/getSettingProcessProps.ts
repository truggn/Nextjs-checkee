import axios from "axios";
import { SETTINGPROCESSPROPS } from "./../index";
//
async function getSettingProcessOfProduct(id: string) {
  let data;
  let param =
    SETTINGPROCESSPROPS + "?flowId=" + id;
  await axios
    .get(param)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getSettingProcessOfProduct;
