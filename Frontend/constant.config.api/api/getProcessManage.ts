import axios from "axios";
import { PROCESSMANAGE } from "./../index";
//
async function getProcessManage() {
  let data;
  await axios
    .get(PROCESSMANAGE)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getProcessManage;
