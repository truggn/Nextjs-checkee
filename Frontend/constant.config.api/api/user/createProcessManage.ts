import axios from "axios";
import { PROCESSMANAGEUSER } from "../../index";
import { IListProcessManage } from "../../../redux/actions/user/ProcessManageActions";

async function createProcessManage(values: IListProcessManage) {
  let data;
  let param = {
    code: values.code,
    name: values.name,
    organizationId: values.organizationId,
    productTypeId: values.productTypeId,
    createdBy: values.createdBy,
  };
  await axios
    .post(PROCESSMANAGEUSER, param)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default createProcessManage;
