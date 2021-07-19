import axios from "axios";
import { PRODUCTATTRIBUTES } from "./../index";
import { IProductAttributes } from "./../../redux/actions/ProductAttributesActions";
//
async function deletedProductAttributes(values: IProductAttributes) {
  let data;
  let url = PRODUCTATTRIBUTES + `/${values}`;
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

export default deletedProductAttributes;
