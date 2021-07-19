import axios from "axios";
import { PRODUCTATTRIBUTES } from "../index";
import { IProductAttributes } from "./../../redux/actions/ProductAttributesActions";

async function createProductAttributes(values: IProductAttributes) {
  let data;
  let param = {
    key: values.key,
    type: values.type,
    productTypeId: values.productTypeId,
    createdBy: values.createBy,
    organizationId: values.organizationId,
    code: values.code,
  };
  await axios
    .post(PRODUCTATTRIBUTES, param)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default createProductAttributes;
