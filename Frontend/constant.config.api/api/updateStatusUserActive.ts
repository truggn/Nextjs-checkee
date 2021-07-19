import axios from "axios";
import { UPDATEUSER } from "./../index";
import { IListUser } from "./../../redux/actions/ListUserActions";
//
async function updateStatusActive(values: IListUser) {
  let data;
  console.log("values", values);
  let body = {
    userID: values._id,
    update: {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      birthday: values.birthday,
      sex: values.sex,
      status: 1,
      address: values.address,
      userType: values.userType,

      // userRole: string,
      certificate_image: values.certificate_image,
    },
  };
  await axios
    .put(UPDATEUSER, body)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default updateStatusActive;
