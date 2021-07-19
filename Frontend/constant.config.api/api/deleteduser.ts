import axios from "axios";
import { DELETEDUSER } from "./../index";
import { IListUser } from "./../../redux/actions/ListUserActions";
//
async function deletedUser(values: IListUser) {
  let data;
  let url = DELETEDUSER + `/${values}`;
  await axios
    .delete(url)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default deletedUser;
