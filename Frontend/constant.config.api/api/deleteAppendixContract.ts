import axios from "axios";
import { APPENDIXCONTRACT } from "../index";
import { IAppendixContract } from "../../redux/actions/AppendixContractActions";

async function deletedAppendixContract(values: IAppendixContract) {
  let data;
  let url = APPENDIXCONTRACT + `/${values}`;
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

export default deletedAppendixContract;
