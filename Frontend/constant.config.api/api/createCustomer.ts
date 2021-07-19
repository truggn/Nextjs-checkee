import axios from "axios";
import { CUSTOMER } from "../index";

export default async function createCustomer(customerData) {
  let data: any = null;
  let body = {
    account_number: parseInt(customerData.account_number),
    taxCode: parseInt(customerData.taxCode),
    phone: customerData.phone,
    name_customer: customerData.name_customer,
    fax: parseInt(customerData.fax),
    email: customerData.email,
    createBy: customerData.createBy,
    certificate_image: customerData.certificate_image,
    bank: customerData.bank,
    address: customerData.address,
    code: customerData.code,
    icon: customerData.icon,
  };

  await axios
    .post(CUSTOMER, body)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });

  return data;
}
