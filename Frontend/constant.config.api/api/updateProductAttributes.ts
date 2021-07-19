import axios from "axios";
import { PRODUCTATTRIBUTES } from "./../index";
import { IProductAttributes } from "../../redux/actions/ProductAttributesActions";
//
async function updateProductAttributes(value: IProductAttributes) {
  let data;
  let body = {
    id: value._id,
    update: {
      key: value.key,
      type: value.type,
    },
  };
  await axios
    .put(PRODUCTATTRIBUTES, body)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default updateProductAttributes;
