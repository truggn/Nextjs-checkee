import axios from "axios";
import { PRODUCTREQUEST} from "./../index";
//
async function getDetailProduct(id) {
  let data;
  await axios
    .get(PRODUCTREQUEST + "/" + id)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getDetailProduct;
