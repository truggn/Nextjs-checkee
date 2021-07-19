import axios from "axios";
import { PROCESSMANAGE } from "../index";
import { IListProcessManage } from "./../../redux/actions/ProcessManageActions";

async function createProcessManage(values: IListProcessManage) {
  let data;
  let param = {
    "code": values.code,
    "name": values.name,
    "organizationId": values.organizationId,
    "productTypeId": values.productTypeId,
    "createdBy": values.createdBy
  };
  await axios
    .post(PROCESSMANAGE, param)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default createProcessManage;
