import axios from "axios";
import { USERMANAGE } from "../index";
import { ICreateUserManage } from "./../../redux/actions/UserManageActions";

async function createUserManage(values: ICreateUserManage) {
  let data;
  let param = {
      "data": [
          {
            "organizationId": values.organizationId,  
            "userId": values.userId
          }     
      ]  
  };
  await axios
    .post(USERMANAGE, param)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default createUserManage;
