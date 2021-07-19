import ProductFlowsAPI from "@apiUser/product-flow/changeProductFlow";
import authentication from "@middlewares/authentication";

export default authentication(ProductFlowsAPI());
