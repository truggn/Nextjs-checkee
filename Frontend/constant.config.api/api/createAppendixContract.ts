import axios from "axios";
import { APPENDIXCONTRACT } from "../index";
import { IAppendixContract } from "../../redux/actions/AppendixContractActions";
export default async function createCustomer(customerData: IAppendixContract) {
  let data: any = null;
  let param = {
    numberAppendixContract: customerData.numberAppendixContract,
    date: customerData.date,
    durationPay: customerData.durationPay,
    nameContract: customerData.nameContract,
    packageBuy: customerData.packageBuy,
    contractValue: customerData.contractValue,
    vat: customerData.vat,
    vatPrice: customerData.contractValue * customerData.vat,
    publicKey: customerData.publicKey,
    // fileDoc: customerData.fileDoc,
    privateKey: customerData.privateKey,
    startDay: customerData.startDay,
    endDay: customerData.endDay,
    customerId: customerData.customerId,
  };
  await axios
    .post(APPENDIXCONTRACT, param)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });

  return data;
}
