import ProductTypeApi from "@apiUser/producttype/getProductTypeOfOrganization";
import authentication from "@middlewares/authentication";


export default authentication(ProductTypeApi())
