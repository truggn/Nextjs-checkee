import axios from "axios";
import { APPENDIXCONTRACT } from "../index";
import { IAppendixContract } from "../../redux/actions/AppendixContractActions";
async function updateAppendixContract(values: IAppendixContract) {
  let data;
  let url = APPENDIXCONTRACT + `/${values._id}`;
  let body = {
    update: {
      numberAppendixContract: values.numberAppendixContract,
      date: values.date,
      durationPay: values.durationPay,
      nameContract: values.nameContract,
      packageBuy: values.packageBuy,
      contractValue: values.contractValue,
      vat: values.vat,
      vatPrice: values.contractValue * values.vat,
      publicKey: values.publicKey,
      // fileDoc: customerData.fileDoc,
      privateKey: values.privateKey,
      startDay: values.startDay,
      endDay: values.endDay,
      customerId: values.customerId,
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

export default updateAppendixContract;
