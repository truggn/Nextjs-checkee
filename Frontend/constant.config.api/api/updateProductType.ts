import axios from "axios";
import { PRODUCTTYPE } from "./../index";
import { IProductType } from "../../redux/actions/ProductTypeActions";
//
async function updateProductType(value: IProductType) {
  let data;
  let body = {
    id: value._id,
    code: value.code,
    name: value.name,
    description: value.description,
    images: value.images,
    productRepresentation: value.productRepresentation,
    price: value.price,
    countryOfOrigin: value.countryOfOrigin,
    updatedBy: value.updatedBy,
    organizationId: value.organizationId,
    categoryId: value.categoryId,
  };

  try {
    const res = await axios.put(PRODUCTTYPE + "/id", body);
    data = res;
  } catch (error) {
    data = error;
  }
  return data;
}

export default updateProductType;
