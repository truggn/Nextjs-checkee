import axios from "axios";
import { SEARCHPRODUCT} from "./../index";
import {ISearchProduct} from "../../redux/actions/SearchProductActions";
//
async function searchProduct(value: ISearchProduct) {
  let body = {
    "code": value
  };
  let data;
  await axios
    .post(SEARCHPRODUCT, body)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default searchProduct;
