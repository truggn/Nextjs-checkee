import axios from "axios";
import { CONTRACT } from "./../index";
//
async function getContract() {
  let data;
  await axios
    .get(CONTRACT)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getContract;
