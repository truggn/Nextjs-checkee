import axios from "axios";
import { CONTRACT } from "./../index";
import { IContract } from "./../../redux/actions/ContractActions";
//
async function deletedDataContract(values: IContract) {
  let data;
  let url = CONTRACT + `/${values}`;
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

export default deletedDataContract;
