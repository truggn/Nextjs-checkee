import axios from "axios";
import { LISTUSER } from "./../index";
//
async function getListUser() {
  let data;
  await axios
    .get(LISTUSER)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getListUser;
