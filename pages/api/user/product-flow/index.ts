import ProductFlowAPI from "@apiUser/product-flow/index";
import authentication from "@middlewares/authentication";

export default authentication(ProductFlowAPI());
