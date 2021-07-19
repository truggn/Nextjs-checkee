import axios from "axios";
import { PRODUCTTYPEUSER } from "../../index";
import { IProductType } from "../../../redux/actions/user/ProductTypeActions";

async function createProductType(values: IProductType) {
  let data;
  let param = {
    code: values.code,
    name: values.name,
    organizationId: values.organizationId,
    price: values.price,
    description: values.description,
    images: values.images,
    productRepresentation: values.productRepresentation,
    countryOfOrigin: {
      name: values.countryOfOrigin.name,
      "alpha-2": values.countryOfOrigin["alpha-2"],
      "country-code": values.countryOfOrigin["country-code"],
    },
    createdBy: values.createdBy,
    categoryId: values.categoryId,
  };
  try {
    const res = await axios.post(PRODUCTTYPEUSER, param);
    data = res;
  } catch (error) {
    data = error.response;
  }

  return data;
}

export default createProductType;
