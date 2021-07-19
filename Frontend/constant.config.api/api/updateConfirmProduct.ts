import axios from "axios";
import { CREATE_PRODUCT_REPAIR } from "../index";

async function updatedSystemUserTypePage(value: string) {
  let data;
  // let params = {
  //     "id": value,
  // }
  let url = CREATE_PRODUCT_REPAIR + `/${value}`;
  await axios
    .put(url)
    .then(function (response) {
      data = response;
    })
    .catch(function (err) {
      data = err.response;
    });

  return data;
}

export default updatedSystemUserTypePage;
