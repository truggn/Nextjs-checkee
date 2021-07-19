import axios from "axios";
import { PROCESSMANAGE } from "./../index";
//
async function getSettingProcessColumn(id: string) {
  let data;
  let param =
  PROCESSMANAGE + "/" + id ;
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

export default getSettingProcessColumn;
