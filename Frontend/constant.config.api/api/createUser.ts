import axios from "axios";
import { CREATEUSER } from "./../index";
import { IListUser } from "./../../redux/actions/ListUserActions";
//
async function createUser(values: IListUser) {
  let data;
  let param = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    sex: Number(values.sex),
    phone: values.phone,
    address: values.address,
    userType: values.userType,
    userTypeId: values.userTypeId,
    image_url: values.certificate_image,
  };
  await axios
    .post(CREATEUSER, param)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default createUser;
