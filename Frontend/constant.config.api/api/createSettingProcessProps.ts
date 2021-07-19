import axios from "axios";
import { CREATESETTINGPROCESSPROPS} from "../index";


async function createSettingProcessProps(values) {
  let data;
  let param = {
    flowId: values.flowId,
    productAttributeId: values.productAttributeId
  };
  await axios
    .post(CREATESETTINGPROCESSPROPS, param)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default createSettingProcessProps;
