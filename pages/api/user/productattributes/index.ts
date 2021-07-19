import ProductAttributesApi from "@apiUser/productattributes/index";
import authentication from "@middlewares/authentication";


export default authentication(ProductAttributesApi())
