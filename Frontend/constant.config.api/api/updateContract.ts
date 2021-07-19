import axios from "axios";
import { CONTRACT } from "./../index";
import { IContract } from "./../../redux/actions/ContractActions";
//
async function updateContract(values: IContract) {
  let data;
  let url = CONTRACT + `/${values._id}`;
  let body = {
    update: {
      customerId: values.customerId,
      numberContract: values.numberContract,
      nameContract: values.nameContract,
      date: values.date,
      startDay: values.startDay,
      endDay: values.endDay,
      durationPay: values.durationPay,
      packageBuy: values.packageBuy,
      contractValue: values.contractValue,
      vat: values.vat,
      vatPrice: values.vatPrice,
      publicKey: values.publicKey,
      privateKey: values.privateKey,
      status: values.status,
      fileDoc: "",
    },
  };
  await axios
    .put(url, body)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default updateContract;
