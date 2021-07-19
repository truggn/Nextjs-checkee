import ProductFlowsAPI from "@apiUser/product-flow/getProductFlowOfOrganization";
import authentication from "@middlewares/authentication";

export default authentication(ProductFlowsAPI());
