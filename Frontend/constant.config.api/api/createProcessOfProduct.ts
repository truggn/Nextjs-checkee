import axios from "axios";
import { PROCESSMANAGE } from "../index";
import { IListProcessManage } from "./../../redux/actions/ProcessManageActions";

async function createProcessOfProduct(value) {
  console.log("valueApi", value);
  let api = PROCESSMANAGE + "/changeProductFlow";
  let data;
  let param = {
    productFlowID: value.id,
    flows: value.data,
  };
  await axios
    .put(api, param)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default createProcessOfProduct;
