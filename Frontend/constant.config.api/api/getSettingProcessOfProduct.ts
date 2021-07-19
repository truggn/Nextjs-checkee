import axios from "axios";
import { SETTINGPROCESSOFPRODUCT } from "./../index";
//
async function getSettingProcessOfProduct(id: string) {
  let data;
  let param =
    SETTINGPROCESSOFPRODUCT + "?id=" + id;
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
