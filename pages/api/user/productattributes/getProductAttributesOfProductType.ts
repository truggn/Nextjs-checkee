import ProductAttributesApi from "@apiUser/productattributes/getProductAttributesOfProductType";
import authentication from "@middlewares/authentication";


export default authentication(ProductAttributesApi())
