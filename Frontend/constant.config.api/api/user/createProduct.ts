import axios from "axios";
// import { CREATEPRODUCT} from '../index';
import { CREATE_PRODUCTUSER_REPAIR } from "../../index";
import { IProduct } from "../../../redux/actions/user/CreateProductActions";

async function createProduct(values: IProduct) {
  // let data = new FormData();
  // let value;
  // data.append('createdBy', values.createdBy);
  // data.append('file', values.file[0]);

  //     await axios.post(
  //         CREATEPRODUCT, data,
  //     ).then(function (response) {
  //         value = response;
  //     }).catch(function (err) {
  //         value = err.response;
  //     });
  //     return value;
  let data;
  let param = {
    filename: values.filename,
    organizationId: values.organizationId,
    productTypeId: values.productTypeId,
    products: values.products,
    createdBy: values.createdBy,
  };

  await axios
    .post(CREATE_PRODUCTUSER_REPAIR, param)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default createProduct;
