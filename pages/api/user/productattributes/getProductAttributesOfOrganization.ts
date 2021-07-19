import ProductAttributesApi from "@apiUser/productattributes/getProductAttributesOfOrganization";
import authentication from "@middlewares/authentication";


export default authentication(ProductAttributesApi())
