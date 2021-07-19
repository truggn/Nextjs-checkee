import axios from "axios";
import { DATAPRODUCTFORPROCESS } from "../index";
import { IProductWithoutProcess } from "../../redux/actions/ProductTypeWithoutProcessActions";

async function addProductWithoutProcessById(
  id: IProductWithoutProcess,
  values: IProductWithoutProcess
) {
  const params = { product: values };
  let data;
  try {
    const dataProduct = await axios.post(
      DATAPRODUCTFORPROCESS + `/${id}`,
      params
    );
    data = dataProduct;
  } catch (error) {
    data = error;
  }
  return data;
}
export default addProductWithoutProcessById;
