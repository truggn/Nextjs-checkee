import axios from "axios";
import { CONTRACT } from "./../index";
import { IContract } from "./../../redux/actions/ContractActions";

//
async function createContract(values: IContract) {
  console.log("apivalues", values);
  let data;
  let param = {
    orderNo: values.orderNo,
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
  };
  await axios
    .post(CONTRACT, param)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default createContract;
